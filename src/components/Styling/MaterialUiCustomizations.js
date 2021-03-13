import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const StyledTypography = withStyles({
  root: {
    textAlign: "center",
  },
})(Typography);
export const StyledCard = withStyles({
  root: {
    boxShadow: "-2px 2px 5px 2px rgba(0,0,0,0.12) ",
  },
})(Card);

export const StyledButton = withStyles({
  root: {
    color: "silver",
    width: "50%",
  },
})(Button);

export const OdooButton = withStyles({
  root: {
    // textTransform: "capitalize",
    borderRadius: "4px",
    color: "silver",
    width: "50%",
  },
})(Button);


export const SecondStyledButton = withStyles({
  root: {
    textTransform: "capitalize",
    borderRadius: "4px",
  },
})(Button);

export const StyledCardAction = withStyles({
  root: {
    borderTop: "1px solid #666",
  },
})(CardActions);
