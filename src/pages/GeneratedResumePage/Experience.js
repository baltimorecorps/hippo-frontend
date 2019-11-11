import React from "react";
import formatDate from "lib/formatDate";
import Typography from "@material-ui/core/Typography";

const Experience = ({startDate, endDate, orgName, positionName, feats}) => {
  return (
    <div>
      <Typography component="h4" variant="h5">
        {formatDate(startDate, "MMM YYYY")} to{" "}
        {endDate ? formatDate(endDate, "MMM YYYY") : "Present"}
      </Typography>
      <Typography component="h4" variant="h6">
        {positionName}, {orgName}
      </Typography>
      {feats &&
        feats.map(feat => (
          <Typography key={feat.text} component="p" variant="body1">
            {feat.text}
          </Typography>
        ))}
    </div>
  );
};

export default Experience;
