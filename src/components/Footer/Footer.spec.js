import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

test('Footer: Terms and Privacy links', () => {
  const {getByTestId, getByText} = render(<Footer />);
  const footer = getByTestId('footer');
  const terms = getByText('Terms');
  const privacy = getByText('Privacy');
  expect(footer).toBeInTheDocument();
  expect(terms).toBeInTheDocument();
  expect(privacy).toBeInTheDocument();
  expect(terms.getAttribute('href')).toEqual('services-terms.pdf');
  expect(privacy.getAttribute('href')).toEqual('privacy-policy.pdf');
});
