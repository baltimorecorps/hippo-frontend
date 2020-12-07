import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OpportunitiesBoard from './OpportunitiesBoard';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {mixedFullApplications} from 'mockData/applications';

let mixedOppWithApplications = [];

for (let i = 0; i < 5; i++) {
  mixedOppWithApplications.push({
    applications: mixedFullApplications,
    gdoc_link: 'https://docs.google.com/document/d/f',
    id: '6098721e-ef4d-4204-87b8-a7a5d0090989',
    is_active: true,
    org_name: `Org ${i + 1}`,
    program_id: 2,
    program_name: 'Fellowship',
    short_description: `Some job description ${i + 1}`,
    status: 'submitted',
    title: `Role ${i + 1}`,
  });
}

for (let i = 0; i < 4; i++) {
  mixedOppWithApplications.push({
    applications: mixedFullApplications,
    gdoc_link: 'https://docs.google.com/document/d/f',
    id: '6098721e-ef4d-4204-87b8-a7a5d0090989',
    is_active: true,
    org_name: `Org ${i + 6}`,
    program_id: 1,
    program_name: 'Place for Purpose',
    short_description: `Some job description ${i + 6}`,
    status: 'submitted',
    title: `Role ${i + 6}`,
  });
}

for (let i = 0; i < 3; i++) {
  mixedOppWithApplications.push({
    applications: mixedFullApplications,
    gdoc_link: 'https://docs.google.com/document/d/f',
    id: '6098721e-ef4d-4204-87b8-a7a5d0090989',
    is_active: true,
    org_name: `Org ${i + 10}`,
    program_id: 3,
    program_name: 'Mayoral Fellowship',
    short_description: `Some job description ${i + 10}`,
    status: 'submitted',
    title: `Role ${i + 10}`,
  });
}

describe('Opportunities Board', () => {
  const history = createMemoryHistory();

  test('Render Loading... while fetching opportunities', () => {
    const getAllInternalOpportunities = jest.fn();

    const {getByTestId} = render(
      <Router history={history}>
        <OpportunitiesBoard
          opportunities={[]}
          getAllInternalOpportunities={getAllInternalOpportunities}
        />
      </Router>
    );
    expect(getByTestId('loading')).toBeInTheDocument();
    expect(getAllInternalOpportunities.mock.calls.length).toBe(1);
  });

  test('Render Opportunities Board', () => {
    const getAllInternalOpportunities = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <OpportunitiesBoard
          opportunities={mixedOppWithApplications}
          getAllInternalOpportunities={getAllInternalOpportunities}
        />
      </Router>
    );
    expect(getByTestId('partnerships_navbar')).toBeInTheDocument();
    expect(getByTestId('programs_selectors')).toBeInTheDocument();

    expect(getAllByTestId('role_card_paper').length).toBe(5);
  });

  test('Render Opportunities Board', () => {
    const getAllInternalOpportunities = jest.fn();

    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <OpportunitiesBoard
          opportunities={mixedOppWithApplications}
          getAllInternalOpportunities={getAllInternalOpportunities}
        />
      </Router>
    );

    expect(getByTestId('partnerships_navbar')).toBeInTheDocument();
    expect(getByTestId('programs_selectors')).toBeInTheDocument();

    expect(getAllByTestId('role_card_paper').length).toBe(5);

    expect(getByTestId('programs_selectors')).toBeInTheDocument();
    expect(getByTestId('programs_selectors').value).toBe('Fellowship');
    expect(getAllByTestId('role_card_paper').length).toBe(5);

    fireEvent.change(getByTestId('programs_selectors'), {
      target: {value: 'Place for Purpose'},
    });
    expect(getByTestId('programs_selectors').value).toBe('Place for Purpose');
    expect(getAllByTestId('role_card_paper').length).toBe(4);

    fireEvent.change(getByTestId('programs_selectors'), {
      target: {value: 'Mayoral Fellowship'},
    });
    expect(getByTestId('programs_selectors').value).toBe('Mayoral Fellowship');
    expect(getAllByTestId('role_card_paper').length).toBe(3);
  });
});
