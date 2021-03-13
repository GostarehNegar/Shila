import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { StyledTypography } from "../Styling/MaterialUiCustomizations";

const useStyles = makeStyles({
  root: {
    backgroundColor: "blue",
    margin: "auto 25%",
    //height: "210px",
  },
});

const RenderNoCurrent = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Card className={classes.root}>
        <CardContent>
          <StyledTypography gutterBottom variant="h5" component="h2">
            hi
          </StyledTypography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default RenderNoCurrent;
