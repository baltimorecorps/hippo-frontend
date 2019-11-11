import {mapStateToProps} from "./ProfilePage.container";
import {RESUME_CREATION} from "../../reducers/resume";

const blankState = {
  contacts: [],
  experiences: {},
  tags: {},
  tagItems: {},
  resume: {},
};

test("test resume state mapping", () => {
  const state = Object.assign({}, blankState, {
    contacts: [1, 2, 3, 4],
    experiences: {
      10: {id: 10, data: "exp 1", contact_id: 1, type: "Work"},
      11: {id: 11, data: "exp 2", contact_id: 2, type: "Work"},
      12: {id: 12, data: "exp 3", contact_id: 1, type: "Accomplishment"},
      13: {id: 13, data: "exp 4", contact_id: 1, type: "Service"},
      14: {id: 14, data: "exp 5", contact_id: 1, type: "Work"},
      15: {id: 15, data: "edu 1", contact_id: 1, type: "Education"},
      16: {id: 16, data: "edu 2", contact_id: 1, type: "Education"},
      17: {id: 17, data: "exp 6", contact_id: 1, type: "Service"},
    },
    resume: {
      resumeCreationStep: RESUME_CREATION.SELECT_HIGHLIGHTS,
      selected: {
        experience: [10, 13],
        education: [15],
        accomplishments: [12],
      },
    },
  });
  const ownProps = {
    match: {
      params: {
        contactId: 1,
      },
    },
  };

  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty("resume");
  ["exp", "edu", "achieve", "skills"].forEach(suffix => {
    expect(props.resume).toHaveProperty(`relevant_${suffix}`);
    expect(props.resume).toHaveProperty(`other_${suffix}`);
  });
  expect(props.resume.relevant_exp.sort()).toEqual([10, 13]);
  expect(props.resume.other_exp.sort()).toEqual([14, 17]);
  expect(props.resume.relevant_edu).toEqual([15]);
  expect(props.resume.other_edu).toEqual([16]);
  expect(props.resume.relevant_achieve).toEqual([12]);
  expect(props.resume.other_achieve).toEqual([]);
});

test("test resume state mapping - non-select", () => {
  const state = Object.assign({}, blankState, {
    contacts: [1, 2, 3, 4],
    experiences: {
      10: {id: 10, data: "exp 1", contact_id: 1, type: "Work"},
      11: {id: 11, data: "exp 2", contact_id: 2, type: "Work"},
      12: {id: 12, data: "exp 3", contact_id: 1, type: "Accomplishment"},
      13: {id: 13, data: "exp 4", contact_id: 1, type: "Service"},
      14: {id: 14, data: "exp 5", contact_id: 1, type: "Work"},
      15: {id: 15, data: "edu 1", contact_id: 1, type: "Education"},
      16: {id: 16, data: "edu 2", contact_id: 1, type: "Education"},
      17: {id: 17, data: "exp 6", contact_id: 1, type: "Service"},
    },
    resume: {
      resumeCreationStep: RESUME_CREATION.CHOOSE_STYLE,
      selected: {
        experience: [10, 13],
        education: [15],
        accomplishments: [12],
      },
    },
  });
  const ownProps = {
    match: {
      params: {
        contactId: 1,
      },
    },
  };

  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty("resume");
  ["exp", "edu", "achieve", "skills"].forEach(suffix => {
    expect(props.resume).toHaveProperty(`relevant_${suffix}`);
    expect(props.resume).toHaveProperty(`other_${suffix}`);
  });
  expect(props.resume.relevant_exp.sort()).toEqual([10, 13, 14, 17]);
  expect(props.resume.other_exp).toEqual([]);
  expect(props.resume.relevant_edu.sort()).toEqual([15, 16]);
  expect(props.resume.other_edu).toEqual([]);
  expect(props.resume.relevant_achieve.sort()).toEqual([12]);
  expect(props.resume.other_achieve).toEqual([]);
});
