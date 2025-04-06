import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "./store";

interface ProviderProps {
  children: ReactNode;
}

const StoreProvider: FC<ProviderProps> = ({ children }) => {
  return <Provider {...{ store, children }} />;
};

export default StoreProvider;
