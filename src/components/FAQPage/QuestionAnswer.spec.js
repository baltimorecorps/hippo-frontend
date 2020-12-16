import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import QuestionAnswer from './QuestionAnswer';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const subContent = [
  {
    content: ['Sub content 1', 'Sub content 2', 'Sub content 3'],
    header: 'Sub content header',
  },
];

describe('FAQ Question and Answer template', () => {
  const history = createMemoryHistory();

  test('Render question and answer with sub content', () => {
    const {getByTestId, getAllByTestId} = render(
      <Router history={history}>
        <QuestionAnswer
          question="Question 1"
          answer="Answer 1"
          subContent={subContent}
        />
      </Router>
    );
    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('answer')).toBeInTheDocument();
    expect(getByTestId('sub_content_header')).toBeInTheDocument();
    expect(getAllByTestId('sub_content_content').length).toBe(3);
  });

  test('Render question and answer without sub content', () => {
    const {getByTestId, queryAllByTestId, queryByTestId} = render(
      <Router history={history}>
        <QuestionAnswer
          question="Question 1"
          answer="Answer 1"
          subContent={null}
        />
      </Router>
    );
    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('answer')).toBeInTheDocument();

    expect(queryByTestId('sub_content_header')).toBeNull();
    expect(queryAllByTestId('sub_content_content').length).toBe(0);
  });
});
