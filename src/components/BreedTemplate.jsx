import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Display from "./Display";
import BooleanField from "./BooleanField";
import StarRating from "./StarRating";

const useStyles = makeStyles((theme) => ({
  breathe: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3)
  },
  link: {
    marginLeft: theme.spacing(1)
  }
}));
export default function BreedTemplate({ id, name, catprops }) {
  const classes = useStyles();

  return (
    <Card>
      <Typography className={classes.breathe} variant="h4">
        {name}
      </Typography>
      <CardContent>
        <Display title="" text={catprops.description} />

        <Display title="Temperament" text={catprops.temperament} />
        <Display title="Life span" text={catprops.life_span} />
        <Display title="Alternative names" text={catprops.alt_names} />
        <a
          className={classes.link}
          href={catprops.wikipedia_url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {catprops.wikipedia_url}
        </a>
        <Display title="Origin" text={catprops.origin} />
        <Display title="Country Code" text={catprops.country_code} />
        <Display
          title="Weight (imperial system)"
          text={catprops.weight_imperial}
        />
        <BooleanField title="Experimental" value={catprops.experimental} />
        <BooleanField title="Hairless" value={catprops.hairless} />
        <BooleanField title="Natural" value={catprops.natural} />
        <BooleanField title="Rare" value={catprops.rare} />
        <BooleanField title="Rex" value={catprops.rex} />
        <BooleanField title="Suppress Tail" value={catprops.suppress_tail} />
        {/* I'm not putting a big red X next to this property. Shorts & talls unite.
         <BooleanField title="Short Legs" value={catprops.short_legs} />
         */}
        {catprops.short_legs != null ?? (
          <Display
            title="Legs length"
            text={catprops.short_legs ? "Short" : "Lengthy"}
          />
        )}
        <BooleanField title="Hypoallergenic" value={catprops.hypoallergenic} />
        <StarRating title="Adaptability" value={catprops.adaptability} />
        <StarRating title="Child Friendly" value={catprops.child_friendly} />
        <StarRating title="Dog Friendly " value={catprops.dog_friendly} />
        <StarRating title="Energy Level" value={catprops.energy_level} />
        <StarRating title="Grooming" value={catprops.grooming} />
        {/* This feels wrong. Maybe spinoff a cat insurance for
        cats with pre-existing conditions */}
        <StarRating title="Well being" value={catprops.health_issues} />
        <StarRating title="Intelligence" value={catprops.intelligence} />
        <StarRating
          title="Fur cleaning requirements"
          value={catprops.shedding_level}
        />
        <StarRating
          title="Stranger Friendliness"
          value={catprops.stranger_friendly}
        />
        <StarRating
          title="Singer prospectives"
          value={catprops.vocalisation}
        />
      </CardContent>
    </Card>
  );
}
