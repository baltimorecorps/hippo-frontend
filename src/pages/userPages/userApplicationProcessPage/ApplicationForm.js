import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, useHistory, useRouteMatch} from 'react-router-dom';

import InterestForm from '../../../components/applicationProcessComponents/InterestForm';
import Review from '../../../components/applicationProcessComponents/Review';
import AddResume from '../../../components/applicationProcessComponents/AddResume';

const ApplicationForm = ({
  contact,
  opportunity,
  application,
  startApplication,
  getApplication,
  updateApplication,
  submitApplication,
  getAllOpportunities,
}) => {
  const loadingApp = useRef(false);

  const match = useRouteMatch();

  // Load opportunities if we don't have the one we need
  useEffect(() => {
    if (!opportunity) {
      getAllOpportunities();
    }
  }, [opportunity, getAllOpportunities]);

  // Load our application or create one if it doesn't exist
  useEffect(() => {
    if (application !== null) {
      return;
    }
    if (!contact || !opportunity) {
      return;
    }

    const getOrCreateApplication = async () => {
      let response = await getApplication(contact.id, opportunity.id);
      if (response.statusCode === 200) {
        return;
      }

      if (response.statusCode !== 404) {
        console.error('Error loading application', response);
        return;
      }

      response = await startApplication(contact.id, opportunity.id);
      if (response.statusCode !== 201) {
        console.error('Error starting new application', response);
      }
    };

    const loadApplication = async () => {
      loadingApp.current = true;
      await getOrCreateApplication();
      loadingApp.current = false;
    };

    if (loadingApp.current === false) {
      loadApplication();
    }
  }, [contact, opportunity, application, getApplication, startApplication]);

  const [resume, setResume] = useState(application ? application.resume : null);

  let history = useHistory();
  const backToOpportunities = () => {
    history.push('/opportunities');
  };
  const backToProfile = () => {
    history.push('/profile');
  };

  const updateInterestStatement = async interest_statement => {
    const newApplication = {
      ...application,
      interest_statement,
    };
    const response = await updateApplication(newApplication);
    if (response.statusCode === 200) {
      history.push(`${match.url}/resume`);
    } else {
      console.error('Error updating application', response);
    }
  };

  const updateAppResume = async resume => {
    //TODO: connect to API
    const newApplication = {
      ...application,
      resume,
    };
    const response = await updateApplication(newApplication);

    if (response.statusCode === 200) {
      history.push(`${match.url}/review`);
    } else {
      console.error('Error updating application with resume', response);
    }
  };

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <Switch>
      <Route exact path={`${match.path}/review`}>
        <Review
          opportunity={opportunity}
          application={application}
          submit={() => submitApplication(application)}
          back={() => history.push(`${match.url}/resume`)}
          toProfile={backToProfile}
          toOpportunities={backToOpportunities}
          contactId={contact.id}
          resume={resume}
          setResume={setResume}
        />
      </Route>
      <Route exact path={`${match.path}/resume`}>
        <AddResume
          opportunity={opportunity}
          application={application}
          resume={resume}
          setResume={setResume}
          contactId={contact.id}
          next={updateAppResume}
          back={() => history.push(`${match.url}`)}
          toProfile={backToProfile}
          toOpportunities={backToOpportunities}
        />
      </Route>
      <Route path={`${match.path}`}>
        <InterestForm
          application={application}
          opportunity={opportunity}
          startText={application.interest_statement || ''}
          next={updateInterestStatement}
          back={backToOpportunities}
        />
      </Route>
    </Switch>
  );
};

ApplicationForm.propTypes = {
  contact: PropTypes.object.isRequired,
  opportunity: PropTypes.shape({
    short_description: PropTypes.string.isRequired,
    org_name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    program_id: PropTypes.number.isRequired,
    gdoc_link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  application: PropTypes.object,
  startApplication: PropTypes.func.isRequired,
  getApplication: PropTypes.func.isRequired,
  updateApplication: PropTypes.func.isRequired,
  submitApplication: PropTypes.func.isRequired,
  getAllOpportunities: PropTypes.func.isRequired,
};

export default ApplicationForm;
