import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Grid } from 'semantic-ui-react';
import SkillUpdateForm from './SkillUpdateForm.container';
import { scoreToString } from './skillUtil';
import './profile.css';

const SkillItem = ({ tag, onSubmit, onDelete }) => {
  const [editing, setEditing] = useState(false);

  const getInitial = () => {
    if (tag.name) {
      return tag.name.charAt(0);
    } else {
      return '';
    }
  };
  const displayOneSkill = () => {
    var textStyleSmall = {
      fontSize: '20px',
      fontWeight: '300',
      lineHeight: '0.8',
      color: '#5f6163',
    };
    return (
      <div style={textStyleSmall}>
        <Grid style={{ marginLeft: '20px' }}>
          <Grid.Column floated="left" width={2}>
            <button type="button" className="btn btn-warning btn-circle btn-xl">
              <i className="fa fa-check"> {getInitial()} </i>
            </button>
          </Grid.Column>

          <Grid.Column floated="left" width={11} style={{ marginTop: '5px' }}>
            <h3>
              {' '}
              <strong>{tag.name} </strong>{' '}
            </h3>
            <p>{scoreToString(tag.score)}</p>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <Grid style={{ marginTop: '20px' }}>
        <Grid.Column floated="left" width={13}>
          {displayOneSkill()}
        </Grid.Column>
        <Grid.Column textAlign="right" floated="right" width={3}>
          <Icon name="edit" onClick={() => setEditing(true)} />
          <Icon name="delete" onClick={() => onDelete(tag)} />
        </Grid.Column>
      </Grid>

      {editing ? (
        <SkillUpdateForm
          tag={tag}
          tagType={tag.type}
          onSubmit={(tag) => {
            onSubmit(tag);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      ) : null}
    </div>
  );
};

SkillItem.propTypes = {
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

export default SkillItem;
