import { Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

export default function QuestionMark({ title }) {
  return (
    <Tooltip title={title}>
      <HelpOutlineIcon
        style={{ marginBottom: -4, marginLeft: 2, height: 20 }}
      />
    </Tooltip>
  );
}
