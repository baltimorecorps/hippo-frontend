import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewFullApplication from './ViewFullApplication';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fullSubmittedApp} from 'mockData/applications';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';

let mockTheme = createMuiTheme({
  palette: {
    resume: {
      yellow: '#f3ba4d',
      blue: '#1c4587',
      gray: '#e7e6e6',
    },
  },
});

const opportunityId = '6098721e-ef4d-4204-87b8-a7a5d0090989';

const mockStore = configureMockStore();
const store = mockStore({
  contacts: {
    '251': {
      account_id: 'auth0|5f90a50b27f268006e56d7cd',
      email: 'bayBC1@baltimorecorps.org',
      first_name: 'Bay1',
      id: 251,
      last_name: 'Chairangsaris',
      phone_primary: '+1 (555) 555-9999',
    },
  },
  experiences: {
    '509': {
      location: 'Baltimore, OH, USA',
      start_month: 'June',
      start_year: 2009,
      contact_id: 251,
      title: 'er',
      achievements: [
        {
          description: 'test',
          skills: [
            {
              name: 'Community Organizing',
              capability_id: 'cap:outreach',
            },
          ],
          id: 982,
        },
        {
          description: 'test',
          skills: [],
          id: 983,
        },
      ],
      host: 'Baltimore Corps',
      link_name: null,
      id: 509,
      link: null,
      degree_other: null,
      type: 'Work',
      skills: [
        {
          name: 'Advocacy',
          id: 'zrcgco7DyYvpDjHhNdTu_Q==',
        },
        {
          name: 'Communication Analysis',
          id: 'niywDwbgzzw68YwfA_Kauw==',
        },
        {
          name: 'Community Organizing',
          id: '74BgThI2os9wEdyArofEKA==',
        },
        {
          name: 'G++',
          id: 'ebCw2QPHrjAu4viJ6eNEOA==',
        },
      ],
      end_month: 'none',
      end_year: 0,
      length_year: 11,
      length_month: 4,
      degree: null,
      is_current: true,
      description: '',
    },
    '510': {
      location: 'Baltimore Corner, MD, USA',
      start_month: 'March',
      start_year: 2013,
      contact_id: 251,
      title: 'g',
      achievements: [],
      host: 'G',
      link_name: null,
      id: 510,
      link: null,
      degree_other: null,
      type: 'Education',
      skills: [
        {
          name: 'H&S',
          id: 'FWyI7kKdh75vaSwsL1CsOw==',
        },
      ],
      end_month: 'none',
      end_year: 0,
      length_year: 7,
      length_month: 7,
      degree: 'Certificate',
      is_current: true,
      description: '',
    },
    '511': {
      location: 'Baltimore, OH, USA',
      start_month: 'August',
      start_year: 2007,
      contact_id: 251,
      title: 'ss',
      achievements: [
        {
          description: 'test5',
          skills: [
            {
              name: 'Community Organizing',
              capability_id: 'cap:advocacy',
            },
          ],
          id: 984,
        },
        {
          description: 'teat',
          skills: [
            {
              name: 'Python',
              capability_id: 'cap:analysis',
            },
          ],
          id: 985,
        },
      ],
      host: 'Baltimore Corps',
      link_name: null,
      id: 511,
      link: null,
      degree_other: null,
      type: 'Work',
      skills: [
        {
          name: 'Community Organizing',
          id: '74BgThI2os9wEdyArofEKA==',
        },
        {
          name: 'G&A',
          id: 'NetduSnS0IbDu6kzg2d3sw==',
        },
        {
          name: 'Leadership',
          id: 'Ja7FLGs0ujs8PLCetxERDw==',
        },
        {
          name: 'Nod32',
          id: 'fFzn_sdL8xjzz1EneHoBcg==',
        },
        {
          name: 'Python',
          id: '4R9tqGuK2672PavRTJrN_A==',
        },
      ],
      end_month: 'May',
      end_year: 2012,
      length_year: 4,
      length_month: 9,
      degree: null,
      is_current: false,
      description: '',
    },
  },
});

describe('View Full Application', () => {
  const history = createMemoryHistory();

  test('Render View Full Application Component', () => {
    const getApplication = jest.fn();
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <MuiThemeProvider theme={mockTheme}>
          <ViewFullApplication
            application={fullSubmittedApp}
            contactId={251}
            contact={{
              email: 'bayBC1@baltimorecorps.org',
              first_name: 'Bay1',
              id: 251,
              last_name: 'Chairangsaris',
              phone_primary: '+1 (555) 555-9999',
            }}
            opportunityId={opportunityId}
            getApplication={getApplication}
          />
        </MuiThemeProvider>
      </Provider>
    );

    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('page_header')).toHaveTextContent('Review Application');

    expect(getByTestId('title')).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent('Role 1');

    expect(getByTestId('organization')).toBeInTheDocument();
    expect(getByTestId('organization')).toHaveTextContent('Org 1');

    expect(getByTestId('short_description')).toBeInTheDocument();
    expect(getByTestId('short_description')).toHaveTextContent(
      'Some job description 1'
    );

    expect(getByText('View full description')).toBeInTheDocument();
    expect(getByText('View full description')).toHaveAttribute(
      'href',
      'https://docs.google.com/document/d/f'
    );

    expect(getByTestId('interest_statement')).toBeInTheDocument();
    expect(getByTestId('interest_statement')).toHaveTextContent(
      'My interested statement.'
    );

    expect(getByTestId('view_resume')).toBeInTheDocument();
    // expect(getByTestId('resume_header')).toBeInTheDocument();
    // expect(getByTestId('resume_left')).toBeInTheDocument();
    // expect(getByTestId('resume_right')).toBeInTheDocument();
  });

  test('Render Loading and getApplication when no application', () => {
    const getApplication = jest.fn();
    const {getByTestId} = render(
      <Router history={history}>
        <ViewFullApplication
          application={null}
          contactId={78}
          opportunityId={opportunityId}
          getApplication={getApplication}
        />
      </Router>
    );

    expect(getByTestId('page_loading')).toBeInTheDocument();
    expect(getByTestId('page_loading')).toHaveTextContent('Loading...');

    expect(getApplication.mock.calls.length).toBe(1);
  });
});
