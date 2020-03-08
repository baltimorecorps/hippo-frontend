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

  const apps = [
    {
      id: 1,
      is_approved: true,
      stage: 2,
      contact: {
        id: 78,
        first_name: 'Bay',
        last_name: 'Chai',
        email: 'bay@baltimorecorps.org',
      },
      applications: [
        {
          id: 1,
          status: 'submitted',
          opportunity: {
            id: '94a6103c-c985-4db1-bd4e-e9e815c4cdda',
            title: 'Test2',
            org_name: 'Test2',
          },
        },
        {
          id: 1,
          status: 'submitted',
          opportunity: {
            id: '94a6103c-c985-4db1-bd4e-e9e815c4cdda',
            title: 'Test2',
            org_name: 'Test2',
          },
        },
        {
          id: 1,
          status: 'submitted',
          opportunity: {
            id: '94a6103c-c985-4db1-bd4e-e9e815c4cdda',
            title: 'Test2',
            org_name: 'Test2',
          },
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 2,
      contact: {
        id: 78,
        first_name: 'RachadaBay Bangkok',
        last_name: 'ChairangsarisThailand',
        email: 'bay2@baltimorecorps.org',
      },
      applications: [
        {
          id: 1,
          status: 'recommended',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 2,
      contact: {
        id: 78,
        first_name: 'Taylor Alison',
        last_name: 'Swift',
        email: 'bay2@baltimorecorps.org',
      },
      applications: [
        {
          id: 1,
          status: 'recommended',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
        {
          id: 1,
          status: 'interviewing',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
        {
          id: 1,
          status: 'interviewing',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 2,
      contact: {
        id: 78,
        first_name: 'RachadaBay Bangkok',
        last_name: 'ChairangsarisThailand',
        email: 'bay2@baltimorecorps.org',
      },
      applications: [
        {
          id: 1,
          status: 'recommended',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
      ],
    },
    {
      id: 1,
      is_approved: true,
      stage: 2,
      contact: {
        id: 78,
        first_name: 'RachadaBay Bangkok',
        last_name: 'ChairangsarisThailand',
        email: 'bay2@baltimorecorps.org',
      },
      applications: [
        {
          id: 1,
          status: 'recommended',
          opportunity: {
            id: '67c93a98-f5ca-421f-93ea-680d05af9e38',
            title: 'Web Developer1',
            org_name: 'Test Org1',
          },
        },
      ],
    },
  ];

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

  return (
    <div className={classes.container}>
      <ApproveNewApplicantForm
        options={options}
        approveNewApplicants={approveNewApplicants}
      />
      <div className={classes.cardContainer}>
        {apps.map((applicant, index) => (
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
