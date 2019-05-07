import React from "react";
import Typography from "@material-ui/core/Typography";
import SkillGroup from "./SkillGroup";

const SkillGroups = ({ skillGroups }) => {
  return (
    <section>
      <Typography component="h3" variant="h5">
        Skills and Abilities
      </Typography>
      <hr />
      {skillGroups.map(group => (
        <SkillGroup {...group} />
      ))}
    </section>
  );
};

export default SkillGroups;
