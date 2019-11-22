import 'isomorphic-fetch';
import React from 'react';

import {API_URL} from '../../constants';
import throttle from 'lodash/throttle';

import SkillSelect from './SkillSelect'

const loadOptions = async query => {
  const url = encodeURI(`${API_URL}/api/skills/autocomplete/?q=${query}`);
  let results = [];
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    const json = await response.json();
    results = json.data;
  } catch (error) {
    console.error(error);
  }
  
  if (!results) {
    return {matches: [], gotExact: false}
  }

  const matches = results.matches ? results.matches.map(item => ({
    name: item,
    label: item,
  })) : [];

  return {
    matches,
    gotExact: results.got_exact,
  };
};

const load = throttle(inputValue => loadOptions(inputValue), 200);

const SkillSelectApi = (props) => (
  <SkillSelect load={load} {...props} />
)

export default SkillSelectApi;
