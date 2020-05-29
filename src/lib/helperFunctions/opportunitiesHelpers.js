const groupOpportunitiesByProgramName = (
  opportunities,
  programNames,
  isActive
) => {
  let groupedOpportunities = [];
  for (let i = 0; i < programNames.length; i++) {
    let filteredOpportunities = [];
    filteredOpportunities = opportunities.filter(
      opp => opp.program_name === programNames[i] && opp.is_active === isActive
    );
    groupedOpportunities.push(filteredOpportunities);
  }
  return groupedOpportunities;
};

// this sort everything by one category, doesn't group opportunities by program name before sorting
const sortByCategory = (opportunities, category) => {
  let result = [];

  result = opportunities.sort((a, b) => {
    return a[category] > b[category] ? 1 : -1;
  });

  return result;
};

const filterByProgramAndSortByCategory = (
  opportunities,
  programName,
  category
) => {
  let result = [];

  result = opportunities.filter(opp => opp.program_name === programName);
  result = sortAllOpportunitiesByCategory(result, category);

  return result;
};

const getAllPrograms = opportunities => {
  let allPrograms = [];

  // get all program names
  opportunities.forEach(opp => {
    if (!allPrograms.includes(opp.program_name)) {
      allPrograms.push(opp.program_name);
    }
  });

  // sort program names alphabetically
  allPrograms.sort((a, b) => (a > b ? 1 : -1));

  return allPrograms;
};

// this sorting groups opportunities by program names before sorting.
// Good use for raw data from the backend when all programs are mixed everywhere in the same array
const sortAllOpportunitiesByCategory = (opportunities, category) => {
  // get all program names and sorted
  const allPrograms = getAllPrograms(opportunities);
  let sortedOpportunities = [];

  // group by program name and by is_active status
  const activeOpportunitiesGroups = groupOpportunitiesByProgramName(
    opportunities,
    allPrograms,
    true
  );
  const inactiveOpportunitiesGroups = groupOpportunitiesByProgramName(
    opportunities,
    allPrograms,
    false
  );

  // sorted each group by category (e.g. title, org_name)
  for (let i = 0; i < activeOpportunitiesGroups.length; i++) {
    const sortedGroup = sortByCategory(activeOpportunitiesGroups[i], category);
    sortedOpportunities = [...sortedOpportunities, ...sortedGroup];
  }
  for (let i = 0; i < inactiveOpportunitiesGroups.length; i++) {
    const sortedGroup = sortByCategory(
      inactiveOpportunitiesGroups[i],
      category
    );
    sortedOpportunities = [...sortedOpportunities, ...sortedGroup];
  }

  return sortedOpportunities;
};

const filterOpportunitiesByPrograms = (opportunities, value, programs) => {
  let sortedOpportunities = [];
  if (programs && programs.length > 0) {
    let filteredOpportunities = [];
    programs.forEach(program => {
      const opps = filterByProgramAndSortByCategory(
        opportunities,
        program,
        'title'
      );
      filteredOpportunities = [...filteredOpportunities, ...opps];
    });
    sortedOpportunities = sortAllOpportunitiesByCategory(
      filteredOpportunities,
      'title'
    );
  } else {
    sortedOpportunities = sortAllOpportunitiesByCategory(
      opportunities,
      'title'
    );
  }

  let theOpportunities;

  // Each value represent each program to filter by program
  switch (value) {
    case 0: // All
      theOpportunities = sortedOpportunities;
      break;

    case 1:
      theOpportunities = filterByProgramAndSortByCategory(
        opportunities,
        programs[0],
        'title'
      );
      break;
    case 2:
      theOpportunities = filterByProgramAndSortByCategory(
        opportunities,
        programs[1],
        'title'
      );
      break;
    case 3:
      theOpportunities = filterByProgramAndSortByCategory(
        opportunities,
        programs[2],
        'title'
      );
      break;
    case 4:
      theOpportunities = filterByProgramAndSortByCategory(
        opportunities,
        programs[3],
        'title'
      );
      break;
    default:
      // All
      theOpportunities = sortedOpportunities;
      break;
  }
  return theOpportunities;
};

export {
  sortByCategory,
  filterByProgramAndSortByCategory,
  sortAllOpportunitiesByCategory,
  filterOpportunitiesByPrograms,
};
