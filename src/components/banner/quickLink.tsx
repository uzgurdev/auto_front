import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { Icon, IconType } from "components/icon";
import { RootState } from "store/store";

interface QuickL {
  text: string;
  // icon: IconType.IconNames;
  params?: string;
}

const QuickLink = ({ text, params }: QuickL) => {
  const navigate = useNavigate();
  const { languages } = useSelector((state: RootState) => state.ui);

  return (
    <div
      className="min-w-36 max-w-max h-12 flex items-center justify-center gap-[10px] rounded-md bg-bg-tertiary text-border-dark font-Poppins font-[400] text-xs cursor-pointer p-2"
      onClick={() => navigate(`/${languages}/products?${params}`)}
    >
      <p className="text-xl">⚙️</p>
      {/* <Icon icon={icon} size="sm" color="var(--color-border-dark)" /> */}
      {text}
    </div>
  );
};

export default QuickLink;
