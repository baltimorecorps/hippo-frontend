const resumeInfo = {
  achievements: [
    {
      date: new Date(2017, 2, 1),
      name: 'Blog',
      description: 'Some post or something',
    },
    {
      date: new Date(2018, 5, 1),
      name: 'Video',
      description: 'Went viral',
    },
  ],
  contactInfo: {
    name: 'Lysander Lance',
    roles: ['Data Arch', 'Data Analysis'],
    title: 'Data Specialist',
    email: 'something@thing.com',
    phoneNumber: 2347657896,
    city: 'Baltimore',
    state: 'MD',
  },
  experiences: {
    work: [
      {
        startDate: new Date(2015, 8, 1),
        endDate: null,
        orgName: 'Baltimore Corps',
        positionName: 'Systems Design Manager',
        feats: [{ text: 'Thing 1' }, { text: 'Thing 2' }, { text: 'Thing 3' }],
      },
    ],
    service: [
      {
        startDate: new Date(2016, 4, 1),
        endDate: null,
        orgName: 'Blue Water Baltimore',
        positionName: 'Volunteer',
        feats: [{ text: 'Thing 4' }, { text: 'Thing 5' }, { text: 'Thing 6' }],
      },
    ],
    education: [
      {
        startDate: new Date(2012, 8, 1),
        endDate: new Date(2016, 5, 1),
        orgName: 'Goucher',
        positionName: 'Undergraduate',
        feats: [{ text: 'Thing 7' }, { text: 'Thing 8' }, { text: 'Thing 9' }],
      },
    ],
  },
  skillGroups: [
    {
      name: 'Data Architecture',
      skills: [
        {
          name: 'Python',
          years: 1.5,
        },
        {
          name: 'SQL',
          years: 3,
        },
        {
          name: 'Mongo',
          years: 2,
        },
      ],
    },
    {
      name: 'Wizardry',
      skills: [
        {
          name: 'Charms',
          years: 6,
        },
        {
          name: 'Transfiguration',
          years: 4,
        },
        {
          name: 'Potions',
          years: 2,
        },
      ],
    },
  ],
};

export default resumeInfo;
