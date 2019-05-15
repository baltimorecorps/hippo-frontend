import { useState } from 'react';

const useFormUpdate = (initialValues) => {
  const filteredValues = Object.entries(initialValues).reduce((object, [key, value]) => ({
    ...object,
    ...(value ? {[key]: value} : null)
  }), {});

  const [values, setValues] = useState(filteredValues || {});

  const update = (name) => (value) => {
    if (value) {
      setValues((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  return [update, values];
};

export default useFormUpdate;
