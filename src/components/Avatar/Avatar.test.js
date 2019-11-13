import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";

import Avatar, { GET_IMG } from "./Avatar";

const mocks = [
  {
    request: {
      query: GET_IMG
    },
    result: {
      data: {
        me: {
          id: "1",
          image_url: "test"
        }
      }
    }
  }
];

it("should render without error", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Avatar image_url="test" />
    </MockedProvider>
  );
});
