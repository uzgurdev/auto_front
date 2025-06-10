import { ChangeEvent, FC, memo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useOutsideClickHandler } from "hooks";

interface DropdownI {
  label: string;
  placeholder: string;
  onHandle(value: string, name: string): void;
  data: any;
  value: string;
  name: string;
  // handleOptionOpen(value: boolean): void;
  disabled?: boolean;
}

const Dropdown: FC<DropdownI> = ({
  label,
  data,
  onHandle,
  placeholder,
  value,
  name,
  // handleOptionOpen,
  disabled = false,
}) => {
  const [{ isLangOpen }, setState] = useState({
    isLangOpen: false,
    value: "",
  });
  const wrapperRef = useRef(null);
  useOutsideClickHandler(wrapperRef, () => {
    setState((prev) => ({ ...prev, isLangOpen: false }));
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueInp = e.target.value;

    setState((prev) => ({
      ...prev,
      // value: valueInp,
      isLangOpen: valueInp.length >= 2,
    }));

    onHandle(valueInp, name);
  };

  const handleClick = (option: string, id?: string) => {
    setState((prev) => ({
      ...prev,
      // value: option,
      isLangOpen: !prev.isLangOpen,
    }));
    onHandle(option, name);
  };

  return (
    <div
      className="wrapper w-[500px] h-[100px] relative font-[400] text-sm"
      aria-disabled={disabled}
    >
      <label htmlFor="">{label}</label>
      <div className="dropdown_selected w-full h-[50px] flex items-center border shadow-lg rounded-full mt-[10px]">
        <input
          type="text"
          className="rounded-s-full outline-none pl-5 h-full w-[93%]"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleChange}
          disabled={disabled}
        />
        <ChevronDown
          className={`text-text-secondary opacity-50 transition-transform cursor-pointer ${
            isLangOpen ? "rotate-180" : ""
          }`}
          onClick={() => {
            if (disabled) return;

            setState((prev) => ({
              ...prev,
              isLangOpen: prev.isLangOpen ? false : true,
            }));
          }}
        />
      </div>

      <div className="h-2 relative z-10"></div>

      {isLangOpen ? (
        <div
          ref={wrapperRef}
          className="data-wrapper border absolute shadow-lg w-full max-h-80 mt-[5px] z-30 rounded-md p-1 space-y-0.5 overflow-y-auto no-scrollbar bg-bg-primary"
        >
          {data.map((item: any) => (
            <div
              className="option w-full px-3 py-2 cursor-pointer rounded-md hover:bg-bg-secondary text-text-secondary"
              onClick={() => handleClick(item.name, item._id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Dropdown, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.data === nextProps.data &&
    prevProps.disabled === nextProps.disabled
  );
});
