import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
  StyledTypography,
  StyledCardAction,
  StyledButton,
  OdooButton,
} from "../Styling/MaterialUiCustomizations";
import { FiPhoneCall, FiPhoneForwarded, FiPhoneMissed } from "react-icons/fi";
import { MdRingVolume } from "react-icons/md";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ms from "pretty-ms";

const ringing = {
  card: {
    //borderRight: "16px solid #4ba455",
    border: "1px solid #blue",
    boxShadow: "-2px 2px 15px 10px rgba(0,170,255,0.4) ",
    margin: "auto 25%",
    borderRadius: "6px",
  },
};
const hangup = {
  card: {
    //borderRight: "16px solid teal",
    border: "1px solid teal",
    boxShadow: "-2px 2px 5px 4px rgba(0, 128, 128, 0.4) ",
    margin: "auto 25%",
    borderRadius: "6px",
  },
};
const missed = {
  card: {
    // borderRight: "16px solid #4ba455",
    border: "1px solid #red",
    boxShadow: "-2px 2px 15px 10px rgba(255,0,0,0.4) ",
    margin: "auto 25%",
    borderRadius: "6px",
  },
};
const up = {
  card: {
    // borderRight: "16px solid #4ba455",
    border: "1px solid #green",
    boxShadow: "-2px 2px 15px 10px rgba(0,255,0,0.4) ",
    margin: "auto 25%",
    borderRadius: "6px",
  },
};
const ring = {
  card: {
    // borderRight: "16px solid orange",
    border: "1px solid orange",
    boxShadow: "-2px 2px 15px 10px rgba(255,120,0,0.4) ",
    margin: "auto 25%",
    borderRadius: "6px",
  },
};
const statusBasedStyling = (status) => {
  switch (status) {
    case "ringing":
      return ringing;
    case "hangup":
      return hangup;
    case "ring":
      return ring;
    case "missed":
      return missed;
    case "up":
      return up;
    default:
      return hangup;
  }
};
const statusBasedIcons = (status) => {
  switch (status) {
    case "ringing":
      return <MdRingVolume />;
    case "hangup":
      return <CallEndIcon />;
    case "ring":
      return <FiPhoneForwarded />;
    case "missed":
      return <FiPhoneMissed />;
    case "up":
      return <FiPhoneCall />;
    default:
      return <CallEndIcon />;
  }
};

const RenderCurrent = ({ call }) => {
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (call.status === "up") {
      setDuration(setInterval(new Date() - call.upTime, 1000));
    }
    return () => {
      setDuration(0);
    };
  });
  if (call == null) {
    return <p>hi</p>;
  } else {
    return (
      <Grid item xs={12}>
        <Card style={statusBasedStyling(call.status).card}>
          <CardActionArea>
            <CardContent>
              {statusBasedIcons(call.status)}
              <StyledTypography gutterBottom variant="h5" component="h2">
                {call.caller}
              </StyledTypography>
              <StyledTypography>
                {call.status === "up" && ms(duration)}
                {call.status === "hangUp" && call.callDuration}
              </StyledTypography>
              <StyledTypography variant="body2" component="p">
                {call.fullName}
              </StyledTypography>
              <StyledTypography
                variant="body2"
                component="p"
                style={{ color: "lightsteelblue" }}
              >
                {call.status}
              </StyledTypography>
              <StyledTypography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {call.called}
              </StyledTypography>
              <StyledTypography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {call.payload.direction}
              </StyledTypography>
              <StyledTypography
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {call.formattedTime}
              </StyledTypography>
            </CardContent>
          </CardActionArea>
          <StyledCardAction>
            <StyledButton
              size="small"
              color="primary"
              onClick={() => window.location.replace(`/contact/${call.caller}`)}
            >
              profile
            </StyledButton>
            <OdooButton size="small" color="primary">
              Odoo
            </OdooButton>
          </StyledCardAction>
        </Card>
      </Grid>
    );
  }
};

export default RenderCurrent;
