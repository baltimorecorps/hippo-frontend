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
  const formatedDate = `${month}/${day}/${year}`;
  return formatedDate;
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
  const formatedTime = `${hours}:${minutes} ${suffix}`;
  return formatedTime;
};

const sortOpportunitiesByProgramName = (opportunities, programNames) => {
  let sortedOpportunities = [];
  for (let i = 0; i < programNames.length; i++) {
    let filteredOpportunities = [];
    filteredOpportunities = opportunities.filter(
      opp => opp.program_name === programNames[i]
    );
    sortedOpportunities = [...sortedOpportunities, ...filteredOpportunities];

    console.log('filter', filteredOpportunities);
    console.log('sort', sortedOpportunities);
  }
  return sortedOpportunities;
};

export {
  createExternalLink,
  createClickTracking,
  createALink,
  createAButton,
  formatDate,
  formatTime,
  sortOpportunitiesByProgramName,
};
