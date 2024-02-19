import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";

import "./RadioDropdownPicker.css";

export type RadioDropdownPickerOption = {
  label: string;
  value: string;
};

export type RadioDropdownPickerProps = {
  options: Array<RadioDropdownPickerOption>;
  onOptionSelected: (value: string) => void;
  messageWhenSelected?: string;
  messageWhenUnselected?: string;
  disabled?: boolean;
  defaultValue?: string;
  "data-testid"?: string;
};

function RadioDropdownPicker({
  options,
  onOptionSelected,
  messageWhenSelected,
  messageWhenUnselected,
  disabled,
  defaultValue,
  ...rest
}: RadioDropdownPickerProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultValue
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const displayMessageWhenSelected = messageWhenSelected || "Selected";
  const displayMessageWhenUnselected = messageWhenUnselected || "Select Option";

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(e.target.value);
    onOptionSelected(e.target.value);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () =>
    setIsDropdownVisible((prevIsDropDownVisible) => !prevIsDropDownVisible);

  const hideComponent = () => setIsDropdownVisible(false);

  useOutsideClick(dropdownRef, hideComponent);

  return (
    <div className="dropdown" data-testid="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-selector"
        // data-testid="dropdown-btn-selector"
        data-testid={rest["data-testid"] || "dropdown-btn-selector"}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        {`${
          selectedOption
            ? displayMessageWhenSelected +
              " " +
              options.find((option) => option.value === selectedOption)?.label
            : displayMessageWhenUnselected
        }`}
      </button>
      {isDropdownVisible && (
        <div
          className="dropdown-options"
          data-testid="dropdown-options"
          role="listbox"
        >
          {options.map((detail) => (
            <label key={detail.value}>
              <input
                type="radio"
                value={detail.value}
                checked={
                  selectedOption
                    ? selectedOption === detail.value
                    : detail.value == defaultValue
                }
                onChange={handleChange}
                role="option"
              />
              {detail.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default RadioDropdownPicker;
