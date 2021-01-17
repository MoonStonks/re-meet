import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import cryptoRandomString from "crypto-random-string";
import firebase from "../firebase/firebase";
import { useUserData } from "../hooks/useUserData";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const GroupSettings = () => {
  const classes = useStyles();
  const { getData } = useUserData();
  const [openJoin, setOpenJoin] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [groupName, setGroupName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [hash, setHash] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCreateGroup = async () => {
    const cryptoHash = cryptoRandomString({ length: 10, type: "alphanumeric" });
    setHash(cryptoHash);
    const { email } = firebase.auth().currentUser;
    const db = firebase.firestore();
    const user = await db.collection("profiles").doc(email).get();
    const data = user.data();
    await db.collection("groups").add({
      id: cryptoHash,
      name: groupName,
      icon: iconUrl,
      members: [email],
    });
    await db
      .collection("profiles")
      .doc(email)
      .set({
        ...data,
        groups: [...data.groups, cryptoHash],
      });
    getData();
  };

  const handleJoinGroup = async () => {
    const { email } = firebase.auth().currentUser;
    const db = firebase.firestore();
    const user = await db.collection("profiles").doc(email).get();
    const userData = user.data();
    const groupRef = db.collection("groups");
    const group = await groupRef.where("id", "==", joinCode).get();
    const groupData = group.docs[0].data();
    if (groupData) {
      await db
        .collection("groups")
        .doc(joinCode)
        .set({ ...groupData, members: [...groupData.members, email] });
      await db
        .collection("profiles")
        .doc(email)
        .set({
          ...userData,
          groups: [...userData.groups, joinCode],
        });
      getData();
    } else {
      console.log("Group doesn't exist!");
    }
    setOpenJoin(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenJoin = () => {
    setOpenJoin(true);
  };

  const handleCloseJoin = () => {
    setOpenJoin(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Create a group calendar
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Your group is where you can schedule events easily for everyone to
              see. Make yours and start scheduling.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpenCreate}
                  >
                    Create Group
                  </Button>

                  <Dialog
                    open={openCreate}
                    onClose={handleCloseCreate}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">
                      Create a group
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        To create a group, please enter a group name.
                        Additionally, use the unique invite code below to invite
                        new members to the group.
                      </DialogContentText>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        label="Unique Group Invite Code"
                        defaultValue="Hello World 12345"
                        value={hash ? hash : undefined}
                        variant="outlined"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Group Name"
                        type="string"
                        fullWidth
                        onChange={(e) => setGroupName(e.target.value)}
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Icon URL"
                        type="string"
                        fullWidth
                        onChange={(e) => setIconUrl(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseCreate} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleCreateGroup} color="primary">
                        Create group
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
      <Divider variant="middle" />
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Already have an invite?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpenJoin}
        >
          Join a Group
        </Button>
        <Dialog
          open={openJoin}
          onClose={handleCloseJoin}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Join a group</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To join a group, please enter the unique invite code below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Invite code"
              type="string"
              onChange={(e) => setJoinCode(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseJoin} color="primary">
              Cancel
            </Button>
            <Button onClick={handleJoinGroup} color="primary">
              Join group
            </Button>
          </DialogActions>
        </Dialog>
      </footer>
    </React.Fragment>
  );
};
