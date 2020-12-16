import configureMockStore from 'redux-mock-store';

const store_ = configureMockStore();
const mockStore = store_({
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

export {mockStore};
