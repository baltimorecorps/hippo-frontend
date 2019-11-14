import React from 'react';
import {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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

  const [description, setDescription] = React.useState();

  const handleChange = event => {
    event.persist();
    // let value = event.target.value;
    // value = value.split('\n').join('');
    setDescription(event.target.value.split('\n').join(''));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <InputLabel
          style={{fontWeight: 'bold', color: '#000000', marginBottom: '10px'}}
        >
          Responsibilities and Achievements:
        </InputLabel>
      </Grid>
      {achievements.map(({description}, index) => (
        <Grid item xs={12}>
          <AchievementInput
            key={index}
            ref={index === achievements.length - 1 ? focusTarget : null}
            value={description}
            onTextChange={handleChangeDescription(index)}
            onDelete={handleRemove(index)}
            handleAdd={handleAdd}
          />
        </Grid>
      ))}
      <Grid item xs={12} align="end">
        <AchievementInput
          style={{width: '100%'}}
          value={description}
          onChange={handleChange}
          handleAdd={handleAdd}
        />
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
