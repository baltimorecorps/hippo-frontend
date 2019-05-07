import React from 'react';
import { Card } from 'semantic-ui-react';

const items = [
  {
    href: '/ContactInfo',
    header: 'Betty White',
    meta: 'Engineer',
    description:
      'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
  },
  {
    href: '/ContactInfo',
    header: 'Elliot Baker',
    meta: 'Engineer',
    description:
      'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
  },
  {
    href: '/ContactInfo',
    header: 'Billy Daly',
    meta: 'Engineer',
    description:
      'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
  },
];

const ApplicationCardProps = () => <Card.Group items={items} />;

export default ApplicationCardProps;
