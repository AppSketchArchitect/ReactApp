import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  backdrop: {
    position: "absolute"
  }
});

export default function Spinner(){
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}