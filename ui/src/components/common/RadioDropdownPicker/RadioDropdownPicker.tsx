import { useEffect, useState } from "react";

import "./RadioDropdownPicker.css";

export type RadioDropdownPickerOption = {
  label: string;
  value: string;
  default?: boolean;
};

export type RadioDropdownPickerProps = {
  options: Array<RadioDropdownPickerOption>;
  onOptionSelected: (value: string) => void;
  messageWhenSelected?: string;
  messageWhenUnselected?: string;
};

function RadioDropdownPicker({
  options,
  onOptionSelected,
  messageWhenSelected,
  messageWhenUnselected,
}: RadioDropdownPickerProps) {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const displayMessageWhenSelected = messageWhenSelected || "Selected";
  const displayMessageWhenUnselected = messageWhenUnselected || "Select Option";

  const [isMounted, setIsMounted] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(e.target.value);
    onOptionSelected(e.target.value);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevIsDropDownVisible) => !prevIsDropDownVisible);
  };

  useEffect(() => {
    if (!isMounted) {
      const defaultOption = options.find((el) => el.default === true);
      if (defaultOption) {
        onOptionSelected(defaultOption.value);
        setSelectedOption(defaultOption.value);
      }
      setIsMounted(true);
    }
  }, [isMounted, onOptionSelected, options]);

  return (
    <div className="dropdown" data-testid="dropdown">
      <div
        className="dropdown-selector"
        data-testid="dropdown-selector"
        onClick={toggleDropdown}
      >
        {`${
          selectedOption
            ? displayMessageWhenSelected +
              " " +
              options.find((option) => option.value === selectedOption)?.label
            : displayMessageWhenUnselected
        }`}
      </div>
      {isDropdownVisible && (
        <div className="dropdown-options" data-testid="dropdown-options">
          {options.map((detail) => (
            <label key={detail.value}>
              <input
                type="radio"
                value={detail.value}
                checked={selectedOption === detail.value}
                onChange={handleChange}
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
