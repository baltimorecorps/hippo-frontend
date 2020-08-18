import React from 'react';
import ReactGA from 'react-ga';
import {makeFetchActions} from 'redux-fetch-wrapper';
import Button from '@material-ui/core/Button';

const createExternalLink = (content, url, className) => {
  return (
    <ReactGA.OutboundLink
      eventLabel={content}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      to={url}
    >
      {content}
    </ReactGA.OutboundLink>
  );
};

const createALink = (content, url, className) => {
  return (
    <a
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      href={url}
    >
      {content}
    </a>
  );
};
const createClickTracking = (category, action, label) => {
  return ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export const makeApiFetchActions = (
  action,
  url,
  init = null,
  actions = null,
  abortController = null,
  conditional = null
) => {
  return async dispatch => {
    init = Object.assign({credentials: 'include'}, init);
    return await makeFetchActions(
      action,
      url,
      init,
      actions,
      abortController,
      conditional
    )(dispatch);
  };
};

const createAButton = (content, handleClick, isPrimary, className) => {
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color={isPrimary ? 'primary' : 'default'}
      className={className}
    >
      {content}
    </Button>
  );
};

const formatDate = date => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  const formatDate = `${month}/${day}/${year}`;
  return formatDate;
};

const formatTime = time => {
  let hours = parseInt(time.substring(0, 2));
  const minutes = time.substring(3, 5);
  let suffix = 'am';
  if (hours > 12) {
    hours = hours - 12;
    suffix = 'pm';
  } else if (hours === 12) {
    suffix = 'pm';
  } else if (hours === 0) {
    hours = 12;
  }
  const formatTime = `${hours}:${minutes} ${suffix}`;
  return formatTime;
};

const getCheckboxOptions = (labels, apiValues, type = '') => {
  let options = [];

  Object.entries(apiValues).forEach(([apiKey, apiChecked]) => {
    Object.entries(labels).forEach(([labelKey, labelName], index) => {
      if (
        (type === 'race' && apiKey !== 'race_other' && apiKey === labelKey) ||
        (type !== 'race' && apiKey === labelKey)
      ) {
        options[index] = {
          name: apiKey,
          label: labelName,
          checked: apiChecked === true ? true : false,
        };
      }
    });
  });

  return options;
};

const getListOfAnswers = (apiValues, labelNames) => {
  let answers = [];
  Object.entries(apiValues).forEach(([apiKey, apiValue]) => {
    Object.entries(labelNames).forEach(([labelKey, labelName]) => {
      if (apiKey === labelKey && apiKey !== 'not_listed' && apiValue === true)
        return answers.push(labelName);
    });
    if (apiKey === 'race_other' && apiValue && apiValue.length > 0)
      return answers.push(apiValue);
  });
  return answers;
};

export {
  createExternalLink,
  createClickTracking,
  createALink,
  createAButton,
  formatDate,
  formatTime,
  getCheckboxOptions,
  getListOfAnswers,
};
