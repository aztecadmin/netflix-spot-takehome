// import "@testing-library/jest-dom";
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import RadioDropdownPicker from ".";

afterEach(cleanup);

type MockOnOptionSelected = (s: string) => void;

const DEFAULT_MESSAGE_WHEN_SELECTED = "Selected";
const DEFAULT_MESSAGE_WHEN_UNSELECTED = "Select Option";

function renderRadioDropdownPicker(
  messageWhenUnselected?: string,
  messageWhenSelected?: string
) {
  const mockFn = vi.fn() as MockOnOptionSelected;

  render(
    <RadioDropdownPicker
      messageWhenSelected={messageWhenSelected}
      messageWhenUnselected={messageWhenUnselected}
      options={[
        {
          label: "test label 1",
          value: "1",
        },
        {
          label: "test label 2",
          value: "2",
        },
      ]}
      onOptionSelected={mockFn}
    />
  );
  const radioDropdownPicker = screen.getByTestId("dropdown-selector");
  return { radioDropdownPicker, mockFn };
}

async function selectOptionTestStub(radioDropdownPicker: HTMLElement) {
  userEvent.click(radioDropdownPicker);
  await waitFor(() => {
    expect(screen.getByTestId("dropdown-options")).toBeInTheDocument();
  });
  const optionToSelectElement = screen.getByLabelText("test label 1");
  expect(optionToSelectElement).toBeInTheDocument();
  userEvent.click(optionToSelectElement);

  await waitForElementToBeRemoved(() => screen.getByLabelText("test label 1"));
}

describe("Tests for RadioDropdown component", async () => {
  test("RadioDropdown should have correct default message", async () => {
    const { radioDropdownPicker } = renderRadioDropdownPicker();
    const dropdownOptions = screen.queryByTestId("dropdown-options");

    expect(radioDropdownPicker.textContent).toContain("Select Option");
    expect(dropdownOptions).toBe(null);
  });

  test("RadioDropdown should display override default selected message", async () => {
    const { radioDropdownPicker } = renderRadioDropdownPicker();
    expect(radioDropdownPicker.textContent).toContain(
      DEFAULT_MESSAGE_WHEN_UNSELECTED
    );
  });

  test("RadioDropdown should display override default unselected message", async () => {
    const messageWhenUnselected = "Custom Unselected Message";
    const { radioDropdownPicker } = renderRadioDropdownPicker(
      messageWhenUnselected
    );
    expect(radioDropdownPicker.textContent).toContain(messageWhenUnselected);
  });

  test("RadioDropdown should be collapsed by default", async () => {
    renderRadioDropdownPicker();
    const dropdownOptions = screen.queryByTestId("dropdown-options");
    expect(dropdownOptions).toBe(null);
  });

  test("RadioDropdown should display options when clicked", async () => {
    const { radioDropdownPicker } = renderRadioDropdownPicker();
    userEvent.click(radioDropdownPicker);
    await waitFor(() => {
      expect(screen.getByTestId("dropdown-options")).toBeInTheDocument();
    });
  });

  test("Selecting on option should trigger callback with option value", async () => {
    const { radioDropdownPicker, mockFn } = renderRadioDropdownPicker();
    await selectOptionTestStub(radioDropdownPicker);
    expect(mockFn).toBeCalled();
  });

  test("Selecting an option should show default selected message", async () => {
    const { radioDropdownPicker } = renderRadioDropdownPicker();
    await selectOptionTestStub(radioDropdownPicker);
    expect(radioDropdownPicker.textContent).toContain(
      DEFAULT_MESSAGE_WHEN_SELECTED
    );
  });
});
