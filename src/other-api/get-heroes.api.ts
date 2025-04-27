import axios from "axios";
import { IHeroStats } from "../types";

export const getHeroesAPI = async (): Promise<IHeroStats[]> => {
  const res = await axios.get(
    "https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json"
  );
  return Object.values(res.data) as IHeroStats[];
};
