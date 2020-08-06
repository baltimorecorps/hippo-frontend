const dynamicInstructionContents = {
  about_me: {
    candidate_information: {content: 'Candidate information'},
    value_alignment: {
      content: 'Value alignment',
      helpText:
        'Include 1-2 specific examples on your experiences have prepared you for social justice work.',
    },
    interests: {content: 'Interests and goals'},
    programs: {content: 'Programs and eligibility'},
  },
  profile: {
    tag_skills: {content: 'Add skills', helpText: 'Pick at least three skills'},
    add_experience: {
      is_complete: {
        content: 'Add all relevant experience',
        helpText:
          'Include your professional, volunteer community service, internships, and leadership experiences',
      },
      components: {
        add_achievements: {
          content: 'Add responsibilities',
          helpText: '2-5 responsibilities  for each experience',
        },
        tag_skills: {
          content: 'Tag skills to each experience under responsibilities',
          helpText: '2-5 skills for each experience',
        },
      },
    },
    add_education: {
      content: 'Add education, certificates, or training',
      helpText:
        'This can include college degrees, fellowships, online classes, conferences, workshops CPR/First Aid, etc.',
    },
    add_portfolio: {
      content: 'Add portfolio or work products (optional)',
      helpText:
        'Includes press release (writing sample), position paper, marketing materials, event plan, policy analysis, relevant presentations.',
    },
  },
};

export {dynamicInstructionContents};
