import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { Card, IconButton, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import firebase from "../firebase/firebase";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";

import { deepOrange, deepPurple } from "@material-ui/core/colors";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { GroupSettings } from "../components/GroupSettings";
import { Settings } from "../components/Settings";
import { useHistory } from "react-router-dom";
import { useUserData } from "../hooks/useUserData";

const drawerWidth = 70;
const drawerWidth2 = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "white",
  },
  appBar2: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer2: {
    width: drawerWidth2,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaper2: {
    width: drawerWidth2,
  },
  // necessary for content to be below app bar
  toolbar2: theme.mixins.toolbar,

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth2}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth2,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawer2: {
    width: drawerWidth2,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginRight: -drawerWidth,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const groups = [
  {
    id: 12,
    name: "Team Moon Stonks",
    icon: "ben.jpg",
    members: ["steven@gmail.com", "scott@gmail.com"],
  },
  {
    id: 34,
    name: "Other team",
    icon: "ben.jpg",
    members: ["scott@gmail.com", "brenden@gmail.com"],
  },
];

const colorMap = {
  0: "blue",
  1: "red",
  2: "green",
  3: "orange",
  4: "yellow",
  5: "purple",
};

// groups
//   .find((group) => group.id === groupId)
//   .members.reduce(async (result, member, index) => {
//     let color = colorMap[index];
//     const events = await db.get(member.events);
//     const processed = events.map((event) => ({
//       start: event.start,
//       end: event.end,
//       title: member.name,
//       color,
//     }));
//     return [...result, ...processed];
//   }, []);

export const CalendarPage = () => {
  /**
   * To access events: userData.events,
   * To access groups: userData.groups
   */
  const userData = useUserData();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(false); // this is react hook for brenden
  const [joinOrCreate, setJoinOrCreate] = React.useState(false); // this is react hook for brenden
  const [groupID, setGroupID] = React.useState(0); // Set group
  const [calView, setCalView] = React.useState("timeGridWeek");
  const [events, setEvents] = React.useState([]);

  const history = useHistory();

  const classes = useStyles();

  let calendarRef = React.useRef();

  const handleCalViewChange = (event) => {
    setCalView(event.target.value);
  };

  useEffect(() => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(calView);
  }, [calView]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (userData.groups.length) {
      setGroupID(userData.groups[0].id);
    }
  }, [userData]);

  useEffect(() => {
    const processData = async () => {
      if (userData.groups.length) {
        const db = firebase.firestore();

        const results = await userData.groups
          .find((group) => group.id === groupID)
          .members.forEach(async (member, index) => {
            let color = colorMap[index];
            const userRef = db.collection("profiles").doc(member);
            const res = await userRef.get();
            const userEvents = res.data().events;
            const processed = userEvents.map((event) => ({
              start: event.start,
              end: event.end,
              title: res.data().name,
              color,
            }));
            return processed;
          });

        return results;
      } else {
        return [];
      }
    };

    if (groupID) {
      (async () => {
        const res = await processData();
        setEvents([...events, ...res])
      })();
    }
  }, [groupID, userData]);

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {settings ? "Settings" : "Calendar"}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer2}
        variant="permanent"
        style={{ width: drawerWidth }}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar2} />
        <Divider />
        <Tooltip title="User Settings" arrow placement="right">
          <Button
            onClick={() => {
              console.log(`i clicked on user settings`);
              // setGroup("settings");
              setSettings(true);
              setJoinOrCreate(false);
            }}
          >
            <HomeIcon fontSize="large" />
          </Button>
        </Tooltip>
        <Divider />
        <List>
          {groups.map((
            text,
            index // replace groups with userData.groups
          ) => (
            <Tooltip title={text.name} arrow placement="right">
              <Button
                onClick={() => {
                  console.log(`i clicked ${text.id}`);
                  setGroupID(text.id);
                  setSettings(false);
                  setJoinOrCreate(false);
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://i.imgur.com/RTE1I5f.png"
                />
              </Button>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <Tooltip title="Add New Group" arrow placement="right">
          <Button
            onClick={() => {
              console.log(`i clicked on add a new group button`);
              // setGroup("settings");
              setSettings(false); // add a new group button and set settings in this onClick method
              setJoinOrCreate(true);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.content]: open,
        })}
      >
        <div className={classes.toolbar2} />

        <div>
          <Grid container>
            <Grid item xs={7}>
              <Typography>Calendar</Typography>
            </Grid>
            <Grid item xs={5} direction="row">
              {!settings && !joinOrCreate && (
                <span>
                  <FormControl variant="standard">
                    <InputLabel htmlFor="filled-age-native-simple">
                      Set View
                    </InputLabel>
                    <Select
                      id="calViewSelect"
                      value={calView}
                      onChange={handleCalViewChange}
                    >
                      <MenuItem value={"timeGridWeek"}>Time Grid Week</MenuItem>
                      <MenuItem value={"dayGridMonth"}>Day Grid Month</MenuItem>
                      <MenuItem value={"dayGridWeek"}>Day Grid Week</MenuItem>
                    </Select>
                  </FormControl>
                </span>
              )}
            </Grid>
          </Grid>
          {settings || joinOrCreate ? (
            settings ? (
              <Settings />
            ) : (
              <GroupSettings />
            )
          ) : (
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, dayGridPlugin]}
              initialView={calView} // dayGridMonth, dayGridWeek, timeGridWeek
              nowIndicator={true}
              weekends={true}
              // events= 'https://fullcalendar.io/demo-events.json'
              events={[
                {
                  title: "Steven",
                  start: "2021-01-15T08:00:00.000",
                  end: "2021-01-15T12:00:00.000",
                  backgroundColor: "red",
                },
                {
                  title: "Ben",
                  start: "2021-01-15T08:00:00.000",
                  end: "2021-01-15T11:00:00.000",
                  backgroundColor: "blue",
                },
                {
                  title: "Scott",
                  start: "2021-01-15T01:00:00.000",
                  end: "2021-01-15T15:00:00.000",
                  backgroundColor: "green",
                },
                {
                  title: "Brenden",
                  start: "2021-01-15T08:00:00.000",
                  end: "2021-01-15T16:00:00.000",
                  backgroundColor: "orange",
                },
              ]}
            />
          )}
        </div>
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper2,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
          
  
        <Tooltip title="personAdd" arrow placement="left">
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => {
              console.log("add a person lol");
            }}
          >
            <PersonAddIcon /> <Typography>Add Member</Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="manage Group" arrow placement="left">
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => {
              console.log("manageGroup");
            }}
          >
            <PeopleIcon /> <Typography>Manage Group</Typography>
          </IconButton>
        </Tooltip>

        <Divider />
        <List>
          {["Ben", "Brenden", "Scott", "Steven"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Avatar className={classes.orange}>{text}</Avatar>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container>
          <Grid item direction="row">
            <Avatar alt="Remy Sharp" src="https://i.imgur.com/OKDYTzw.png" />
          </Grid>
          <Grid item direction="row">
            {" "}
            <Typography>Name #1234</Typography>
            <Grid item direction="row">
              {" "}
              <SettingsIcon />{" "}
              <Tooltip title="Logout" arrow placement="top">
                <IconButton color="inherit" edge="end" onClick={handleLogout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>{" "}
        </Grid>
      </Drawer>
    </div>
  );
};
