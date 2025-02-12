import Backdrop from "@mui/material/Backdrop"; //Ressources du backdrop
import CircularProgress from "@mui/material/CircularProgress"; //Ressources du backdrop
import { makeStyles } from "@mui/styles"; //Fonction importé permettant de styliser le backdrop

const useStyles = makeStyles({ //Style du spinner / backdrop
  backdrop: {
    position: "absolute"
  }
});

export default function Spinner(){ {/* Permet de faire apparaître un spinner et de bloquer la page */}
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}