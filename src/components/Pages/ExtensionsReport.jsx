import React from "react";
import RenderExtension from "../statusBasedComponents/RenderExtension"
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    paddingTop: "50px",
    padding: "25px"
  },
  
});


const ExtensionsReport = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {props.extensions.map((item) => {
              return <RenderExtension extension={item} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExtensionsReport;
