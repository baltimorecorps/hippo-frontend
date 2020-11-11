import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  FormRadioButtons,
  FormHeader,
  FormCheckboxes,
  FormSubmitButton,
  FormDropDownSelector,
  FormTextField,
  FormMultiRowsTextField,
} from './FormTemplates';

describe('FormTemplates', () => {
  test('Render FormHeader', () => {
    const onCloseForm = jest.fn();

    const {getByTestId} = render(
      <FormHeader
        header="Header example"
        descriptions={['Description example']}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('form_header')).toBeInTheDocument();
    expect(getByTestId('form_description')).toBeInTheDocument();
    expect(getByTestId('close_form_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('close_form_button'));
    expect(onCloseForm.mock.calls.length).toBe(1);
  });

  test('Render FormRadioButtons', () => {
    const onChange = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <FormRadioButtons
        question="Question 1?"
        value={null}
        options={['option 1', 'option 2', 'option 3']}
        onChange={onChange}
        name="name_example"
        ariaLabel="name_example"
        error="Error text"
      />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    const options = getAllByTestId('radio_button_option');

    expect(options.length).toBe(3);
    expect(options[0]).toHaveTextContent('option 1');
    expect(options[1]).toHaveTextContent('option 2');
    expect(options[2]).toHaveTextContent('option 3');

    fireEvent.click(options[2]);

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormCheckboxes', () => {
    const onChange = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <FormCheckboxes
        question="Question 1?"
        options={[
          {label: 'option 1', name: 'option_1', checked: false},
          {label: 'option 2', name: 'option_2', checked: false},
          {label: 'option 3', name: 'option_3', checked: false},
        ]}
        onChange={onChange}
        error="Error text"
      />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    const options = getAllByTestId('checkbox_option');

    expect(options.length).toBe(3);
    expect(options[0]).toHaveTextContent('option 1');
    expect(options[1]).toHaveTextContent('option 2');
    expect(options[2]).toHaveTextContent('option 3');

    fireEvent.click(options[1]);

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormSubmitButton', () => {
    const onSubmit = jest.fn();

    const {getByTestId} = render(<FormSubmitButton onSubmit={onSubmit} />);

    fireEvent.click(getByTestId('submit_button'));

    expect(onSubmit.mock.calls.length).toBe(1);
  });

  test('Render FormDropDownSelector with label inside dropdown selector', () => {
    const onChange = jest.fn();

    const {getByTestId} = render(
      <FormDropDownSelector
        isLabelInside={true}
        question="Question 1?"
        value={null}
        options={['option 1', 'option 2', 'option 3']}
        onChange={onChange}
        name="name_example"
        ariaLabel="name_example"
        error="Error text"
      />
    );

    expect(getByTestId('label_inside_dropdown_selector')).toBeInTheDocument();
    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    fireEvent.change(getByTestId('dropdown_selector'), {
      target: {value: 'option 2'},
    });

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormDropDownSelector with label outside dropdown selector', () => {
    const onChange = jest.fn();

    const {getByTestId} = render(
      <FormDropDownSelector
        isLabelInside={false}
        question="Question 1?"
        value={null}
        options={['option 1', 'option 2', 'option 3']}
        onChange={onChange}
        name="name_example"
        ariaLabel="name_example"
        error="Error text"
      />
    );

    expect(getByTestId('label_outside_dropdown_selector')).toBeInTheDocument();
    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    fireEvent.change(getByTestId('dropdown_selector'), {
      target: {value: 'option 2'},
    });

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormTextField with label inside text field', () => {
    const onChange = jest.fn();

    const {getByTestId} = render(
      <FormTextField
        isRequired={true}
        isLabelInside={true}
        value="Current value"
        name="name_example"
        label="Label 1"
        onChange={onChange}
        error="Error text"
      />
    );

    expect(getByTestId('label_inside_text_field')).toBeInTheDocument();
    expect(getByTestId('text_field')).toBeInTheDocument();

    fireEvent.change(getByTestId('text_field'), {
      target: {value: 'New value'},
    });

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormTextField with label outside text field', () => {
    const onChange = jest.fn();

    const {getByTestId} = render(
      <FormTextField
        isRequired={true}
        isLabelInside={false}
        value="Current value"
        name="name_example"
        label="Label 1"
        onChange={onChange}
        error="Error text"
      />
    );

    expect(getByTestId('label_outside_text_field')).toBeInTheDocument();
    expect(getByTestId('text_field')).toBeInTheDocument();

    fireEvent.change(getByTestId('text_field'), {
      target: {value: 'New value'},
    });

    expect(onChange.mock.calls.length).toBe(1);
  });

  test('Render FormMultiRowsTextField', () => {
    const onChange = jest.fn();

    const {getByTestId} = render(
      <FormMultiRowsTextField
        question="Question 1"
        value="Current value"
        name="name_example"
        onChange={onChange}
        error="Error text"
      />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');
    expect(getByTestId('text_field')).toBeInTheDocument();

    fireEvent.change(getByTestId('text_field'), {
      target: {value: 'New value'},
    });

    expect(onChange.mock.calls.length).toBe(1);
  });
});
