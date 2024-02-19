import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";

import { afterEach, describe, expect, test, vi } from "vitest";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

const TestComponent = ({ onOutsideClick }: { onOutsideClick: () => void }) => {
  const ref = useRef(null);
  useOutsideClick(ref, onOutsideClick);

  return (
    <div ref={ref} data-testid="inside">
      Inside Div
    </div>
  );
};

describe("Tests for useOutsideClick custom hook", () => {
  test("calls the callback when a click is outside the referenced div", () => {
    const handleOutsideClick = vi.fn();
    render(<TestComponent onOutsideClick={handleOutsideClick} />);
    fireEvent.mouseDown(document.body);
    expect(handleOutsideClick).toHaveBeenCalledTimes(1);
  });

  test("does not call the callback when the click is inside the referenced div", () => {
    const handleOutsideClick = vi.fn();
    render(<TestComponent onOutsideClick={handleOutsideClick} />);

    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(handleOutsideClick).not.toHaveBeenCalled();
  });
});
