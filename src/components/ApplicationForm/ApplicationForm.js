import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import InterestForm from './InterestForm';
import Review from './Review';

const ApplicationForm = ({classes}) => {
  const [step, setStep] = useState(0);

  let history = useHistory();
  const backToOpportunities = () => {
    history.push('/opportunities');
  }

  if (step === 1) {
    return (<Review
      application={{
        interest: 'Lorem ipsum'
      }}
      next={() => setStep(2)}
      back={() => setStep(0)}
    />);
  } else {
    return (<InterestForm
      next={() => setStep(1)}
      back={backToOpportunities}
    />);
  }

}

export default ApplicationForm;
