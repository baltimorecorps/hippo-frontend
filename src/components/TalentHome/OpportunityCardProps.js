import React from 'react';
import { Card } from 'semantic-ui-react';

const items = [
  {
    href: '/ContactInfo',
    header: 'PartTime Organizer',
    meta: 'Goodwill',
    description: 'Baltimore |  Apply before 6/3  | Required Skills: Organization',
  },
  {
    href: '/ContactInfo',
    header: 'PartTime Organizer',
    meta: 'Goodwill',
    description: 'Baltimore |  Apply before 6/4  | Required Skills: Organization',
  },
  {
    href: '/ContactInfo',
    header: 'PartTime Organizer',
    meta: 'Goodwill',
    description: 'Baltimore |  Apply before 6/6  | Required Skills: Organization',
  },
];

const OpportunityCardProps = () => <Card.Group items={items} />;

export default OpportunityCardProps;
