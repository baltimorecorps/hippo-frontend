import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ResumeHeader = ({contactInfo}) => {
  const {
    name,
    roles = [],
    title,
    email,
    phoneNumber,
    city,
    state,
  } = contactInfo;

  const phoneString = (phoneNumber || "").toString();
  const formattedPhoneNumber = `${phoneString.slice(0, 3)}-${phoneString.slice(
    3,
    6
  )}-${phoneString.slice(6)}`;

  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={6}>
        <Typography component="h1" variant="h2">
          {name}
        </Typography>
        {!!roles.length && (
          <Typography component="h2" variant="h5">
            {roles[0]} & {roles[1]}
          </Typography>
        )}
        <Typography component="h3" variant="h6">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <ul>
          <li>{email}</li>
          <li>{formattedPhoneNumber}</li>
          <li>
            {city}, {state}
          </li>
        </ul>
      </Grid>
    </Grid>
  );
};

export default ResumeHeader;
