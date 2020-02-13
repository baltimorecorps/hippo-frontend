import React from 'react';
import ReactGA from 'react-ga';
import {makeFetchActions} from 'redux-fetch-wrapper';

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
  return async (dispatch) => {
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

export {createExternalLink, createClickTracking, createALink};
