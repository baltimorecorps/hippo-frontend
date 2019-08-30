import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AchievementInput from './AchievementInput';

const AchievementInputsList = ({ achievements, contactId, onChange }) => {
  const handleRemove = (selectedIndex) => (event) => {
    // Stops bug where removing the last achievement triggers an event on the 'add' button,
    // thus preventing you from going back to zero achievements
    event.preventDefault();
    onChange(achievements.filter((elem, i) => selectedIndex !== i));
  };

  const handleAdd = () => {
    onChange([...achievements, { contact_id: contactId, description: '' }]);
  };

  const handleChangeDescription = (selectedIndex) => (event) => {
    onChange(
      achievements.map((achievement, i) => {
        if (selectedIndex !== i) return achievement;
        return { ...achievement, description: event.target.value };
      }),
    );
  };

  return (
    <React.Fragment>
      <h3>
        Achievements:
      </h3>
      {achievements.map(({description}, index) =>
        <AchievementInput
          key={description + index}
          label={`Achievement #${index + 1}`}
          value={description}
          onTextChange={handleChangeDescription(index)}
          onClick={handleRemove(index)}
        />
      )}
      <Button type="button" onClick={handleAdd}>
        Add Achievement
      </Button>
    </React.Fragment>
  );
};

AchievementInputsList.propTypes = {
  contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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

export default AchievementInputsList;
