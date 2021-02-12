import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  QuestionWithOneAnswer,
  QuestionWithMultipleAnswers,
  Header,
} from './QuestionAnswerDisplayTemplates';

describe('QuestionAnswerDisplayTemplates', () => {
  test('Header Component', () => {
    const onClickEdit = jest.fn();

    const {getByTestId} = render(
      <Header
        header="Header Text"
        onClickEdit={onClickEdit}
        isSubmitted={false}
      />
    );

    expect(getByTestId('header_content')).toBeInTheDocument();
    expect(getByTestId('edit_button')).toBeInTheDocument();
  });

  test('QuestionWithOneAnswer Component with answer', () => {
    const {getByTestId} = render(
      <QuestionWithOneAnswer question="Question 1?" answer="Answer 1" />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    expect(getByTestId('answer')).toBeInTheDocument();
    expect(getByTestId('answer')).toHaveTextContent('Answer 1');
  });

  test('QuestionWithOneAnswer Component with no answer', () => {
    const {getByTestId} = render(
      <QuestionWithOneAnswer question="Question 1?" answer={null} />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    expect(getByTestId('please_answer')).toBeInTheDocument();
    expect(getByTestId('please_answer')).toHaveTextContent('* Please answer *');
  });

  const answers = ['Answer 1', 'Answer 2', 'Answer 3'];

  test('QuestionWithMultipleAnswers Component with answer', () => {
    const {getByTestId, getAllByTestId} = render(
      <QuestionWithMultipleAnswers question="Question 1?" answers={answers} />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    expect(getAllByTestId('answer').length).toBe(3);
    // expect(getAllByTestId('answer')).toHaveTextContent('Answer 1');
  });

  test('QuestionWithMultipleAnswers Component with no answer', () => {
    const {getByTestId} = render(
      <QuestionWithMultipleAnswers question="Question 1?" answer={null} />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Question 1');

    expect(getByTestId('please_answer')).toBeInTheDocument();
    expect(getByTestId('please_answer')).toHaveTextContent('* Please answer *');
  });
});
