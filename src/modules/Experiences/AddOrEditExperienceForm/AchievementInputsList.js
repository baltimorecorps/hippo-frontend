import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AchievementInput from "./AchievementInput";

const AchievementInputsList = ({achievements, contactId, onChange}) => {
  const handleRemove = selectedIndex => event => {
    // Stops bug where removing the last achievement triggers an event on the 'add' button,
    // thus preventing you from going back to zero achievements
    event.preventDefault();
    onChange(achievements.filter((elem, i) => selectedIndex !== i));
  };

  const handleAdd = () => {
    onChange([...achievements, {contact_id: contactId, description: ""}]);
  };

  const handleChangeDescription = selectedIndex => event => {
    onChange(
      achievements.map((achievement, i) => {
        if (selectedIndex !== i) return achievement;
        return {...achievement, description: event.target.value};
      })
    );
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <React.Fragment>
      {achievements.map(({description}, index) => (
        <AchievementInput
          key={index}
          label={`Achievement #${index + 1}`}
          value={description}
          onTextChange={handleChangeDescription(index)}
          onIconClick={handleRemove(index)}
          onKeyPress={handleKeyPress}
        />
      ))}
      <Button
        type="button"
        onClick={handleAdd}
        variant="contained"
        style={{fontWeight: "700", marginTop: "5px", fontSize: "12px"}}
      >
        Add Achievement
      </Button>
    </React.Fragment>
  );
};

AchievementInputsList.propTypes = {
  contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      exp_id: PropTypes.number,
      contact_id: PropTypes.number,
      description: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func.isRequired,
};

export default AchievementInputsList;
