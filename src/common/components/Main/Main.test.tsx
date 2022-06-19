import { render, screen } from '@testing-library/react';

import Main from './Main';

describe('Main component', () => {
  it("will render 'I am Main'", () => {
    render(
      <Main>
        <span>I am Main</span>
      </Main>
    );

    const element = screen.getByText('I am Main');

    expect(element).toBeTruthy();
  });
});
