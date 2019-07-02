import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider, Icon } from 'semantic-ui-react';
import { Col, Row } from 'react-bootstrap';
import ExperienceItem from './ExperienceItem';
import ExperienceForm from './ExperienceForm';
import './profile.css';

//todo: check how to write if/else in render/function
//todo: check how to write clickable icon

const Experience = ({
  contactId,
  experienceType,
  experiences,
  addNewExperience,
  refreshExperiences,
  updateExperience,
  deleteExperience,
}) => {
  const [showForm, setShowForm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    experiences.length === 0 && refreshExperiences();
  }, [experiences.length, refreshExperiences]);

  const blankExperience = {
    description: '',
    host: '',
    title: '',
    date_start: '',
    date_end: '',
    type: experienceType,
    contact_id: contactId,
    achievements: [],
  };

  const submitNewExperience = async function(experience) {
    await addNewExperience(experience);
    setShowForm(false);
  };

  const displayPastExperiences = () =>
    experiences.map((experience) => {
      return (
        <ExperienceItem
          key={experience.id}
          onUpdate={updateExperience}
          onDelete={deleteExperience}
          experience={experience}
        />
      );
    });

  const getHeader = () => {
    if (experienceType === 'Work') {
      return 'Work Experience';
    } else if (experienceType === 'Education') {
      return 'Education';
    } else if (experienceType === 'Service') {
      return 'Service and Leadership';
    } else if (experienceType === 'Accomplishment') {
      return 'Accomplishments';
    }
  };

  const textStyle = {
    fontSize: '26px',
    fontWeight: '300',
    lineHeight: '0.8',
    color: '#5f6163',
  };

  return (
    <div style={{ marginTop: '10px', backgroundColor: 'white', padding: '15px' }}>
      <Row>
        <Col xs md lg="4">
          <div style={textStyle}>{getHeader()}</div>
          {/*<Button onClick={this.fetchData}> Click to see details </Button> */}
        </Col>
        <Col xs md lg="8">
          <button
            style={{
              display: 'inline-block',
              float: 'right',
              border: 'none',
              backgroundColor: 'transparent',
            }}
            onClick={() => setShowForm(true)}
          >
            <Icon style={{ display: 'inline-block' }} name="plus" />
            {showHint ? <p> Click plus sign to add new experience </p> : null}
          </button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs md lg="8">
          {displayPastExperiences()}
          {/*this.displayOneExperience()*/}
        </Col>
        {showForm ? (
          <Col xs md lg="2">
            <div style={{ marginTop: '20px' }}>
              <ExperienceForm
                experience={blankExperience}
                onSubmit={submitNewExperience}
                handleCancel={() => setShowForm(false)}
              />
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

Experience.propTypes = {
  contactId: PropTypes.string.isRequired,
  experienceType: PropTypes.oneOf(['Work', 'Service', 'Accomplishment', 'Education']).isRequired,
  experiences: PropTypes.array.isRequired,
  addNewExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  refreshExperiences: PropTypes.func.isRequired,
};

export default Experience;
