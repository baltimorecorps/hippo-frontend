import React from 'react';
import ReactGA from 'react-ga';

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

const createClickTracking = (category, action, label) => {
  return ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export {createExternalLink, createClickTracking};
