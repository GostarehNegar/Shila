import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
  StyledTypography,
  StyledCard,
  StyledButton,
  StyledCardAction,
  OdooButton,
} from "../Styling/MaterialUiCustomizations";
import { FiPhoneIncoming, FiPhoneOutgoing } from "react-icons/fi";
import ms from "pretty-ms";

const useStyles = makeStyles({
  root: {
    borderRight: "3px solid teal",
  },
});
const RenderhangedUp = ({ call }) => {
  const { caller, fullName, formattedTime, payload, callDuration} = call;
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={2}>
      <StyledCard className={classes.root}>
        <CardActionArea>
          <CardContent>
            {payload.direction === "in" ? (
              <FiPhoneIncoming />
            ) : (
              <FiPhoneOutgoing />
            )}
            <StyledTypography gutterBottom variant="h5" component="h2">
              {caller}
            </StyledTypography>
            <StyledTypography variant="body2" style={{color : "#9cd0d0"}} component="p">
              {fullName}
            </StyledTypography>
            <StyledTypography>
              {callDuration}
            </StyledTypography>
            <StyledTypography
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {formattedTime}
            </StyledTypography>
          </CardContent>
        </CardActionArea>
        <StyledCardAction>
          <StyledButton
            size="small"
            color="primary"
            onClick={() => window.location.replace(`/contact/${caller}`)}
          >
            profile
          </StyledButton>
          <OdooButton size="small" color="secondary">
            Odoo
          </OdooButton>
        </StyledCardAction>
      </StyledCard>
    </Grid>
  );
};
export default RenderhangedUp;
