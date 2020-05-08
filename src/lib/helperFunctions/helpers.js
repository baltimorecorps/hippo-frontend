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

const groupOpportunitiesByProgramName = (opportunities, programNames) => {
  let groupedOpportunities = [];
  for (let i = 0; i < programNames.length; i++) {
    let filteredOpportunities = [];
    filteredOpportunities = opportunities.filter(
      opp => opp.program_name === programNames[i]
    );
    groupedOpportunities.push(filteredOpportunities);
  }
  return groupedOpportunities;
};

// this sort everything by one category, doesn't group opportunities by program name before sorting
const sortByCategory = (opportunities, category) => {
  let result = [];

  result = opportunities.sort((a, b) => {
    return a[category] > b[category] ? 1 : -1;
  });

  return result;
};

const getAllPrograms = opportunities => {
  let allPrograms = [];

  // get all program names
  opportunities.forEach(opp => {
    if (!allPrograms.includes(opp.program_name)) {
      allPrograms.push(opp.program_name);
    }
  });

  // sort program names alphabetically
  allPrograms.sort((a, b) => (a > b ? 1 : -1));

  return allPrograms;
};

// this sorting groups opportunities by program names before sorting.
// Good use for raw data from the backend when all programs are mixed everywhere in the same array
const sortAllOpportunitiesByCategory = (opportunities, category) => {
  // get all program names and sorted
  const allPrograms = getAllPrograms(opportunities);
  let sortedOpportunities = [];

  // group by program name
  const opportunitiesGroups = groupOpportunitiesByProgramName(
    opportunities,
    allPrograms
  );

  // sorted each group by category (e.g. title, org_name)
  for (let i = 0; i < opportunitiesGroups.length; i++) {
    const sortedGroup = sortByCategory(opportunitiesGroups[i], category);
    sortedOpportunities = [...sortedOpportunities, ...sortedGroup];
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
  sortByCategory,
  sortAllOpportunitiesByCategory,
};
