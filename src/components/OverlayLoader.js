import { Dimmer, Loader } from "semantic-ui-react";

const styles = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 100,
  display: "flex",
  placeContent: "center",
};

export default function OverlayLoader({ active, children }) {
  return (
    <Dimmer.Dimmable dimmed={active}>
      <Dimmer active={active} style={styles}>
        <Loader indeterminate>Loading</Loader>
      </Dimmer>
      {children}
    </Dimmer.Dimmable>
  );
}
