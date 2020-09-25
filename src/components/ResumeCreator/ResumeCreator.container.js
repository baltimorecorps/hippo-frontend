import {connect} from 'react-redux';
// import {moveResumeItem} from 'state/resume';
import ResumeCreator from './ResumeCreator';

export const mapStateToProps = (state, props) => {
  const fullExperiences = state.resume.selected.experience
    .map(expId => state.experiences[expId] || null)
    .filter(exp => exp !== null);
  return {
    sections: {experience: fullExperiences},
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    // moveResumeItem: (id, destination, source) => dispatch(moveResumeItem(id, destination, source))
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ResumeCreator);

export default Container;
