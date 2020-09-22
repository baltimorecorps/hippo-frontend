import {makeMapStateToProps} from './ExperiencesList.container';
import {RESUME_CREATION} from 'state/resume';

const blankState = {
  contacts: [],
  experiences: {},
  resume: {},
};

test('test inSelectMode true', () => {
  const ownProps = {
    contactId: 2,
    experienceType: 'Work',
  };

  const state = Object.assign({}, blankState, {
    resume: {resumeCreationStep: RESUME_CREATION.SELECT_HIGHLIGHTS},
  });

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('inSelectMode');
  expect(props.inSelectMode).toBe(true);
});

test('test inSelectMode true', () => {
  const ownProps = {
    contactId: 2,
    experienceType: 'Work',
  };

  const state = Object.assign({}, blankState, {
    resume: {resumeCreationStep: RESUME_CREATION.NOT_ACTIVE},
  });

  const mapStateToProps = makeMapStateToProps();
  const props = mapStateToProps(state, ownProps);
  expect(props).toHaveProperty('inSelectMode');
  expect(props.inSelectMode).toBe(false);
});
