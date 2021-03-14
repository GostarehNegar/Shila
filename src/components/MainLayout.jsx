import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import {
  getSinedIn,
  getUserName,
  getConnectionStatus,
} from "../store/reducers/app";
import { Link } from "react-router-dom";
const drawerWidth = 240;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginBottom: "50px",
    backgroundColor: "SteelBlue"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
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
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    paddingTop: "5%",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  listItemText: {
    color: "lightgrey"
  }
}));
function ButtonAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
          {/* <Link to="/"> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          {/* </Link> */}
          <div style={{ marginRight: "auto" }}>
            <Link to="">
              <Button color="white" onClick={handleDrawerClose}>
                Home
              </Button>
            </Link>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <Link to="/SignIn">
              <Button color="white">
                {" "}
                {props.singnedIn ? "LogOut" : "Login"}{" "}
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            {props.userName}
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to={"/"} onClick={handleDrawerClose}>
            <ListItem>
              <ListItemText className={classes.listItemText}>Home</ListItemText>
            </ListItem>
          </Link>
          <Link to={"/MissedCalls"} onClick={handleDrawerClose}>
            <ListItem>
              <ListItemText className={classes.listItemText}>
                All Missed Calls
              </ListItemText>
            </ListItem>
          </Link>
          <Link to={"/HangedUps"} onClick={handleDrawerClose}>
            <ListItem>
              <ListItemText className={classes.listItemText}>
                All Hanged Up Calls
              </ListItemText>
            </ListItem>
          </Link>
          <Link to={"/ExtensionsReport"} onClick={handleDrawerClose}>
            <ListItem>
              <ListItemText className={classes.listItemText}>
                Extensions
              </ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link to={"/SignIn"} onClick={handleDrawerClose}>
            <ListItem>
              <ListItemText className={classes.listItemText}>
                Sign In
              </ListItemText>
            </ListItem>
          </Link>
        </List>

        <Typography
          noWrap
          style={{
            fontSize: "1.2em",
            color: "whitesmoke",
            padding: "15px",
            marginTop: "auto",
            textAlign: "center",
          }}
        >
          {props.status}
        </Typography>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {props.children}
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    singnedIn: getSinedIn(state),
    userName: getUserName(state),
    status: getConnectionStatus(state),
  };
};

const LayoutContainer = connect(mapStateToProps)(ButtonAppBar);
export default LayoutContainer;
