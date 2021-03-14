/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Route, MemoryRouter } from "react-router";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import Button from "@material-ui/core/Button";

const breadcrumbNameMap = {
  "/SignIn": "Sign In",
  "/Home": "Home",
  "/PhoneCalls": "Phone Calls",
  "/MissedCalls": "Missed Calls",
  "/ExtensionsReport": "Extensions",
  "/HangedUps": "Hanged Ups",
  "/contact": "Contact",
  "/extensioncalls": "Extension",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [pathName, setPathName] = React.useState([]);
  const location = useLocation();
  useEffect(() => {
    setPathName(location.pathname.split("/").filter((x) => x));
  }, [location]);
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <MemoryRouter initialEntries={[""]} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {() => {
            //console.log(`************${location.pathname}`);
            //const pathnames = location.pathname.split("/").filter((x) => x);
            //console.log(pathnames)
            console.log(pathName);
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter
                  color="inherit"
                  to = {"/"}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                  }}
                >
                  home
                </LinkRouter>
                {pathName.map((value, index) => {
                  const last = index === pathName.length - 1;
                  const to = `/${pathName.slice(0, index + 1).join("/")}`;
                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {value}
                    </Typography>
                  ) : (
                    <LinkRouter
                      color="inherit"
                      to={to}
                      key={to}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = to;
                      }}
                    >
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      </div>
    </MemoryRouter>
  );
}
