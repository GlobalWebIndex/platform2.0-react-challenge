import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Modal from "../Modal";

describe("<Modal/>", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders", () => {
    render(
      <Modal>
        <div>Modal</div>
      </Modal>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText("Modal")).toBeInTheDocument();
  });

  it("closes modal by clicking on X", () => {
    const navigate = jest.fn();
    const useNavigate = () => navigate;

    render(
      <Modal _useNavigate={useNavigate}>
        <div>Modal</div>
      </Modal>
    );

    userEvent.click(screen.getByTestId("modal-close-button"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it("closes modal by clicking on overlay", () => {
    const navigate = jest.fn();
    const useNavigate = () => navigate;

    render(
      <Modal _useNavigate={useNavigate}>
        <div>Modal</div>
      </Modal>
    );

    userEvent.click(screen.getByTestId("modal-overlay"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
