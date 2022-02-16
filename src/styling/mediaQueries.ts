import facepaint from "facepaint";

const breakpoints = [639, 1025];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const mqCustom = (breakpointsCustom: any[]) => {
  return facepaint(breakpointsCustom.map(bp => `@media (min-width: ${bp}px)`));
};

const mqMaxWidthCustom = (breakpointsChat: any[]) =>
  facepaint(breakpointsChat.map(bp => `@media (max-width: ${bp}px)`));

export default mq;
export { mqCustom, mqMaxWidthCustom };
