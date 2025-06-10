import { http } from "services";
import { IHome } from "./types";

export const Home = () => http.get<IHome.HomeRes>("home");

export const Recs = () => http.get<IHome.Recs.IResponse>("/rec");
