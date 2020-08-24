import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const ContentWithHelpTextToolTipsTemplate = ({
  option,
  isSubContent,
  isCompleted,
  openThisForm,
  scrollToThisForm,
  classes,
}) => {
  return (
    <a
      href={scrollToThisForm}
      onClick={openThisForm ? () => openThisForm() : null}
    >
      <Typography
        variant="body1"
        component="p"
        className={isSubContent ? classes.subContent : classes.content}
      >
        {isSubContent && (
          <ArrowForwardIosIcon className={classes.arrowRightIcon} />
        )}{' '}
        {option.content} {isCompleted && <span style={{color: 'red'}}> *</span>}
        {option.helpText && (
          <Tooltip
            title={
              <Typography
                style={{
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {option.helpText}
                {isCompleted && <span style={{color: 'red'}}> *</span>}
              </Typography>
            }
            placement="right"
          >
            <IconButton aria-label={option.helpText} style={{padding: '3px'}}>
              <InfoIcon className={classes.infoIcon} />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
    </a>
  );
};

const helpTextStyles = ({breakpoints, palette, spacing}) => ({
  content: {
    textAlign: 'left',
    fontSize: '15px',
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  },
  subContent: {
    marginLeft: '25px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '15px',

    [breakpoints.up('sm')]: {
      marginLeft: '30px',
      fontSize: '16px',
    },
  },
  arrowRightIcon: {
    fontSize: '16px',
    [breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  infoIcon: {
    color: '#c4c4c4',
    fontSize: '26px',
    padding: '5px',
  },
});

const ContentWithHelpTextToolTips = withStyles(helpTextStyles)(
  ContentWithHelpTextToolTipsTemplate
);

const CheckboxesWithToolTips = ({listOfOptions}) => {
  return listOfOptions.map((option, index) => (
    <div key={index}>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: option.checked ? '#2f5be0' : '#c7c7c7',
            }}
            data-testid="instructions-checkbox"
            checked={option.checked}
            name={option.content}
            checkedIcon={
              <CheckCircleIcon style={{padding: '0px', margin: 0}} />
            }
            icon={<CheckCircleOutlinedIcon />}
          />
        }
        label={
          <ContentWithHelpTextToolTips
            option={option}
            isCompleted={!option.checked}
            openThisForm={option.setOpenThisForm || null}
            scrollToThisForm={option.scrollToThisForm || '#'}
            isSubContent={false}
          />
        }
      />{' '}
      {option.components &&
        option.components.map((subOption, index) => (
          <ContentWithHelpTextToolTips
            key={index}
            option={subOption}
            isSubContent={true}
            isCompleted={!option.checked}
          />
        ))}
    </div>
  ));
};

export default CheckboxesWithToolTips;
