import React, {useState} from 'react';
import update from 'immutability-helper';
import ExperienceSortItem from './ExperienceSortItem';

const ExperienceSorter = ({experiences}) => {
  const [sortedExperiences, setExperiences] = useState(experiences);
  const move = (dragIndex, hoverIndex) => {
    const dragCard = sortedExperiences[dragIndex];
    console.log('move');
    setExperiences(
      update(sortedExperiences, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      })
    );
  };
  return (
    <ul>
      {sortedExperiences.map(({positionName, orgName}) => (
        <ExperienceSortItem
          key={`${positionName}.${orgName}`}
          positionName={positionName}
          orgName={orgName}
          move={move}
        />
      ))}
    </ul>
  );
};

// <li key={`${positionName}.${orgName}`}>
//   {orgName} | {positionName}
// </li>
export default ExperienceSorter;
