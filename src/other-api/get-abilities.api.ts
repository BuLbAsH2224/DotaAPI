import axios from "axios";
import { IAbilities } from "../types";

export const getAbilities = async (): Promise<IAbilities> => {
  const res = await axios.get(
    `https://raw.githubusercontent.com/odota/dotaconstants/refs/heads/master/build/abilities.json`
  );
  return res.data;
};
