import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "../context/UserContext";
import firebase from "../firebase/firebase";
import { useUserData } from "../hooks/useUserData";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function LeaveGroupPopup({ leaveGroup, leaveGroupName }) {
  const { refreshData } = useUserData();
  const [state] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeaveGroup = async () => {
    const db = firebase.firestore();
    const { email } = firebase.auth().currentUser;
    const userRef = db.collection("profiles").doc(email);
    const groupRef = db.collection("groups");
    const groupToLeave = await groupRef
      .where("id", "==", state.selectedGroup.id)
      .get();
    const user = await userRef.get();
    const groupDoc = groupToLeave.docs[0].data();
    const userDoc = user.data();
    if (groupToLeave) {
      await db
        .collection("groups")
        .doc(groupToLeave.docs[0].id)
        .set({
          ...groupDoc,
          members: groupDoc.members.filter((member) => member !== email),
        });
      await db
        .collection("profiles")
        .doc(email)
        .set({
          ...userDoc,
          groups: userDoc.groups.filter(
            (group) => group !== state.selectedGroup.id
          ),
        });
      await refreshData();
      handleClose();
    } else {
      console.log("Group doesn't exist!");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover2" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        style={{ width: 175, marginBottom: 10 }}
        onClick={handleClick}
      >
        Manage Groups
      </Button>
      <Divider />
      <Button
        onClick={refreshData}
        variant="contained"
        color="primary"
        style={{ width: 150 }}
      >
        Refresh Data
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <img
          src={
            "https://media1.giphy.com/media/THgdxkFUCAi9vFfba6/giphy-downsized-large.gif"
          }
          alt="sad"
          height="300px"
        />

        <Typography>
          Are you sure you want to leave <b>{leaveGroupName}</b>?<br />
          Group ID: <b>{leaveGroup}</b>
        </Typography>

        <Button onClick={handleLeaveGroup}>
          <Typography>Confirm Leave: </Typography>{" "}
          <Tooltip title="Leave Group" arrow placement="top">
            <IconButton color="inherit" edge="end">
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Button>
      </Popover>
    </div>
  );
}
