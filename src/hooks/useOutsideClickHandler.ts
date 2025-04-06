import { useEffect, RefObject } from "react";

function useOutsideAlerter(ref: RefObject<HTMLElement>, onHandle: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // alert("You clicked outside of me!");
        onHandle();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onHandle, ref]);
}

export default useOutsideAlerter;
