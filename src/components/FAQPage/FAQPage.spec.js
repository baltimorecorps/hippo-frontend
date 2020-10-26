import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FAQPage from './FAQPage';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('FAQ Page', () => {
  const history = createMemoryHistory();

  test('Render The Page', () => {
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <FAQPage />
      </Router>
    );
    expect(getByTestId('page_header')).toBeInTheDocument();
    expect(getByTestId('faq_section_profile_and_resume')).toBeInTheDocument();
    expect(getByTestId('faq_section_applying_for_a_role')).toBeInTheDocument();
    expect(getByTestId('faq_section_others')).toBeInTheDocument();
    expect(getByTestId('faq_section_more_questions')).toBeInTheDocument();
    expect(getAllByTestId('question').length).toBe(15);
    expect(getAllByTestId('answer').length).toBe(15);
    expect(getAllByTestId('sub_content_header').length).toBe(12);
    expect(getByTestId('link_to_add_new_case')).toBeInTheDocument();
  });

  test('Click link to add new case', () => {
    const {getByTestId} = render(
      <Router history={history}>
        <FAQPage />
      </Router>
    );

    const linkToAddNewCase = getByTestId('link_to_add_new_case');

    expect(linkToAddNewCase).toBeInTheDocument();
    expect(linkToAddNewCase).toHaveAttribute(
      'href',
      'https://www.tfaforms.com/4602493'
    );
  });
});
