import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Form} from 'semantic-ui-react';
import {Icon, Button} from 'semantic-ui-react';

const Achievements = ({achievements, contactId, onChange}) => {
  const handleRemove = idx => evt => {
    // This specifically stops a bug where if you tried to remove the last
    // achievement, it would trigger an event on the 'add' button, thus
    // effectively preventing you from ever going back to zero achievements
    evt.preventDefault();
    onChange(achievements.filter((elem, i) => idx !== i));
  };

  const handleAdd = () => {
    onChange([...achievements, {contact_id: contactId, description: ''}]);
  };

  const handleChangeDescription = idx => evt => {
    onChange(
      achievements.map((achievement, i) => {
        if (idx !== i) return achievement;
        return {...achievement, description: evt.target.value};
      }),
    );
  };

  return (
    <Form.Field>
      <label>
        <h3> Achievements:</h3>
        <div>
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                direction: 'row',
                alignItems: 'center',
              }}>
              <input
                width="50%"
                type="text"
                placeholder={`Achievement #${idx + 1}`}
                value={achievement.description}
                onChange={handleChangeDescription(idx)}
              />
              <Button
                type="button"
                className="small"
                onClick={handleRemove(idx)}>
                {' '}
                <Icon name="delete" />{' '}
              </Button>
            </div>
          ))}
        </div>

        <br />
        <Button type="button" onClick={handleAdd} className="small">
          Add Achievement
        </Button>
      </label>
    </Form.Field>
  );
};

Achievements.propTypes = {
  contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      exp_id: PropTypes.number,
      contact_id: PropTypes.number,
      description: PropTypes.string.isRequired,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};
export default Achievements;
