
export const scoreDescription = (description) => {
  if (description.split(/[ \t\v]+/).length >= 5) {
    return 1;
  } else {
    return 0;
  }
}

export const scoreAchievement = (achievement) => {
  const score = scoreDescription(achievement.description);
  let capabilityScores = {}
  achievement.skills.forEach(skill => {
    capabilityScores[skill.capability_id] = score;
  });
  return capabilityScores
}

export const sumScores = (scoreCollection) => {
  let totals = {}
  scoreCollection.forEach(scores => {
    Object.entries(scores).forEach(([capabilityId, score]) => {
      if (totals[capabilityId] === undefined) {
        totals[capabilityId] = 0;
      }

      totals[capabilityId] += score;
    });
  });
  return totals;
}

export const relativeScores = (base, updated) => {
  let totals = base;
  Object.entries(updated).forEach(([capabilityId, score]) => {
    if (totals[capabilityId] === undefined) {
      totals[capabilityId] = 0;
    }

    totals[capabilityId] -= score;
  });
  return totals;
}


export const scoreAchievements = (achievements) => {
  return sumScores(achievements.map(scoreAchievement));
}

