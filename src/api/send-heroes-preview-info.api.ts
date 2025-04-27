import { getHeroesAPI } from "../other-api";
import { HeroPreviews, IHeroPreview, IHeroStats } from "../types";
import { Response } from "express";
import { send } from "../utils";
export const sendHeroesPreviewInfo = async (res: Response): Promise<void> => {
  const heroes: IHeroStats[] = await getHeroesAPI();
  const heroesPreview: HeroPreviews = heroes.map((item: IHeroStats) => {
    const heroObject: IHeroPreview = {
      id: item.id,
      hero_id: item.hero_id,
      localized_name: item.localized_name,
      primary_attr: item.primary_attr,
      icon: `https://cdn.cloudflare.steamstatic.com${item.icon}`,
      img: `https://cdn.cloudflare.steamstatic.com${item.img}`,
    };
    return heroObject;
  });
  send(res, 200, "json", heroesPreview);
};
