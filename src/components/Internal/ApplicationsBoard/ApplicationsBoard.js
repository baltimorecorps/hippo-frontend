import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';

import ApproveNewApplicantForm from './ApproveNewApplicantForm';

import ApplicationCards from './ApplicationCards';

const ApplicationsBoard = ({
  classes,
  getAllContactsShort,
  approveNewApplicants,
  getAllInternalApplicants,
  contacts,
  applicants,
}) => {
  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);
  useEffect(() => {
    getAllInternalApplicants();
  }, [getAllInternalApplicants]);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  if (!applicants) {
    return <div>...Loading</div>;
  }

  let options = {};
  options = contacts.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      contact_id: contact.id,
      contact: contact,
    };
  });

  return (
    <div className={classes.container}>
      <ApproveNewApplicantForm
        options={options}
        approveNewApplicants={approveNewApplicants}
      />
      <div className={classes.cardContainer}>
        {applicants &&
          applicants.map((applicant, index) => (
            <ApplicationCards
              key={index}
              contactId={applicant.contact.id}
              applicant={applicant}
              applications={applicant.applications}
              toViewApplication={toViewApplication}
            />
          ))}
      </div>
    </div>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),

    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: spacing(2),
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      //   width: '100%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(ApplicationsBoard);
