import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Box,
  Button,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
`;

const Spacer = styled.div(spacing);

const Centered = styled.div`
  text-align: center;
`;

function Details(props) {
  return (
    <Card mb={6}>
      <Grid container direction="column">
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Typography variant="h6" gutterBottom style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
              Account
            </Typography>
            <Avatar
              alt={props.name}
              src={props.userAvatar}
              style={{ width: 100, height: 100 }}
            />
            <Spacer mb={2} />

            <Typography variant="body2" component="div" gutterBottom>
              <Box fontWeight="fontWeightMedium">
                {props.firstName ? props.firstName : ""}{" "}
                {props.lastName ? props.lastName : ""}
              </Box>
              <Box fontWeight="fontWeightRegular">
                {props.email ? props.email : "email"}
              </Box>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

function Personal(props) {
  const handleClick = () => {
    const user = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
    };
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Information
        </Typography>

        <FormControl fullWidth mb={3}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            id="name"
            value={props.name}
            placeholder="Name"
          />
          </FormControl>
        <Spacer mb={2} />
        <FormControl fullWidth mb={3}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={props.email}
            placeholder="Email"
          />
        </FormControl>
        <Spacer mb={2} />
        {/* <Button variant="contained" color="primary" onClick={handleClick}>
          Save changes
        </Button> */}
      </CardContent>
    </Card>
  );
}

function Theme(props) {
  const [value, setValue] = React.useState("light theme");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Theme
        </Typography>

        <Centered>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="theme"
              name="theme1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="light theme"
                control={<Radio color="primary" />}
                label="Light"
              />
              <FormControlLabel
                value="dark theme"
                control={<Radio color="primary" />}
                label="Dark"
                disabled={true}
              />
            </RadioGroup>
          </FormControl>
        </Centered>
      </CardContent>
    </Card>
  );
}

export const Settings = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={12} xl={3}>
          <Details
            firstName={props.name}
            lastName={lastName}
            email={props.email}
            picture={picture}
            userAvatar={props.userAvatar}
          />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Personal
            name={props.name}
            firstName={firstName}
            lastName={lastName}
            email={props.email}
            onChangeFirstName={setFirstName}
            onChangeLastName={setLastName}
            onChangeEmail={setEmail}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
      <Theme />
    </React.Fragment>
  );
};
