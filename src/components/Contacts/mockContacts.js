const mockContacts = [];
for (let i = 0; i < 150; i++) {
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

for (let i = 150; i < 290; i++) {
  mockContacts.push({
    account_id: null,
    email: `taylor${i + 1}@swift.com`,
    first_name: 'Taylor',
    id: i + 1,
    last_name: `Swift${i + 1}`,
    phone_primary: '+1 (555) 555-9913',
    status: 'created',
  });
}
for (let i = 290; i < 350; i++) {
  mockContacts.push({
    account_id: null,
    email: `taylor${i + 1}@swift.com`,
    first_name: 'Taylor',
    id: i + 1,
    last_name: `Swift${i + 1}`,
    phone_primary: '+1 (555) 555-9913',
    status: 'submitted',
  });
}

export {mockContacts};
