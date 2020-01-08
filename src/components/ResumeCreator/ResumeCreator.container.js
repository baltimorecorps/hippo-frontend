import {connect} from 'react-redux';
import ResumeCreator from './ResumeCreator';

export const mapStateToProps = (state, props) => {
  const fullExperiences = props.sections.experience.map((expItem) => (
    state.experiences[expItem.id] || null
  )).filter(exp => exp !== null);
  return {
    sections: {experience: fullExperiences},
  }
};

const Container = connect(
  mapStateToProps,
)(ResumeCreator);

export default Container;
