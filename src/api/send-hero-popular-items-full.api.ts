import { getHeroPopularItems, getItemsAPI } from "../other-api";
import { IHeroPopularItemsID, IItem, IItems } from "../types";
import { Response } from "express";
import { send } from "../utils";
export const sendHeroPopularItemsFull = async (
  id: string,
  res: Response
): Promise<void> => {
  const heroPopularItems: IHeroPopularItemsID = await getHeroPopularItems(id);
  const items: IItems = await getItemsAPI();

  if (!heroPopularItems) {
    send(res, 400, "text/plain", "hero not found");
    return;
  }
  if (!items) {
    send(res, 500, "text/plain", "Error other API");
    return;
  }

  const allItemsID = Object.values(items);

  const getItemsFromIds = (itemsData: { [key: string]: number }) => {
    return Object.keys(itemsData)
      .map((itemId) => allItemsID.find((item) => item.id === Number(itemId)))
      .filter((item): item is IItem => item !== undefined);
  };

  const heroPopularItemsFilter = {
    start_game_items: getItemsFromIds(heroPopularItems.start_game_items),
    early_game_items: getItemsFromIds(heroPopularItems.early_game_items),
    mid_game_items: getItemsFromIds(heroPopularItems.mid_game_items),
    late_game_items: getItemsFromIds(heroPopularItems.late_game_items),
  };

  send(res, 200, "json", heroPopularItemsFilter);
};
