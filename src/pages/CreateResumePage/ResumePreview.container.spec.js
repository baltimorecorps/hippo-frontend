import { makeMapStateToProps } from './ResumePreview.container';

const SECTIONS = {
  1: {
    id: 1,
    name: 'Work Experience',
    items: [],
  },
  2: {
    id: 2,
    name: 'Service and Leadership',
    items: [],
  },
  3: {
    id: 3,
    name: 'Education',
    items: [],
  },
  4: {
    id: 4,
    name: 'Accomplishments',
    items: [],
  },
  5: {
    id: 5,
    name: "Functions I've Performed",
    items: [],
  },
  6: {
    id: 6,
    name: "Skills I've Developed",
    items: [],
  },
  7: {
    id: 7,
    name: "Topics I've Addressed",
    items: [],
  },
};

const STATE = {
  contacts: {
    111: {
      first_name: 'Lysander',
      last_name: 'Lance',
      email_primary: {
        is_primary: true,
        type: null,
        email: 'something@thing.com',
        id: 2,
      },
      phone_primary: '555-123-4567',
    },
  },
  resumes: {
    3: {
      id: 3,
      contact_id: 111,
      name: 'Test Resume 3',
      sections: SECTIONS,
    },
  },
};

// TODO:
//
// This is the jankiest part of the whole spec, you should probably consider
// rethinking how the props that you pass to 'GeneratedResumePage' are
// actually set up. But here's a first pass
//
describe('State mapping', () => {
  let state = {};
  beforeEach(() => {
    state = Object.assign({}, STATE);
  });
  const items = [
    {
      resume_order: 1,
      experience: {
        type: 'Work',
        id: 1,
        host: 'Baltimore Corps',
        title: 'Data Analyst',
        date_start: '2015-09-01',
        date_end: null,
      },
      indented: false,
    },
    {
      resume_order: 2,
      indented: true,
      achievement: {
        description: 'Thing 1',
        id: 15,
      },
    },
    {
      resume_order: 3,
      indented: true,
      achievement: {
        description: 'Thing 2',
        id: 13,
      },
    },
    {
      resume_order: 3,
      indented: true,
      achievement: {
        description: 'Thing 3',
        id: 21,
      },
    },
    {
      resume_order: 4,
      experience: {
        type: 'Work',
        id: 574,
        host: 'OkCupid',
        title: 'Software Engineer',
        date_start: '2011-07-01',
        date_end: '2014-06-20',
      },
      indented: false,
    },
    {
      resume_order: 5,
      indented: true,
      achievement: {
        description: 'Thing 4',
        id: 55,
      },
    },
    {
      resume_order: 6,
      indented: true,
      achievement: {
        description: 'Thing 5',
        id: 56,
      },
    },
  ];

  test('test contact', () => {
    const ownProps = {
      resumeId: 3,
    };

    const mapStateToProps = makeMapStateToProps();
    const props = mapStateToProps(state, ownProps);
    expect(props).toHaveProperty('contactInfo');
    expect(props.contactInfo).toEqual({
      name: 'Lysander Lance',
      email: 'something@thing.com',
      phoneNumber: '555-123-4567',
    });
  });

  test('test work experience', () => {
    state.resumes[3].sections[1].items = items;
    const ownProps = {
      resumeId: 3,
    };

    const mapStateToProps = makeMapStateToProps();
    const props = mapStateToProps(state, ownProps);
    expect(props).toHaveProperty('experiences');
    expect(props.experiences).toHaveProperty('work');
    expect(props.experiences.work).toEqual([
      {
        startDate: '2015-09-01',
        endDate: null,
        orgName: 'Baltimore Corps',
        positionName: 'Data Analyst',
        feats: [{ text: 'Thing 1' }, { text: 'Thing 2' }, { text: 'Thing 3' }],
      },
      {
        startDate: '2011-07-01',
        endDate: '2014-06-20',
        orgName: 'OkCupid',
        positionName: 'Software Engineer',
        feats: [{ text: 'Thing 4' }, { text: 'Thing 5' }],
      },
    ]);
  });
  test('test service experience', () => {
    state.resumes[3].sections[2].items = items;
    const ownProps = {
      resumeId: 3,
    };

    const mapStateToProps = makeMapStateToProps();
    const props = mapStateToProps(state, ownProps);
    expect(props).toHaveProperty('experiences');
    expect(props.experiences).toHaveProperty('service');
    expect(props.experiences.service).toEqual([
      {
        startDate: '2015-09-01',
        endDate: null,
        orgName: 'Baltimore Corps',
        positionName: 'Data Analyst',
        feats: [{ text: 'Thing 1' }, { text: 'Thing 2' }, { text: 'Thing 3' }],
      },
      {
        startDate: '2011-07-01',
        endDate: '2014-06-20',
        orgName: 'OkCupid',
        positionName: 'Software Engineer',
        feats: [{ text: 'Thing 4' }, { text: 'Thing 5' }],
      },
    ]);
  });
  test('test education', () => {
    state.resumes[3].sections[3].items = items;
    state.resumes[3].sections[3].items[0] = {
      type: 'Education',
      degree: 'Undergraduate',
      date_end: '2019-05-02',
      date_start: '2019-04-30',
      host: 'Goucher University',
      title: 'Economics',
    };
    state.resumes[3].sections[3].splice(4);
    const ownProps = {
      resumeId: 3,
    };

    const mapStateToProps = makeMapStateToProps();
    const props = mapStateToProps(state, ownProps);
    expect(props).toHaveProperty('experiences');
    expect(props.experiences).toHaveProperty('education');
    expect(props.experiences.education).toEqual([
      {
        startDate: '2015-04-30',
        endDate: '2019-05-02',
        orgName: 'Goucher University',
        positionName: 'Economics',
        degree: 'Undergraduate',
        feats: [{ text: 'Thing 1' }, { text: 'Thing 2' }, { text: 'Thing 3' }],
      },
    ]);
  });

  test('test skills', () => {
    state.resumes[3].sections[5].items = [
      {
        resume_order: 1,
        indented: false,
        tag: {
          name: 'Data Science',
          type: 'Function',
          tag_id: 123,
          score: 3,
          id: 54,
        },
      },
    ];

    const ownProps = {
      resumeId: 3,
    };

    const mapStateToProps = makeMapStateToProps();
    const props = mapStateToProps(state, ownProps);
    expect(props).toHaveProperty('skillGroups');
    expect(props.skillGroups).toHaveProperty("Functions I've Performed");
    expect(props.skillGroups["Functions I've Performed"].skills).toEqual([
      {
        name: 'Data Science',
        level: 'Can Teach with Help',
      },
    ]);
  });
});
