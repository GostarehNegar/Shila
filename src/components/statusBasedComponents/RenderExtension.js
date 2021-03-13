import React from "react";
import { Grid } from "@material-ui/core";
import {
  StyledTypography,
  StyledCard,
  StyledButton,
  StyledCardAction,
  OdooButton,
} from "../Styling/MaterialUiCustomizations";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import sado1 from "./static/src/images/101.jpg";
import sado6 from "./static/src/images/106.jpg";
import sado15 from "./static/src/images/115.jpg";
import sado17 from "./static/src/images/117.jpg";
import sado25 from "./static/src/images/125.jpg";
import sado3 from "./static/src/images/103.jpg";
import sado8 from "./static/src/images/108.jpg";
import sado11 from "./static/src/images/111.jpg";
import sado18 from "./static/src/images/118.jpg";
import sado30 from "./static/src/images/130.jpg";
import sado39 from "./static/src/images/139.jpg";

const useStyles = makeStyles({
  root: {
    fontSize: "1.8em",
  },
  large: {
    width: "70px",
    height: "70px"
  },
});

const ringing = {
  card: {
    //borderRight: "16px solid #4ba455",
    //border: "1px solid grey",
    boxShadow: "-2px 2px 5px 5px rgba(0,170,255,0.4) ",
    //margin: "auto 25%",
    borderRadius: "6px",
  },
};
const hangup = {
  card: {
    //borderRight: "16px solid teal",
    //border: "1px solid grey",
    boxShadow: "-2px 2px 5px 2px rgba(0, 128, 128, 0.4) ",
    //margin: "auto 25%",
    borderRadius: "6px",
  },
};
const missed = {
  card: {
    // borderRight: "16px solid #4ba455",
    //border: "1px solid grey",
    boxShadow: "-2px 2px 5px 2px rgba(255,0,0,0.4) ",
    //margin: "auto 25%",
    borderRadius: "6px",
  },
};
const up = {
  card: {
    // borderRight: "16px solid #4ba455",
    //border: "1px solid grey",
    boxShadow: "-2px 2px 5px 5px rgba(0,255,0,0.4) ",
    //margin: "auto 25%",
    borderRadius: "6px",
  },
};
const ring = {
  card: {
    // borderRight: "16px solid orange",
    //border: "1px solid grey",
    boxShadow: "-2px 2px 15px 10px rgba(255,120,0,0.4) ",
    //margin: "auto 25%",
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

const getName = (id) => {
  switch (id) {
    case "103":
      return {
        name: "Babak Mahmoudi",
        image: sado3,
      };
    case "117":
      return {
        name: "Marzieh Farahani",
        image: sado17,
      };
    case "101":
      return {
        name: "Sara Houshmand",
        image: sado1,
      };
    case "115":
      return {
        name: "Mehdi Hosseini",
        image: sado15,
      };
    case "111":
      return {
        name: "Support",
        image: sado11,
      };
    case "130":
      return {
        name: "Paria Mahmoudi",
        image: sado30,
      };
    case "125":
      return {
        name: "Mehdi Peykarara",
        image: sado25,
      };
    case "139":
      return {
        name: "Mohsen Bakhtiari",
        image: sado39,
      };
    case "106":
      return {
        name: "Hossein Ardakani",
        image: sado6,
      };
    case "108":
      return {
        name: "Kaveh Hashemi",
        image: sado8,
      };
    case "118":
      return {
        name: "Asal Mohseni",
        image: sado18,
      };
    default:
      return {
        name: "Unknown",
        image: sado1,
      };
  }
};
const RenderExtension = ({ extension }) => {
  const classes = useStyles();
  const {
    id,
    currentCall,
    todaysMissedCallsCount,
    todaysHangedUpCallsCount,
  } = extension;
  console.log(extension);
  return (
    <Grid item xs={12} sm={2}>
      <StyledCard style={statusBasedStyling(currentCall.status).card}>
        <CardActionArea
          onClick={() => window.location.replace(`/extensioncalls/${id}`)}
        >
          <CardHeader
            avatar={<Avatar alt={getName(id).name} src={getName(id).image} className={classes.large}/>}
            title={getName(id).name}
          />
          <CardContent>
            <StyledTypography className={classes.root}>{id}</StyledTypography>
            <StyledTypography style={{ fontSize: "1.5em", marginBottom: "10px" }}>
              {currentCall.caller}
            </StyledTypography>
            <CardActions
              style={{ borderTop: "1px solid grey", display: "flex", paddingTop: "15px" }}
            >
              <StyledTypography
                color="textSecondary"
                style={{ fontSize: "1em", width: "50%" }}
              >
                Calls: {todaysHangedUpCallsCount}
              </StyledTypography>

              <StyledTypography
                color="textSecondary"
                style={{ fontSize: "1em", width: "50%" }}
              >
                Missed: {todaysMissedCallsCount}
              </StyledTypography>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Grid>
  );
};

export default RenderExtension;
