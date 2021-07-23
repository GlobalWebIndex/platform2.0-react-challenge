import { FC } from "react";
import { Container } from "react-bootstrap";
import Navigation from "../components/Navigation/Navigation";

const DashboardLayout: FC = ({ children }) => {
  return (
    <Navigation>
      <Container>{children}</Container>
    </Navigation>
  );
};

export default DashboardLayout;
