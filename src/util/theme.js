export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export function mediaBreakpointUp(breakpoint) {
  return `@media (min-width: ${breakpoint}px)`
}

export function mediaBreakpointDown(breakpoint) {
  return `@media (max-width: ${breakpoint - 0.2}px)`
}
