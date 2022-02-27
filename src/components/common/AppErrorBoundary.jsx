import React from "react";
import Failure from "./Failure";
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      info: "",
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("💥 KABOOM! 💥", { error, errorInfo });
    this.setState({ error: error.message });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <Failure />
          <br />
          <div>
            <a href="/">You can try going back to the homepage.</a>
          </div>
          <br />
          <small>
            If you're a hacker, a web developer or you know what you're doing
            you may be able to investigate more... 😉
          </small>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
