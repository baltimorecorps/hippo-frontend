import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AddOrEditSkillForm from 'modules/Tags/AddOrEditSkillForm';
import SkillsListItem from './SkillsListItem';

const SkillsList = ({
  contactId,
  tags,
  tagItems,
  tagType,
  refreshTags,
  addTagItem,
  deleteTagItem,
  updateTagItem,
  refreshTagItems,
  classes,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    tags.length === 0 && refreshTags();
  }, [refreshTags, tags.length]);

  useEffect(() => {
    tagItems.length === 0 && refreshTagItems();
  }, [refreshTagItems, tagItems.length]);

  const title = titles[tagType.toLowerCase()];

  const blankTag = {
    name: '',
    contact_id: contactId,
    type: tagType,
  };

  return (
    <div className={classes.wrapper}>
      <Grid container justify="space-between">
        <Grid item xs={10}>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Icon onClick={() => setShowForm(true)}>add</Icon>
        </Grid>
      </Grid>
      {tagItems.map((tag) => (
        <SkillsListItem
          key={tag.tag_id}
          tag={tag}
          onSubmit={updateTagItem}
          onReplace={(oldTag, newTag) => {
            deleteTagItem(oldTag);
            addTagItem(newTag);
          }}
          onDelete={deleteTagItem}
        />
      ))}

      {showForm && (
        <AddOrEditSkillForm
          tag={blankTag}
          tagType={tagType}
          onSubmit={(tagItem) => {
            addTagItem(tagItem).then(setShowForm(false));
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

SkillsList.propTypes = {
  contactId: PropTypes.number.isRequired,
  tagType: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
  tags: PropTypes.array.isRequired,
  addTagItem: PropTypes.func.isRequired,
  deleteTagItem: PropTypes.func.isRequired,
  updateTagItem: PropTypes.func.isRequired,
  refreshTagItems: PropTypes.func.isRequired,
};

const titles = {
  function: 'Functions performed',
  skill: 'Skills developed',
  topic: 'Topics addressed',
};

const styles = ({ breakpoints, palette, spacing }) => ({
  wrapper: {
    marginBottom: spacing(4),
  },
  paper: {
    padding: spacing(2, 3, 3),
    marginBottom: spacing(5),
  },
  divider: {
    margin: spacing(1, 0),
  },
});

export default withStyles(styles)(SkillsList);
