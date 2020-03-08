import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {useHistory} from 'react-router-dom';

import ApproveNewApplicantForm from './ApproveNewApplicantForm';

import ApplicationCards from './ApplicationCards';

const ApplicationsBoard = ({
  classes,
  getAllContactsShort,
  approveNewApplicants,
  contacts,
}) => {
  useEffect(() => {
    getAllContactsShort();
  }, [getAllContactsShort]);

  let history = useHistory();

  const toViewApplication = opportunityId => {
    history.push(`/application/${opportunityId}/review`);
  };

  const chosenApplicants = [];
  const addApplicants = applicant => {
    chosenApplicants.push(applicant);
  };

  const applications = [
    {
      id: 1,
      is_approved: true,
      stage: 'stage',
      contact: {
        id: 78,
        first_name: 'Bay',
        last_name: 'Chai',
        email: 'bay@baltimorecorps.org',
      },
      applications: [
        {
          id: 'appId',
          status: 'submitted',
          opportunity_id: 'oppId',
          title: 'Web Developer',
          org_name: 'Baltimore Corps',
        },
        {
          id: 'appId',
          status: 'recommended',
          opportunity_id: 'oppId',
          title: 'Web Developer 2',
          org_name: 'Baltimore Corps',
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 'stage',
      contact: {
        id: 78,
        first_name: 'Bill',
        last_name: 'Gates',
        email: 'bill.gates@microsoft.com',
      },
      applications: [
        {
          id: 'appId',
          status: 'submitted',
          opportunity_id: 'oppId',
          title: 'Web Developer',
          org_name: 'Baltimore Corps',
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 'stage',
      contact: {
        id: 78,
        first_name: 'Taylor',
        last_name: 'Swift',
        email: 'taylor@taylorswift.com',
      },
      applications: [
        {
          id: 'appId',
          status: 'submitted',
          opportunity_id: 'oppId',
          title: 'Web Developer',
          org_name: 'Baltimore Corps',
        },
        {
          id: 'appId',
          status: 'recommended',
          opportunity_id: 'oppId',
          title: 'Web Developer 2',
          org_name: 'Baltimore Corps',
        },
      ],
    },
  ];

  let options = {};
  options = contacts.map(contact => {
    return {
      name: `${contact.first_name} ${contact.last_name} (${contact.email})`,
      contact_id: contact.id,
      contact: contact,
    };
  });

  const approve = contactIds => {};

  return (
    <div className={classes.container}>
      <ApproveNewApplicantForm
        options={options}
        approveNewApplicants={approveNewApplicants}
      />
      <div className={classes.cardContainer}>
        {applications.map((applicant, index) => (
          <ApplicationCards
            key={index}
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
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',

      flexDirection: 'column',
    },
    [breakpoints.down('md')]: {},
    [breakpoints.down('xl')]: {},
  },
});

export default withStyles(styles)(ApplicationsBoard);
