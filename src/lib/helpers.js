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

export {createExternalLink};
