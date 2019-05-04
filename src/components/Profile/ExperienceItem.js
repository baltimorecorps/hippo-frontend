import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Grid} from 'semantic-ui-react';
import {Col, Row} from 'react-bootstrap';
import ExperienceUpdateForm from './ExperienceUpdateForm';
import './profile.css';

const ExperienceItem = ({experience, onDelete}) => {
  const [editing, setEditing] = useState(false);

  const getInitial = () => {
    if (experience.organization && experience.organization.length > 0) {
      return experience.organization.charAt(0)
    } else {
      return ' ';
    }
  };

  const displayOneExperience = () => {
    var textStyleSmall = {
      fontSize: '20px',
      fontWeight: '300',
      lineHeight: '0.8',
      color: '#5f6163',
    };

    return (
      <div style={textStyleSmall}>
        <Grid style={{marginLeft: '20px'}}>
          <Grid.Column floated="left" width={2}>
            <button type="button" className="btn btn-success btn-circle btn-xl">
              <i className="fa fa-check">
                {' '}
                {getInitial()}{' '}
              </i>
            </button>
          </Grid.Column>

          <Grid.Column floated="left" width={11} style={{marginTop: '5px'}}>
            <h2>
              {' '}
              <strong>
                {experience.organization}, {experience.title}{' '}
              </strong>{' '}
            </h2>
            <p>
              {' '}
              {experience.date_start} -- {experience.date_end}{' '}
            </p>

            <div>
              <p>Achievements:</p>
              {experience.achievements.map(item => {
                return (
                  <p key={item.achievement_order}>
                    {item.achievement_order + 1}: {item.description}
                  </p>
                );
              })}
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <Grid style={{marginTop: '20px'}}>
        <Grid.Column floated="left" width={13}>
          {displayOneExperience()}
        </Grid.Column>
        <Grid.Column textAlign="right" floated="right" width={3}>
          <Icon name="edit" onClick={() => setEditing(true)} />
          <Icon name="delete" onClick={() => onDelete(experience.id)} />
        </Grid.Column>
      </Grid>

      {editing ? (
        <ExperienceUpdateForm
          handleCancel={() => setEditing(false)}
          func={v => {
            console.log(v);
          }}
          experience={experience}
        />
      ) : null}
    </div>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.number.isRequired,
    organization: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    degree: PropTypes.oneOf([
      'High School',
      'Associates',
      'Undergraduate',
      'Masters',
      'Doctoral',
    ]),
    date_start: PropTypes.instanceOf(Date).isRequired,
    date_end: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education'])
      .isRequired,
    contact_id: PropTypes.number,
    achievements: PropTypes.array,
    description: PropTypes.string,
  }).isRequired,
};

export default ExperienceItem;
