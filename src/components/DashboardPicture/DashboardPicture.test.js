import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";

import DashboardPicture from "./DashboardPicture";

it("should render without error", () => {
  render(
    <MockedProvider mocks={[]}>
      <DashboardPicture />
    </MockedProvider>
  );
});

it("should display Avatar heading", () => {
  const display = render(
    <MockedProvider mocks={[]}>
      <DashboardPicture />
    </MockedProvider>
  );

  expect(display.getByText("Avatar"));
});
