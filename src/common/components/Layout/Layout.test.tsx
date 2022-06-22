import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Layout from './Layout';

describe('Layout component', () => {
  beforeAll(() => {
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
      }).dispatchEvent(new this.Event('resize'));
    };
  });

  it("will render 'I am Layout'", () => {
    render(
      <Layout>
        <span>I am Layout</span>
      </Layout>,
      { wrapper: MemoryRouter }
    );

    const element = screen.getByText('I am Layout');

    expect(element).toBeTruthy();
  });

  it("will not render 'Home' link and Sidebar", () => {
    render(
      <Layout>
        <span>I am Layout</span>
      </Layout>,
      { wrapper: MemoryRouter }
    );

    act(() => {
      window.resizeTo(100, 1024);
    });

    const element = screen.queryByText('Home');

    expect(element).toBeNull();
  });
});
