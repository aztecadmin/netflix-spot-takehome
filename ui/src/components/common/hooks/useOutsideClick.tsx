import { useEffect } from "react";

// A hook to make it easy to check if an html element
const useOutsideClick = (ref: React.RefObject<HTMLElement>, cb: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
};

export default useOutsideClick;
