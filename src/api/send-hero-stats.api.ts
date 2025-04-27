import { getHeroesAPI } from "../other-api";
import { HeroPreviews, IHeroPreview, IHeroStats } from "../types";
import { Request,Response } from "express";
import { send } from "../utils";
export const sendHeroStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body as { id?: string };
  if (!id) {
    send(res, 400, "text/plain", "no id");
    return;
  }
  const heroes: IHeroStats[] = await getHeroesAPI();
  const hero: IHeroStats = heroes.filter(
    (item: IHeroStats) => item.id === parseInt(id)
  )[0];
  if (!hero) {
    send(res, 400, "text/plain", "hero not found");
    return;
  }
  send(res, 200, "json", hero);
};
