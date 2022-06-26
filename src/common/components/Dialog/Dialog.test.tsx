import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from './Dialog';

const mock: any = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = mock;

describe('Dialog component', () => {
  const onConfirm = jest.fn();
  const onDismiss = jest.fn();

  it("will render 'A title'", () => {
    render(
      <Dialog
        title="A title"
        description="Are you sure?"
        isOpen={true}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    );

    const element = screen.getByText('A title');

    expect(element).toBeTruthy();
  });

  it("will render 'Are you sure?'", () => {
    render(
      <Dialog
        title="A title"
        description="Are you sure?"
        isOpen={true}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    );

    const element = screen.getByText('Are you sure?');

    expect(element).toBeTruthy();
  });

  it("will trigger 'onConfirm", () => {
    render(
      <Dialog
        title="A title"
        description="Are you sure?"
        isOpen={true}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    );

    fireEvent.click(screen.getByText('Delete'));

    expect(onConfirm).toBeCalled();
  });

  it('will trigger onDismiss', () => {
    render(
      <Dialog
        title="A title"
        description="Are you sure?"
        isOpen={true}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(onDismiss).toBeCalled();
  });
});
