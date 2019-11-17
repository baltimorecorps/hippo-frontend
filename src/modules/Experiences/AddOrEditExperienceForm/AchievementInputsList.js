import React from 'react';
import {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AchievementInput from './AchievementInput';
import Grid from '@material-ui/core/Grid';

import InputLabel from '@material-ui/core/InputLabel';

const AchievementInputsList = ({achievements, contactId, onChange}) => {
  const focusTarget = useRef(null);
  const [doFocus, setFocus] = useState(false);

  useEffect(() => {
    if (focusTarget.current && doFocus) {
      focusTarget.current.focus();
      setFocus(false);
    }
  }, [focusTarget, doFocus]);

  const handleRemove = selectedIndex => event => {
    // Stops bug where removing the last achievement triggers an event on the 'add' button,
    // thus preventing you from going back to zero achievements
    event.preventDefault();
    onChange(achievements.filter((elem, i) => selectedIndex !== i));
  };

  const handleAdd = () => {
    onChange([...achievements, {contact_id: contactId, description: ''}]);
    setFocus(true);
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
    if (e.key === 'Enter') {
      handleAdd();
      setFocus(true);
      e.preventDefault();
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <InputLabel
          style={{fontWeight: 'bold', color: '#000000', marginBottom: '5px'}}
        >
          Responsibilities and Achievements:
        </InputLabel>
      </Grid>
      <Grid item xs={12}>
        {achievements.map(({description}, index) => (
          <AchievementInput
            key={index}
            ref={index === achievements.length - 1 ? focusTarget : null}
            value={description}
            onTextChange={handleChangeDescription(index)}
            onIconClick={handleRemove(index)}
            onKeyPress={handleKeyPress}
          />
        ))}
      </Grid>
      <Grid item xs={11}>
        <Button
          type="button"
          onClick={handleAdd}
          variant="text"
          style={{
            fontWeight: '700',
            fontSize: '13px',
            padding: '6px 23px',
            margin: '3px 0px',
          }}
        >
          + Add
        </Button>
      </Grid>
    </Grid>
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
