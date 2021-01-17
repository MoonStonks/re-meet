import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { Card, IconButton, Typography, Button } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import firebase from "../firebase/firebase";

import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
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
import { useWindowDimensions } from "../hooks/useWindowDimensions";

import InvitePopup from "../components/InvitePopup";
import LeaveGroupPopup from "../components/LeaveGroupPopup";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "copy-to-clipboard";
import { UserContext } from "../context/UserContext";

const drawerWidth = 70;
const drawerWidth2 = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#a8b3cc",
  },
  drawerPaper2: {
    width: drawerWidth2,
    backgroundColor: "#a8b3cc",
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
  0: "#285285", // greyBlue
  1: "#ab4459", // roseRed
  2: "green",
  3: "#cf7908", // orange
  4: "#d1b64b", // sandYellow
  5: "#9055ad", // lightPurple
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
  const { userData, refreshData } = useUserData();
  const [state, dispatch] = useContext(UserContext);
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(false); // this is react hook for brenden
  const [joinOrCreate, setJoinOrCreate] = React.useState(false); // this is react hook for brenden
  const [groupID, setGroupID] = React.useState(0); // Set group
  const [calView, setCalView] = React.useState("timeGridWeek");
  const [events, setEvents] = React.useState([]);
  const [groupMembers, setGroupMembers] = React.useState([]);

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
      let processed = [];
      let people = [];

      if (userData.groups.length) {
        const db = firebase.firestore();

        try {
          await Promise.all(
            userData.groups
              .find((group) => group.id === groupID)
              .members.map(async (member, index) => {
                let color = colorMap[index];
                const userRef = db.collection("profiles").doc(member);
                const res = await userRef.get();
                const userEvents = res.data().events;
                people.push(res.data());
                userEvents.forEach((event) =>
                  processed.push({
                    start: event.start,
                    end: event.end,
                    title: res.data().name,
                    color,
                  })
                );
              })
          );
        } catch {
          // do nothing
        }

        setGroupMembers(people);
      }

      return processed;
    };

    if (groupID) {
      processData().then((res) => setEvents(res));
    }
  }, [groupID, userData]);

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
            {settings
              ? "Settings"
              : joinOrCreate
              ? "Group Settings"
              : state.selectedGroup? `${state.selectedGroup?.name}'s Shared Calendar` : "Calendar"}
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
        <List>
          {userData.groups.map((group) => (
            <Tooltip title={group.name} arrow placement="right">
              <div
                style={{
                  filter:
                    group.id === state.selectedGroup?.id
                      ? "drop-shadow(0 0 0.25rem black)"
                      : undefined,
                }}
              >
                <Button
                  onClick={() => {
                    console.log(`i clicked ${group.id}`);
                    setGroupID(group.id);
                    dispatch({ type: "SET_SELECTED_GROUP", payload: group });
                    setSettings(false);
                    setJoinOrCreate(false);
                  }}
                >
                  <Avatar alt={group.icon} src={group.icon} />
                </Button>
              </div>
            </Tooltip>
          ))}
        </List>
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
            <SettingsIcon fontSize="large" />
          </Button>
        </Tooltip>
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
          {/* <Grid container>
            <Grid item xs={5}>
              <Typography> </Typography>
            </Grid>
            <Grid item xs={5} direction="row"> */}
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
                  <MenuItem value={"timeGridWeek"}>Shared Weekly</MenuItem>
                  <MenuItem value={"timeGridDay"}>Shared Daily</MenuItem>
                  <MenuItem value={"dayGridMonth"}>Monthly Summary</MenuItem>
                </Select>
              </FormControl>
            </span>
          )}
          {/* </Grid>
          </Grid> */}
          {settings || joinOrCreate ? (
            settings ? (
              <Settings
                name={userData.name}
                email={userData.email}
                userAvatar={userData.picture}
              />
            ) : (
              <GroupSettings />
            )
          ) : (
            <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, dayGridPlugin]}
              initialView={calView} // dayGridMonth, dayGridWeek, timeGridWeek
              nowIndicator={true}
              height={height - 170}
              weekends={true}
              // events= 'https://fullcalendar.io/demo-events.json'
              events={events}
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
        <Divider style={{ marginTop: 10 }} />

        <InvitePopup
          inviteId={groupID}
          // onClick={copy({ groupID })}
        />
        <Divider style={{ marginBottom: 10 }} />
        <LeaveGroupPopup
          leaveGroup={groupID}
          leaveGroupName={state.selectedGroup?.name ?? ""}
        />
        <Divider />
        <List>
          {groupMembers.map((member, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                <Avatar className={classes.orange}>
                  <img
                    src={member.picture}
                    alt="member"
                    width={40}
                    height={40}
                  />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={member.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar>
                <img
                  src={userData.picture}
                  alt={userData.picture}
                  width={40}
                  height={40}
                />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <span style={{ fontSize: 13, fontWeight: "bold" }}>
                  {userData.name}
                </span>
              }
            />
            <Tooltip title="Logout" arrow placement="top">
              <IconButton color="inherit" edge="end" onClick={handleLogout}>
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>

        {/* <Grid container>
          <Grid item direction="row">
            <Avatar alt={userData.picture} src={userData.picture} />
          </Grid>
          <Grid item direction="row">
            {" "}
            <Typography>{userData.name}</Typography>
            <Grid item direction="row">
              {" "}
              <Tooltip title="Logout" arrow placement="top">
                <IconButton color="inherit" edge="end" onClick={handleLogout}>
                  <PowerSettingsNewIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>{" "}
        </Grid> */}
      </Drawer>
    </div>
  );
};
