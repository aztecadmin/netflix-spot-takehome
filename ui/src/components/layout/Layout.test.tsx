import { render, screen } from "@testing-library/react";

import { describe, expect, test } from "vitest";

import Layout from "./";

describe("Tests for Layout", async () => {
  test("Display title message", async () => {
    render(<Layout />);
    const headerEl = screen.getByText("Netflix Boba Finder");
    expect(headerEl).toBeInTheDocument();
  });

  test("Renders children", async () => {
    render(
      <Layout>
        <div>Hello</div>
      </Layout>
    );

    const childText = screen.getByText("Hello");
    expect(childText).toBeInTheDocument();
  });
});
