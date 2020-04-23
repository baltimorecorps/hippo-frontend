import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';
import {MemoryRouter} from 'react-router';

test('App Footer: should display on certain pages', () => {
  const {getByTestId, getByText} = render(
    <MemoryRouter initialEntries={['/profile']}>
      <Footer />
    </MemoryRouter>
  );
  const footer = getByTestId('footer');
  const terms = getByText('Terms');
  const privacy = getByText('Privacy');
  expect(footer).toBeInTheDocument();
  expect(terms).toBeInTheDocument();
  expect(privacy).toBeInTheDocument();
  expect(terms.getAttribute('href')).toEqual('services-terms.pdf');
  expect(privacy.getAttribute('href')).toEqual('privacy-policy.pdf');
});

test('App Footer: should NOT display on certain pages', () => {
  const {queryByTestId} = render(
    <MemoryRouter
      initialEntries={[
        '/opportunities/1243d0eb-55d6-4294-b885-02a056c87963/contacts/78/internal-review',
      ]}
    >
      <Footer />
    </MemoryRouter>
  );
  expect(queryByTestId('footer')).toBeNull();
});
