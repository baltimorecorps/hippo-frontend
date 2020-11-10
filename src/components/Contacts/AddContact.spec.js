import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddContact from './AddContact';

describe('AddContact', () => {
  test('Render AddContact', () => {
    const addNewContact = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <AddContact
        addNewContact={addNewContact}
        accountId={200}
        emailSuggest="taylor@swift.com"
      />
    );

    expect(getByTestId('add_contact_form')).toBeInTheDocument();
    expect(getByTestId('first_name')).toBeInTheDocument();
    expect(getByTestId('last_name')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('terms_agreement')).toBeInTheDocument();
    expect(getByTestId('create_profile_button')).toBeInTheDocument();

    const textFields = getAllByTestId('text_field');
    expect(textFields.length).toBe(4);

    expect(textFields[0].value).toBe('');
    expect(textFields[1].value).toBe('');
    expect(textFields[2].value).toBe('taylor@swift.com');
    // expect(textFields[3].value).toBe(''); // phone number

    expect(
      getByTestId('terms_agreement').querySelector('input[type="checkbox"]')
    ).toHaveProperty('checked', false);

    fireEvent.change(textFields[0], {target: {value: 'Taylor'}});
    fireEvent.change(textFields[1], {target: {value: 'Swift'}});
    fireEvent.change(textFields[2], {
      target: {value: 'taylor2@swift.com'},
    });
    // fireEvent.change(textFields[3], {target: {value: '4445555555'}});

    fireEvent.click(getByTestId('clickable_terms_agreement'));

    expect(textFields[0].value).toBe('Taylor');
    expect(textFields[1].value).toBe('Swift');
    expect(textFields[2].value).toBe('taylor2@swift.com');
    // expect(textFields[3].value).toBe('4445555555');
    expect(
      getByTestId('terms_agreement').querySelector('input[type="checkbox"]')
    ).toHaveProperty('checked', false);

    fireEvent.click(getByTestId('create_profile_button'));
    // expect(getByTestId('creating_profile')).toBeInTheDocument();
    // expect(addNewContact.mock.calls.length).toBe(1);
  });
});
