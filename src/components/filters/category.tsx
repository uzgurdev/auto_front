import { FC, useState } from "react";
import { Icon } from "components";

interface CategoryProps {
  name: string;
  data?: string[];
  onClick?: (name: string, values: string) => void;
}

const Category: FC<CategoryProps> = ({ onClick, name, data }) => {
  const [rotation, setRotation] = useState(180);
  const [options, setOptions] = useState<string[]>([]);

  const handleIconCLick = () =>
    setRotation((prev) => (rotation === 0 ? 180 : 0));

  return (
    <div>
      <div
        className="dropdown flex items-center justify-between cursor-pointer"
        onClick={handleIconCLick}
      >
        <p className="text-sm font-normal font-Poppins">{name}</p>
        <Icon.Icon
          icon="icon-down"
          size="sm"
          iconSize="15px"
          color="var(--color-text-muted)"
          rotate={rotation}
        />
      </div>

      {rotation !== 0 && (
        <div className="options">
          {data?.map((item, idx) => (
            <div
              className="flex items-center px-1 gap-2 cursor-pointer"
              key={item + idx}
            >
              <input
              type="radio"
              name={name}
              id={item + idx}
              checked={options.includes(item)}
              onChange={(e) => {
                if (e.target.checked) {
                setOptions([item]);
                onClick?.(name, item);
                }
              }}
              className="h-4 w-4"
              />
              <label htmlFor={item + idx}>{item}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
