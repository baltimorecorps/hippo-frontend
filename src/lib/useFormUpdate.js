import { useState } from 'react';

// This is a generic hook we use in the forms of this application.
// (See https://reactjs.org/docs/hooks-custom.html for more on custom hooks)
//
// Basically, all it does is maintain an object where each name maps to a value,
// and provides an update function to update a specific name's value. These
// values then form the state of the component
//
// In practice, the way this is used is that each input element in the form
// corresponds to a single name/value (for the most part) pair, and uses the
// update function to update it's part of values (aka local state). Typically
// this is used to implement the input elements as React controlled components
const useFormUpdate = (initialValues) => {
  const filteredValues = Object.entries(initialValues).reduce((object, [key, value]) => ({
    ...object,
    ...(value === null || value === undefined ? null : {[key]: value})
  }), {});

  const [values, setValues] = useState(filteredValues || {});

  const update = (name) => (value) => {
    if (value || value === '') {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  return [update, values];
};

export default useFormUpdate;
