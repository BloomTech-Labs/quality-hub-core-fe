import React from "react";
import Features from "./Features";
import * as rtl from "@testing-library/react";

afterEach(rtl.cleanup);

test("is rendering", () => {
  rtl.render(<Features />);
});
