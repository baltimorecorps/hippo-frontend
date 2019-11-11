const logger = {
  error({fileName, error, info}) {
    if (error) {
      const {name, message, stack} = error;
      /* eslint-disable no-console */
      console.group(`logger.error in ${fileName}`);
      console.error(name, message);

      console.group('stack');
      console.error(stack);
      console.groupEnd();

      if (info) {
        const {componentStack} = info;
        console.info(componentStack);
      }
      console.groupEnd();
      /* eslint-enable no-console */
    }
  },
};

export default logger;
