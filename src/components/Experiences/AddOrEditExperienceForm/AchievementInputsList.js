import React from 'react';
import {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AchievementInput from './AchievementInput';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';

const AchievementInputsList = ({
  classes,
  achievements,
  capabilities,
  contactId,
  onChange,
  label,
  sublabel,
  errors,
}) => {
  const focusTarget = useRef(null);
  const [doFocus, setFocus] = useState(false);

  useEffect(() => {
    if (focusTarget.current && doFocus) {
      focusTarget.current.setSelectionRange(
        focusTarget.current.value.length,
        focusTarget.current.value.length)
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

  const handleAddMultiple = text => {
    const descriptions = getMultilineDescriptions(text);
    onChange([
      ...achievements,
      ...descriptions.map(desc => (
        {
          contact_id: contactId,
          description: desc || '',
          skills: [],
        })),
    ]);
  };
  const handleAdd = text => {
    if (text.indexOf('\n') !== -1) {
      handleAddMultiple(text);
    } else {
      onChange([
        ...achievements,
        {
          contact_id: contactId,
          description: text || '',
          skills: [],
        },
      ]);
    }
    setFocus(true);
  };

  const getMultilineDescriptions = (description) => {
    return description
      .split('\n')
      .map(line => {
        // Remove all non-word characters from the start of the string
        // Strips off bullets, whitespace, etc.
        const firstCharIdx = line.search(/\w/);
        if (firstCharIdx === -1) {
          return null;
        } else {
          return line.slice(firstCharIdx);
        }
      })
      .filter(line => line !== null);
  }

  const handleMultilineUpdate = (index, description) => {
    const descriptions = getMultilineDescriptions(description);
    return [
      ...achievements.slice(0, index),
      {...achievements[0], description: descriptions[0]},
      ...descriptions.slice(1).map(desc => ({
        contact_id: contactId,
        description: desc,
        skills: [],
      })),
      ...achievements.slice(index + 1),
    ];
  };

  const handleChangeDescription = selectedIndex => event => {
    if (event.target.value.indexOf('\n') !== -1) {
      onChange(handleMultilineUpdate(selectedIndex, event.target.value));
    } else {
      onChange(
        achievements.map((achievement, i) => {
          if (selectedIndex !== i) return achievement;
          return {...achievement, description: event.target.value};
        })
      );
    }
  };

  const handleChangeSkills = selectedIndex => skills => {
    onChange(
      achievements.map((achievement, i) => {
        if (selectedIndex !== i) return achievement;
        return {...achievement, skills};
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
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.sublabel}>{sublabel}</Typography>
      </Grid>
      <Grid item xs={12}>
        {achievements.map((achievement, index) => (
          <AchievementInput
            errors={errors}
            key={index}
            ref={index === achievements.length - 1 ? focusTarget : null}
            achievement={achievement}
            capabilities={capabilities}
            onSkillsChange={handleChangeSkills(index)}
            onTextChange={handleChangeDescription(index)}
            onIconClick={handleRemove(index)}
            onKeyPress={handleKeyPress}
          />
        ))}
        <AchievementInput
          achievement={{description: ''}}
          capabilities={[]}
          onSkillsChange={null}
          onTextChange={ev => handleAdd(ev.target.value)}
          onIconClick={null}
          onKeyPress={() => {}}
        />
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

const styles = ({breakpoints, palette, spacing}) => ({
  label: {
    fontSize: 18,
  },
  sublabel: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: spacing(1),
  },
});

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

export default withStyles(styles)(AchievementInputsList);
