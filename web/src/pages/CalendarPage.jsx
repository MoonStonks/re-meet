import React, { useState } from "react";
import Grid from "@material-ui/core/Grid/Grid";
import { Card, IconButton, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

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

import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { Settings } from "../components/Settings";

const drawerWidth = 50;
const drawerWidth2 = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

const groups = [
    {
      "id": 0,
      "name": "Team Moon Stonks",
      "icon": "ben.jpg",
      "members": ["steven@gmail.com", "scott@gmail.com"]
    },
    {
      "id": 1,
      "name": "Other team",
      "icon": "ben.jpg",
      "members": ["scott@gmail.com", "brenden@gmail.com"]
    }
  ];

export const CalendarPage = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = React.useState(false); // this is react hook for brenden
  // const [group, setGroup] = React.useState(""); // Set group
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
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
            Shared Calendar
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
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar2} />
        <Divider />
        <List>
          {["A", "B", "C"].map((text, index, {name}) => (
            <Tooltip title = {text}  arrow placement="right"><ListItem button key={text} >
              <ListItemIcon>
                <InboxIcon /> 
                {/* 
onClick={()=> console.log(`group ${name}`)
                 */}
              </ListItemIcon>
            </ListItem></Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {["+"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.content]: open,
        })}
      >
        <div className={classes.toolbar2} />

        <div>
          <Grid container>
            <Grid item xs={8}>
              <Card styles={{ height: "500px", backgroundColor: "red" }}>
                <Typography>Calendar</Typography>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card styles={{ height: "500px", backgroundColor: "green" }}>
                <Typography>Members</Typography>
              </Card>
            </Grid>
          </Grid>
          {settings ? (
            <Settings />
          ) : (
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
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
          <ListItem>
          <ListItemIcon>
                {<MailIcon />}
              </ListItemIcon>
              <ListItemText primary={'Add members'} />
          </ListItem>
        <Divider />
        <List>
          {["Ben", "Brenden", "Scott", "Steven"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      
        <Grid container> 
          <Grid item direction='row'>
        <MailIcon/> 
          </Grid> 
          <Grid item direction='row'> <Typography>Name #1234</Typography>
          </Grid> </Grid>
      </Drawer>
    </div>
  );
};
