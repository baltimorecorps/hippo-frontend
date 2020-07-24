const countryList = [
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua And Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia, Plurinational State Of',
  'Bonaire, Sint Eustatius And Saba',
  'Bosnia And Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, The Democratic Republic Of The',
  'Cook Islands',
  'Costa Rica',
  "Côte D'ivoire",
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-bissau',
  'Guyana',
  'Haiti',
  'Heard Island And Mcdonald Islands',
  'Holy See (vatican City State)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran, Islamic Republic Of',
  'Iraq',
  'Ireland',
  'Isle Of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea, Democratic People's Republic Of",
  'Korea, Republic Of',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Macedonia, The Former Yugoslav Republic Of',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia, Federated States Of',
  'Moldova, Republic Of',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State Of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Réunion',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Barthélemy',
  'Saint Helena, Ascension And Tristan Da Cunha',
  'Saint Kitts And Nevis',
  'Saint Lucia',
  'Saint Martin (french Part)',
  'Saint Pierre And Miquelon',
  'Saint Vincent And The Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome And Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (dutch Part)',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia And The South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Svalbard And Jan Mayen',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan, Province Of China',
  'Tajikistan',
  'Tanzania, United Republic Of',
  'Thailand',
  'Timor-leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad And Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks And Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'United States Minor Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela, Bolivarian Republic Of',
  'Viet Nam',
  'Virgin Islands, British',
  'Virgin Islands, U.s.',
  'Wallis And Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const genders = ['Female', 'Male', 'Non-Binary', 'Not Listed'];
const pronouns = [
  'She/Her/Hers',
  'He/Him/His',
  'They/Them/Their',
  'Not Listed',
];

const raceLabels = {
  american_indian: 'American Indian or Alaskan Native',
  asian: 'Asian',
  black: 'Black or African Descent',
  hispanic: 'Hispanic or Latinx',
  hawaiian: 'Native Hawaiian or Other Pacific Islander',
  south_asian: 'South Asian',
  white: 'White',
  not_listed: 'Not Listed',
  race_other: '',
};

const roleLabels = {
  advocacy_public_policy: 'Advocacy and Public Policy',
  community_engagement_outreach: 'Community Engagement and Outreach',
  data_analysis: 'Data Analysis',
  fundraising_development: 'Fundraising and Development',
  marketing_public_relations: 'Marketing and Public Relations',
  operations_administration: 'Operations and Administration',
  program_management: 'Program Management',
};

const jobSearchStatus = [
  'Actively looking for a job',
  'Looking for a job in the next 2-6 months',
  'Curious to see what opportunities are available',
];
const currentJobStatus = [
  'Unemployed',
  'Employed part-time',
  'Employed full-time',
];
const currentEduStatus = [
  'Full-time student',
  'Part-time student',
  'Currently not a student',
];

const yearsOfExperience = ['0-2 years', '3-5 years', '5+ years'];

const programs = [
  'Baltimore Corps Fellowship',
  'JHU Carey Humanities Fellowship',
  'Place for Purpose',
  'Public Allies',
  "I'd like some help figuring this out",
];

export {
  countryList,
  states,
  genders,
  pronouns,
  raceLabels,
  jobSearchStatus,
  yearsOfExperience,
  programs,
  roleLabels,
  currentJobStatus,
  currentEduStatus,
};
