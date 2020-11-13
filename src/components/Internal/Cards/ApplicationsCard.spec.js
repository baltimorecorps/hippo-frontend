import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationsCard from './ApplicationsCard';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {mixedFullApplications as applications} from 'mockData/applications';

describe('Applications Card', () => {
  const history = createMemoryHistory();

  test('Render loading... while fetching applications', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <ApplicationsCard contactId={78} applications={null} />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
    expect(getByTestId('loading')).toHaveTextContent('Loading...');
  });

  test('Render and Click View App', () => {
    const {getAllByTestId, getByTestId} = render(
      <Router history={history}>
        <ApplicationsCard contactId={78} applications={applications} />
      </Router>
    );
    expect(getByTestId('application_card_header')).toBeInTheDocument();
    expect(getByTestId('application_card_header')).toHaveTextContent(
      'Applications'
    );

    const applicationStages = getAllByTestId('application_stage');

    expect(applicationStages.length).toBe(8);
    expect(applicationStages[0]).toHaveTextContent('Started (0)');
    expect(applicationStages[1]).toHaveTextContent('Submitted (1)');
    expect(applicationStages[2]).toHaveTextContent('Recommended (1)');
    expect(applicationStages[3]).toHaveTextContent(
      'Interested in Interview (0)'
    );
    expect(applicationStages[4]).toHaveTextContent('Interviewing (1)');
    expect(applicationStages[5]).toHaveTextContent('Finalists for Role (1)');
    expect(applicationStages[6]).toHaveTextContent('Matched (0)');
    expect(applicationStages[7]).toHaveTextContent('Inactive (1)');

    // fireEvent.click(applicationStages[0]);

    const titles = getAllByTestId('title_or_name');
    const ViewAppButtons = getAllByTestId('view_application_button');

    expect(titles.length).toBe(5);
    expect(titles[0]).toHaveTextContent('Role 1');
    expect(titles[1]).toHaveTextContent('Role 2');
    expect(titles[2]).toHaveTextContent('Role 3');
    expect(titles[3]).toHaveTextContent('Role 4');
    expect(titles[4]).toHaveTextContent('Role 5');

    expect(ViewAppButtons.length).toBe(5);

    fireEvent.click(ViewAppButtons[0]);
    expect(history.location.pathname).toBe(
      '/opportunities/6098721e-ef4d-4204-87b8-a7a5d0090989/contacts/78/internal-review'
    );

    fireEvent.click(ViewAppButtons[1]);
    expect(history.location.pathname).toBe(
      '/opportunities/6098721e-ef4d-4204-87b8-a7a5d0090989/contacts/78/internal-review'
    );

    fireEvent.click(ViewAppButtons[2]);
    expect(history.location.pathname).toBe(
      '/opportunities/6098721e-ef4d-4204-87b8-a7a5d0090989/contacts/78/internal-review'
    );

    fireEvent.click(ViewAppButtons[3]);
    expect(history.location.pathname).toBe(
      '/opportunities/6098721e-ef4d-4204-87b8-a7a5d0090989/contacts/78/internal-review'
    );
    fireEvent.click(ViewAppButtons[4]);
    expect(history.location.pathname).toBe(
      '/opportunities/6098721e-ef4d-4204-87b8-a7a5d0090989/contacts/78/internal-review'
    );
  });
});
