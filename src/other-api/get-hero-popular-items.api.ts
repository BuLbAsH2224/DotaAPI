import axios from "axios";
import { IHeroPopularItemsID } from "../types";

export const getHeroPopularItems = async (
  id: string
): Promise<IHeroPopularItemsID> => {
  const res = await axios.get(
    `https://api.opendota.com/api/heroes/${id}/itemPopularity`
  );
  return res.data;
};
