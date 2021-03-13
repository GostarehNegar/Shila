import React from "react";
import RenderhangedUp from "../statusBasedComponents/RenderhangedUp";
import RenderMissed from "../statusBasedComponents/RenderMissed";
import RenderCurrent from "../statusBasedComponents/RenderCurrent";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SecondStyledButton } from "../Styling/MaterialUiCustomizations";

const useStyles = makeStyles({
  root: {
    paddingTop: "15px",
  },
  missedButton: {
    padding: "1px",
    //backgroundColor: "#fe3e41",
  },
  hangedupButton: {
    padding: "1px",
    //backgroundColor: "teal",
  },
  rowBorder: {
    // borderTop: "2px solid teal",
    paddingTop: "15px",
    // marginTop: "15px",
  },
});
const hangUpCustoms = {
  headerGrid: {
    //backgroundColor: "rgba(0, 128, 128, 0.08)",
    borderTop: "1px solid #666",
    padding: "0px 20px",
  },
  dataGrid: {
    //backgroundColor: "rgba(0, 128, 128, 0.08)",
    padding: "5px 20px 40px 20px",
  },
};
const missCallCustoms = {
  headerGrid: {
    //backgroundColor: "#fff1f1",
    borderTop: "1px solid #666",
    padding: "0px 20px",
    marginTop: "0px",
  },
  dataGrid: {
    //backgroundColor: "#fff1f1",
    padding: "5px 20px 40px 20px",
  },
};

// Using "Stateless Functional Components"
const PhoneCall = (props) => {
  const classes = useStyles();
  return (
    <div>
      {/* Current Call Grid */}
      <Grid container className={classes.root}>
        <Grid item xs={12} style={{ paddingBottom: "20px" }}>
          <Grid container>
            <RenderCurrent call={props.currentCall[0]} />
          </Grid>
        </Grid>
        {/* hang Up Grid Header*/}
        <Grid item xs={12} style={hangUpCustoms.headerGrid}>
          <Grid container className={classes.rowBorder}>
            <Grid item xs={6}>
              <span>Hanged Up Calls</span>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <SecondStyledButton
                style={{ color: "Teal" }}
                className={classes.hangedupButton}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/HangedUps";
                }}
              >
                See More →
              </SecondStyledButton>
            </Grid>
          </Grid>
        </Grid>
        {/* hang Up Grid Data*/}
        <Grid item xs={12} style={hangUpCustoms.dataGrid}>
          <Grid container spacing={2}>
            {props.hangedUp.map((item) => (
              <RenderhangedUp call={item} />
            ))}
          </Grid>
        </Grid>
        {/* Miscall Grid Header*/}

        <Grid item xs={12} style={missCallCustoms.headerGrid}>
          <Grid container className={classes.rowBorder}>
            <Grid item xs={6}>
              <span>Missed Calls</span>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <SecondStyledButton
                style={{ color: "#FF5E61" }}
                className={classes.missedButton}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/MissedCalls";
                }}
              >
                See More →
              </SecondStyledButton>
            </Grid>
          </Grid>
        </Grid>
        {/* Miscall Grid Data*/}
        <Grid item xs={12} style={missCallCustoms.dataGrid}>
          <Grid container spacing={2}>
            {props.mainPageMissedCalls.map((item) => (
              <RenderMissed call={item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default PhoneCall;
