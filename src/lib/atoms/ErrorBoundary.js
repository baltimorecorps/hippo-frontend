import React from 'react';

import PropTypes from './PropTypes';
import logger from './logger';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    const {fileName} = this.props;
    logger.error({fileName, error, info});
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.displayName = 'ErrorBoundary';

ErrorBoundary.propTypes = PropTypes.handler({
  children: PropTypes.node.isRequired,
  fileName: PropTypes.string.isRequired,
});

export default ErrorBoundary;
