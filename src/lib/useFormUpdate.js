import { useState } from 'react';

const useFormUpdate = (initialValues) => {
  const filteredValues = Object.entries(initialValues).reduce((object, [key, value]) => ({
    ...object,
    ...(value === null || value === undefined ? null : {[key]: value})
  }), {});

  const [values, setValues] = useState(filteredValues || {});

  const update = (name) => (value) => {
    console.log({name, value});
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
