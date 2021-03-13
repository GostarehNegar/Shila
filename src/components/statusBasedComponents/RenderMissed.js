import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import {
  StyledTypography,
  StyledCard,
  StyledButton,
  StyledCardAction,
  OdooButton,
} from "../Styling/MaterialUiCustomizations";
import { FiPhoneMissed } from "react-icons/fi";

const useStyles = makeStyles({
  root: {
    borderRight: "3px solid #FF5E61",
  },
});
const RenderMissed = ({ call }) => {
  const { caller, fullName, formattedTime , status } = call;
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={2}>
      <StyledCard className={classes.root}>
        <CardActionArea>
          <CardContent style={{ height: "150px" }}>
            <FiPhoneMissed />
            <StyledTypography gutterBottom variant="h5" component="h2">
              {caller}
            </StyledTypography>
            <StyledTypography
              variant="body2"
              style={{ color: "#fcc1c1" }}
              component="p"
            >
              {fullName}
            </StyledTypography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              {called}
            </Typography> */}
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
          <OdooButton size="small" color="primary">
            Odoo
          </OdooButton>
        </StyledCardAction>
      </StyledCard>
    </Grid>
  );
};
export default RenderMissed;
