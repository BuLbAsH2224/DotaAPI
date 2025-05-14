import axios from "axios";
import { IItems } from "../types";

export const getItemsAPI = async (): Promise<IItems> => {
  const res = await axios.get(
    "https://raw.githubusercontent.com/odota/dotaconstants/refs/heads/master/build/items.json"
  );
  return res.data;
};
