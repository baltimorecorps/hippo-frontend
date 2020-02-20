import React, {useRef} from 'react';
import ReactToPrint from 'react-to-print';
import {ResumeViewer} from 'components/ResumeCreator';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const ResumeView = ({classes, match}) => {
  const printTarget = useRef();
  const print = () => {
    const divContents = printTarget.current.html();
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Test print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={classes.wrapper}>
      <ReactToPrint
        trigger={() => (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={print}
          >
            Print Resume
          </Button>
        )}
        content={() => printTarget.current}
      />
      <ResumeViewer printRef={printTarget} contactId={match.params.contactId} />
    </div>
  );
};

const styles = ({breakpoints, palette, spacing, shadows}) => ({
  wrapper: {
    width: '100%',
  },
  button: {
    margin: `${spacing(2)}px 600px ${spacing(2)}px`,
  },
});

export default withStyles(styles)(ResumeView);
