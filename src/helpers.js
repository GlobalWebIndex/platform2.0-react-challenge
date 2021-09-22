import facepaint from "facepaint";

const breakpoints = [639, 1025];

const mq = facepaint(
  breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`)
);

export default mq;
