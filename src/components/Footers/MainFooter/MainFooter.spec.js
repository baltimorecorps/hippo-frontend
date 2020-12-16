import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import MainFooter from './MainFooter';
import {MemoryRouter} from 'react-router';

test('App Footer: should display on certain pages', () => {
  const {getByTestId, getByText} = render(
    <MemoryRouter initialEntries={['/profile']}>
      <MainFooter />
    </MemoryRouter>
  );
  const footer = getByTestId('footer');
  const terms = getByText('Terms');
  const privacy = getByText('Privacy');
  expect(footer).toBeInTheDocument();
  expect(terms).toBeInTheDocument();
  expect(privacy).toBeInTheDocument();
  expect(terms.getAttribute('href')).toEqual('services-terms.pdf');
  expect(privacy.getAttribute('href')).toEqual(
    'https://www.baltimorecorps.org/privacy-policy'
  );
});

test('App Footer: should NOT display on certain pages', () => {
  const {queryByTestId} = render(
    <MemoryRouter
      initialEntries={[
        '/opportunities/1243d0eb-55d6-4294-b885-02a056c87963/contacts/78/internal-review',
      ]}
    >
      <MainFooter />
    </MemoryRouter>
  );
  expect(queryByTestId('footer')).toBeNull();
});
