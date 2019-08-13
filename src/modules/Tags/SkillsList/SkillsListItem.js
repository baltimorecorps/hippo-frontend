import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AddOrEditSkillForm from 'modules/Tags/AddOrEditSkillForm';
import getTextScore from 'modules/Tags/utilities/getTextScore';

const SkillsListItem = ({tag, onSubmit, onDelete, classes}) => {
  const initial = tag.name ? tag.name[0] : '';

  const [editing, setEditing] = useState(false);

  return (
    <React.Fragment>
      <Grid container justify="space-between" className={classes.wrapper}>
        <Grid item>
          <Avatar>
            {initial}
          </Avatar>
        </Grid>

        <Grid item xs={10}>
          <Typography variant="h5" component="h3">
            {tag.name}
          </Typography>
          <Typography variant="body1" component="p">
            {getTextScore(tag.score)}
          </Typography>
        </Grid>

        <Grid item>
          <Icon onClick={() => setEditing(true)}>edit</Icon>
          <Icon onClick={onDelete}>delete</Icon>
        </Grid>
      </Grid>

      {editing &&
        <AddOrEditSkillForm
          tag={tag}
          tagType={tag.type}
          onSubmit={(tag) => {
            onSubmit(tag);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      }
    </React.Fragment>
  );
};

SkillsListItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    tag_id: PropTypes.number.isRequired,
    contact_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = ({ breakpoints, palette, spacing }) => ({
  wrapper: {
    marginBottom: `${spacing.unit * 1}px`,
  },
});

export default withStyles(styles)(SkillsListItem);
