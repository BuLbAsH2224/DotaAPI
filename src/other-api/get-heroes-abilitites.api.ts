import axios from "axios";
import { IHeroAbilities } from "../types";

export const getHeroesAbilities = async (): Promise<IHeroAbilities> => {
  const res = await axios.get(
    `https://raw.githubusercontent.com/odota/dotaconstants/refs/heads/master/build/hero_abilities.json`
  );
  return res.data;
};
