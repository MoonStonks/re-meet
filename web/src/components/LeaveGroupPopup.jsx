import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function LeaveGroupPopup({ leaveGroup, leaveGroupName }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover2" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Manage Groups
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
        
          <img src = {"https://media1.giphy.com/media/THgdxkFUCAi9vFfba6/giphy-downsized-large.gif"} height = "300px"/>
          

        <Typography>Are you sure you want to leave <b>{leaveGroupName}</b>?<br />
          Group ID: <b>{leaveGroup}</b></Typography>
          
        <Button>
        <Typography>Confirm Leave: </Typography>
          {" "}
          <Tooltip title="Leave Group" arrow placement="top">
            
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => console.log("remove from db")}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Button>
      </Popover>
    </div>
  );
}
