import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ContactInfoForm from './ContactInfoForm';
import {applicantEmptyProfile} from 'mockData/applicant';

describe('ContactInfoForm', () => {
  test('Render ContactInfoForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getByTestId} = render(
      <ContactInfoForm
        contact={applicantEmptyProfile}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('contact_info_form')).toBeInTheDocument();
    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();

    fireEvent.click(getByTestId('close_form_button'));
    expect(onCloseForm.mock.calls.length).toBe(1);
  });

  // Enter contact info to forms test on submit and onclose form
  test('Edit data in ContactInfoForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ContactInfoForm
        contact={applicantEmptyProfile}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    expect(getByTestId('contact_info_form')).toBeInTheDocument();
    expect(getByTestId('close_form_button')).toBeInTheDocument();
    expect(getByTestId('submit_button')).toBeInTheDocument();

    // Get all text fields
    const textFields = getAllByTestId('text_field');
    expect(textFields.length).toBe(8);

    // edit first name
    expect(textFields[0]).toHaveAttribute('name', 'first_name');
    expect(textFields[0].value).toBe('Bay');

    fireEvent.change(textFields[0], {
      target: {value: 'Name1'},
    });
    expect(textFields[0].value).toBe('Name1');

    // edit last name
    expect(textFields[1]).toHaveAttribute('name', 'last_name');
    expect(textFields[1].value).toBe('Chairangsaris');

    fireEvent.change(textFields[1], {
      target: {value: 'Lastname1'},
    });
    expect(textFields[1].value).toBe('Lastname1');

    // edit email
    expect(textFields[2]).toHaveAttribute('name', 'email');
    expect(textFields[2].value).toBe('bay@baltimorecorps.org');

    fireEvent.change(textFields[2], {
      target: {value: 'bay@gmail.com'},
    });
    expect(textFields[2].value).toBe('bay@gmail.com');

    // edit phone number DOESN'T WORK

    // expect(getByTestId('phone_primary').value).toBe('+1 (555) 555-9999');

    // fireEvent.change(getByTestId('phone_primary'), {
    //   target: {value: '+1 (555) 555-5555'},
    // });
    // expect(getByTestId('phone_primary').value).toBe('+1 (555) 555-5555');

    // edit address 1
    expect(textFields[3]).toHaveAttribute('name', 'street1');
    expect(textFields[3].value).toBe('');

    fireEvent.change(textFields[3], {
      target: {value: '1234 Apartment Name'},
    });
    expect(textFields[3].value).toBe('1234 Apartment Name');

    // edit address 2
    expect(textFields[4]).toHaveAttribute('name', 'street2');
    expect(textFields[4].value).toBe('');

    fireEvent.change(textFields[4], {
      target: {value: 'Monday St.'},
    });
    expect(textFields[4].value).toBe('Monday St.');

    // edit city
    expect(textFields[5]).toHaveAttribute('name', 'city');
    expect(textFields[5].value).toBe('');

    fireEvent.change(textFields[5], {
      target: {value: 'Baltimore'},
    });
    expect(textFields[5].value).toBe('Baltimore');

    /////// GET ALL DROPDOWN SELECTORS
    const dropdowns = getAllByTestId('dropdown_selector');
    expect(dropdowns.length).toBe(5);

    // edit state
    expect(dropdowns[0]).toHaveAttribute('name', 'state');
    expect(dropdowns[0].value).toBe('');

    fireEvent.change(dropdowns[0], {
      target: {value: 'Maryland'},
    });
    expect(dropdowns[0].value).toBe('Maryland');

    // edit country
    expect(dropdowns[1]).toHaveAttribute('name', 'country');
    expect(dropdowns[1].value).toBe('');

    fireEvent.change(dropdowns[1], {
      target: {value: 'United States'},
    });
    expect(dropdowns[1].value).toBe('United States');

    // edit zip code
    expect(textFields[6]).toHaveAttribute('name', 'zip_code');
    expect(textFields[6].value).toBe('');

    fireEvent.change(textFields[6], {
      target: {value: '21111'},
    });
    expect(textFields[6].value).toBe('21111');

    // edit race checkboxes
    const options = getAllByTestId('checkbox_option');

    expect(options.length).toBe(8);
    expect(options[0]).toHaveTextContent('American Indian or Alaskan Native');
    expect(options[1]).toHaveTextContent('Asian');
    expect(options[2]).toHaveTextContent('Black or African Descent');
    expect(options[3]).toHaveTextContent('Hispanic or Latinx');
    expect(options[4]).toHaveTextContent(
      'Native Hawaiian or Other Pacific Islander'
    );
    expect(options[5]).toHaveTextContent('South Asian');
    expect(options[6]).toHaveTextContent('White');
    expect(options[7]).toHaveTextContent('Not Listed');

    fireEvent.click(options[1]);
    fireEvent.click(options[5]);

    // edit gender
    expect(dropdowns[2]).toHaveAttribute('name', 'gender');
    expect(dropdowns[2].value).toBe('');

    fireEvent.change(dropdowns[2], {
      target: {value: 'Female'},
    });
    expect(dropdowns[2].value).toBe('Female');

    // edit pronoun
    expect(dropdowns[3]).toHaveAttribute('name', 'pronoun');
    expect(dropdowns[3].value).toBe('');

    fireEvent.change(dropdowns[3], {
      target: {value: 'She/Her/Hers'},
    });
    expect(dropdowns[3].value).toBe('She/Her/Hers');

    //  edit hear about us
    expect(dropdowns[4]).toHaveAttribute('name', 'hear_about_us');
    expect(dropdowns[4].value).toBe('');

    fireEvent.change(dropdowns[4], {
      target: {value: 'School'},
    });
    expect(dropdowns[4].value).toBe('School');

    // edit hear about us other
    expect(textFields[7]).toHaveAttribute('name', 'hear_about_us_other');
    expect(textFields[7].value).toBe('');

    fireEvent.change(textFields[7], {
      target: {value: 'CCBC'},
    });
    expect(textFields[7].value).toBe('CCBC');

    // click submit/save button
    fireEvent.click(getByTestId('submit_button'));

    // functions called
    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onCloseForm.mock.calls.length).toBe(1);
  });

  test('Edit gender_other and pronoun_other ContactInfoForm', () => {
    const onSubmit = jest.fn();
    const onCloseForm = jest.fn();

    const {getAllByTestId} = render(
      <ContactInfoForm
        contact={applicantEmptyProfile}
        onSubmit={onSubmit}
        onCloseForm={onCloseForm}
      />
    );

    const dropdowns = getAllByTestId('dropdown_selector');
    expect(dropdowns.length).toBe(5);

    // edit race checkboxes
    const options = getAllByTestId('checkbox_option');

    expect(options.length).toBe(8);
    expect(options[0]).toHaveTextContent('American Indian or Alaskan Native');
    expect(options[1]).toHaveTextContent('Asian');
    expect(options[2]).toHaveTextContent('Black or African Descent');
    expect(options[3]).toHaveTextContent('Hispanic or Latinx');
    expect(options[4]).toHaveTextContent(
      'Native Hawaiian or Other Pacific Islander'
    );
    expect(options[5]).toHaveTextContent('South Asian');
    expect(options[6]).toHaveTextContent('White');
    expect(options[7]).toHaveTextContent('Not Listed');

    fireEvent.click(options[7]);

    // edit gender
    expect(dropdowns[2]).toHaveAttribute('name', 'gender');
    expect(dropdowns[2].value).toBe('');

    fireEvent.change(dropdowns[2], {
      target: {value: 'Not Listed'},
    });
    expect(dropdowns[2].value).toBe('Not Listed');

    // edit pronoun
    expect(dropdowns[3]).toHaveAttribute('name', 'pronoun');
    expect(dropdowns[3].value).toBe('');

    fireEvent.change(dropdowns[3], {
      target: {value: 'Not Listed'},
    });
    expect(dropdowns[3].value).toBe('Not Listed');

    const textFields = getAllByTestId('text_field');
    expect(textFields.length).toBe(11);

    // edit gender other
    expect(textFields[7]).toHaveAttribute('name', 'race_other');
    expect(textFields[7].value).toBe('');

    fireEvent.change(textFields[7], {
      target: {value: 'New Race'},
    });
    expect(textFields[7].value).toBe('New Race');

    // edit gender other
    expect(textFields[8]).toHaveAttribute('name', 'gender_other');
    expect(textFields[8].value).toBe('');

    fireEvent.change(textFields[8], {
      target: {value: 'New Gender'},
    });
    expect(textFields[8].value).toBe('New Gender');

    // edit pronoun other
    expect(textFields[9]).toHaveAttribute('name', 'pronoun_other');
    expect(textFields[9].value).toBe('');

    fireEvent.change(textFields[9], {
      target: {value: 'New Pronoun'},
    });
    expect(textFields[9].value).toBe('New Pronoun');
  });
});
