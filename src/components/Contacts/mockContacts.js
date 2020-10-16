const mockContacts = [];
for (let i = 0; i < 550; i++) {
  mockContacts.push({
    account_id: null,
    email: `taylor${i + 1}@swift.com`,
    first_name: 'Taylor',
    id: i + 1,
    last_name: `Swift${i + 1}`,
    phone_primary: '+1 (555) 555-9913',
    status: 'approved',
  });
}

export {mockContacts};
