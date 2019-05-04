import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {Form} from 'semantic-ui-react';
import {Icon, Button} from 'semantic-ui-react';

const Achievements = ({achievements, onChange}) => {
  const handleRemove = idx => evt => {
    onChange(achievements.filter((elem, i) => idx !== i));
  };

  const handleAdd = () => {
    achievements.push({description: ''});
    onChange(achievements);
  };

  const handleChangeDescription = idx => evt => {
    onChange(achievements.map((achievement, i) => {
      if (idx !== i) return achievement;
      return {...achievement, description: evt.target.value};
    }));
  };

  return (
    <Form.Field>
      <label>
        <h3> Achievements:</h3>
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

        <br />
        <Button type="button" onClick={handleAdd} className="small">
          Add Achievement
        </Button>
      </label>
    </Form.Field>
  );
};

Achievements.propTypes = {
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
