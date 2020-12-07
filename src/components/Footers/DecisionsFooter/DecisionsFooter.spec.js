import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DecisionsFooter from './DecisionsFooter';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {
  fullSubmittedApp,
  fullRecommendedApp,
  fullInterviewingApp,
  fullConsideredApp,
  fullNotAFitFromRecommendedApp,
  fullNotAFitFromInterviewApp,
  fullNotAFitFromFinalistsApp,
} from 'mockData/applications';

describe('DecisionsFooter Component on EmployerViewApplication Page', () => {
  const history = createMemoryHistory();

  test('Render and click Not a Fit to a Recommended Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullRecommendedApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Not a Fit');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Scheduled'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Not a Fit'));
    expect(employerNotAFit.mock.calls.length).toBe(1);
  });

  test('Render and click Back to a Not a fit from Recommended Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullNotAFitFromRecommendedApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Scheduled'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Back'));
    expect(back.mock.calls.length).toBe(1);
  });

  test('Render and click Back to a Not a fit from Recommended Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullNotAFitFromRecommendedApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Scheduled'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Interview Scheduled'));
    expect(interviewScheduled.mock.calls.length).toBe(1);
  });

  test('Render and click Interview Scheduled to a Recommended Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullRecommendedApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Not a Fit');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Scheduled'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Interview Scheduled'));
    expect(interviewScheduled.mock.calls.length).toBe(1);
  });

  test('Render and click Interview Rescheduled to an Interviewing Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullInterviewingApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent(
      'Interview Rescheduled'
    );

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Completed'
    );
    expect(queryByText('Not a Fit')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Interview Rescheduled'));
    expect(interviewScheduled.mock.calls.length).toBe(1);
  });

  test('Render and click Interview Completed to an Interviewing Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullInterviewingApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent(
      'Interview Rescheduled'
    );

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Interview Completed'
    );
    expect(queryByText('Not a Fit')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Interview Completed'));
    expect(interviewCompleted.mock.calls.length).toBe(1);
  });

  test('Render and click Back to a Finalist Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullConsideredApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Not a Fit'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Back'));
    expect(back.mock.calls.length).toBe(1);
  });

  test('Render and click Reconsider for Not a Fit to a Finalist Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullConsideredApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Not a Fit'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Reconsider for Not a Fit'));
    expect(employerReconsiderNotAFit.mock.calls.length).toBe(1);
  });

  test('Render and click Reconsider for Finalists to a Not a fit from Finalists Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullNotAFitFromFinalistsApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Back');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Finalists'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Reconsider for Finalists'));
    expect(employerReconsiderFinalists.mock.calls.length).toBe(1);
  });

  test('Render and click Interview Rescheduled to a Not a fit from Interviewed Application', () => {
    const employerNotAFit = jest.fn();
    const employerReconsiderFinalists = jest.fn();
    const employerReconsiderNotAFit = jest.fn();
    const interviewScheduled = jest.fn();
    const interviewCompleted = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          employerNotAFit={employerNotAFit}
          employerReconsiderFinalists={employerReconsiderFinalists}
          employerReconsiderNotAFit={employerReconsiderNotAFit}
          interviewScheduled={interviewScheduled}
          interviewCompleted={interviewCompleted}
          back={back}
          application={fullNotAFitFromInterviewApp}
          page="employer-review-application"
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent(
      'Interview Rescheduled'
    );

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'Reconsider for Finalists'
    );
    expect(queryByText('Interview Completed')).not.toBeInTheDocument();

    fireEvent.click(queryByText('Interview Rescheduled'));
    expect(interviewScheduled.mock.calls.length).toBe(1);
  });
});

