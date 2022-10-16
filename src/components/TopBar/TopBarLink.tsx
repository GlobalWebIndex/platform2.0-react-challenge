import { Grid, Tooltip, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CatContext } from "../../Context/CatContext";
import { styles } from "./styles";

type Props = {
  text: string | JSX.Element;
  to: string;
  tooltip: string;
  variant: "h4" | "h6";
};

const TopBarLink: React.FC<Props> = ({ to, tooltip, variant, text }) => {
  const context = useContext(CatContext);
  const { loading } = context;

  const classes = styles();

  return (
    <Grid item xs="auto">
      <Link className={classes.link} to={`${loading ? "#" : to}`}>
        <Tooltip title={tooltip}>
          <Typography
            alignItems="center"
            className={classes.title}
            variant={variant}
          >
            {text}
          </Typography>
        </Tooltip>
      </Link>
    </Grid>
  );
};

export default TopBarLink;
