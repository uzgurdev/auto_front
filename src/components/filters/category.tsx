import { FC, useState } from "react";
import { Icon } from "components";

interface CategoryProps {
  data?: any[];
  onClick?: (data: any[]) => {};
}

const Category: FC<CategoryProps> = ({ onClick, data }) => {
  const [rotation, setRotation] = useState(0);
  const [options, setOptions] = useState<any[]>([]);

  const handleIconCLick = () =>
    setRotation((prev) => (rotation === 0 ? 180 : 0));

  return (
    <div>
      <div
        className="dropdown flex items-center justify-between cursor-pointer"
        onClick={handleIconCLick}
      >
        <p className="text-sm font-normal font-Poppins">Category</p>
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
              key={item.name + idx}
            >
              <input
                type="checkbox"
                name={item.name}
                id={item.name}
                checked={options.includes(item)}
                onChange={(e) => {
                  const newOptions = e.target.checked
                    ? [...options, item]
                    : options.filter((opt) => opt !== item);
                  setOptions(newOptions);
                  onClick?.(newOptions);
                }}
                className="h-4 w-4"
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