describe('DecisionsFooter Component on StaffViewApplication Page', () => {
  const history = createMemoryHistory();

  test('Render and click Not a Fit to a Submitted Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullSubmittedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullSubmittedApp}
          applicantId={fullSubmittedApp.contact.id}
          opportunityId={fullSubmittedApp.id}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Reopen');

    expect(getByTestId('middle_left_button')).toBeInTheDocument();
    expect(getByTestId('middle_left_button')).toHaveTextContent('See Profile');

    expect(getByTestId('middle_right_button')).toBeInTheDocument();
    expect(getByTestId('middle_right_button')).toHaveTextContent('Not a Fit');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('Recommend');

    fireEvent.click(queryByText('Not a Fit'));
    expect(handleClickNotAFit.mock.calls.length).toBe(1);
  });

  test('Click Reopen to a Submitted Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullSubmittedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullSubmittedApp}
          applicantId={fullSubmittedApp.contact.id}
          opportunityId={fullSubmittedApp.id}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Reopen');

    fireEvent.click(queryByText('Reopen'));
    expect(handleClickReopen.mock.calls.length).toBe(1);
  });

  test('Click Recommend to a Submitted Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullSubmittedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullSubmittedApp}
          applicantId={fullSubmittedApp.contact.id}
          opportunityId={fullSubmittedApp.id}
        />
      </Router>
    );

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('Recommend');

    fireEvent.click(queryByText('Recommend'));
    expect(handleClickRecommend.mock.calls.length).toBe(1);
  });

  test('Click See Profile to a Submitted Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullSubmittedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullSubmittedApp}
          applicantId={fullSubmittedApp.contact.id}
          opportunityId={fullSubmittedApp.id}
        />
      </Router>
    );

    expect(getByTestId('middle_left_button')).toBeInTheDocument();
    expect(getByTestId('middle_left_button')).toHaveTextContent('See Profile');

    fireEvent.click(queryByText('See Profile'));
    expect(history.location.pathname).toBe(
      `/profile/${fullSubmittedApp.contact.id}`
    );
  });

  test('Render and click Opportunities to a Recommended Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullRecommendedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullRecommendedApp}
          applicantId={fullRecommendedApp.contact.id}
          opportunityId={fullRecommendedApp.id}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Opportunities');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('See Profile');

    fireEvent.click(queryByText('Opportunities'));
    expect(history.location.pathname).toBe(`/internal/opportunities-board`);
  });

  test('Render and click See Profile to a Recommended Application', () => {
    const handleClickRecommend = jest.fn();
    const handleClickNotAFit = jest.fn();
    const handleClickReopen = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          applicationStatus={fullRecommendedApp.status}
          page="staff-review-application"
          back={back}
          recommend={handleClickRecommend}
          notAFit={handleClickNotAFit}
          reopen={handleClickReopen}
          application={fullRecommendedApp}
          applicantId={fullRecommendedApp.contact.id}
          opportunityId={fullRecommendedApp.id}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Opportunities');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent('See Profile');

    fireEvent.click(queryByText('See Profile'));
    expect(history.location.pathname).toBe(
      `/profile/${fullRecommendedApp.contact.id}`
    );
  });
});

describe('DecisionsFooter Component on Applicant Review Application Page (on Application Process)', () => {
  const history = createMemoryHistory();

  test('Render and click Edit Profile to a Submitted Application', () => {
    const toOpportunities = jest.fn();
    const submit = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          page="review"
          back={back}
          toOpportunities={toOpportunities}
          submit={submit}
          application={fullSubmittedApp}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Edit Profile');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'View More Opportunities'
    );

    fireEvent.click(queryByText('Edit Profile'));
    expect(history.location.pathname).toBe('/profile');
  });

  test('Render and click View More Opportunities to a Submitted Application', () => {
    const toOpportunities = jest.fn();
    const submit = jest.fn();
    const back = jest.fn();

    const {getByTestId, queryByText} = render(
      <Router history={history}>
        <DecisionsFooter
          page="review"
          back={back}
          toOpportunities={toOpportunities}
          submit={submit}
          application={fullSubmittedApp}
        />
      </Router>
    );

    expect(getByTestId('left_button')).toBeInTheDocument();
    expect(getByTestId('left_button')).toHaveTextContent('Edit Profile');

    expect(getByTestId('right_button')).toBeInTheDocument();
    expect(getByTestId('right_button')).toHaveTextContent(
      'View More Opportunities'
    );

    fireEvent.click(queryByText('View More Opportunities'));
    expect(toOpportunities.mock.calls.length).toBe(1);
  });
});
