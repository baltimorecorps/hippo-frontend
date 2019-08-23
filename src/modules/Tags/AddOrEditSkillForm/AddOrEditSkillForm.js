import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-awesome-modal';

import Autosuggest from 'react-autosuggest';
import './autoSuggest.css';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import getTextScore from 'modules/Tags/utilities/getTextScore';

import useFormUpdate from 'components/Profile/useFormUpdate';

const useForm = (initialValues, onSubmit) => {
  const [update, values] = useFormUpdate(initialValues);

  const handlers = {
    handleChange: (event, { newValue, method }) => {
      if (method === 'type') {
        update('name')(newValue);
      } else {
        update('name')(newValue.name);
        update('tag_id')(newValue.id);
      }
    },
    handleScore: (value) => update('score')(parseInt(value)),
    handleSubmit: () => {
      onSubmit(values);
    },
  };

  return [values, handlers];
};

const AddOrEditSkillForm = ({ allTags, tag, onSubmit, onCancel }) => {
  const [values, { handleChange, handleSuggestion, handleSubmit, handleScore }] = useForm(
    tag,
    onSubmit,
  );

  // AUTOSUGGEST setup
  const [suggestions, setSuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currSuggestion, setCurrSuggestion] = useState(values.name);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength === 0) return [];
    return allTags.filter((data) => data.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };
  const getSuggestionValue = (suggestion) => suggestion;
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;
  const inputProps = {
    placeholder: 'Type to Find A Skill',
    name: 'name',
    value: values.name,
    onChange: handleChange,
  };

  return (
    <div>
      <Modal visible="true" width="400" height="300" effect="fadeInUp">
        <div style={{ margin: '20px' }}>
          <h3>Add Skill</h3>
          <Form>
            <Form.Field>
              <label> </label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onClick={handleSuggestion}
              />
            </Form.Field>

            <Form.Field>
              <br />
              <Dropdown as={ButtonGroup}>
                <Button size="lg" variant="success">
                  {getTextScore(values.score)}
                </Button>
                <Dropdown.Toggle split variant="warning" id="dropdown-custom-2" />
                <Dropdown.Menu className="super-colors">
                  {[1, 2, 3, 4].map((item) => (
                    <Dropdown.Item key={item} eventKey={item} onSelect={handleScore}>
                      {getTextScore(item)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Field>
            <br />

            <p>
              {' '}
              <Button type="submit" onClick={handleSubmit} value="Save">
                {' '}
                Save
              </Button>{' '}
              <Button type="button" onClick={onCancel} value="Cancel">
                Cancel
              </Button>
            </p>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

AddOrEditSkillForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  allTags: PropTypes.array.isRequired,
  tagType: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
  tag: PropTypes.shape({
    tag_id: PropTypes.number.isRequired,
    contact_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['Function', 'Skill', 'Topic']).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddOrEditSkillForm;
