import React from 'react';

const createExternalLink = (content, url, className) => {
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

export {createExternalLink};
