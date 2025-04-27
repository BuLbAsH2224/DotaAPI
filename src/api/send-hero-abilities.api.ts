
export const getAbilityVideo = (
    heroName: string,
    abilityName: string
  ): string => {
    const heroNameFilter = heroName.replace(/^npc_dota_hero_/, "");
    const abilityFilter = abilityName.replace(
      /\/apps\/dota2\/images\/dota_react\/abilities\/|\.png/g,
      ""
    )
    const url = `https://cdn.akamai.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroNameFilter}/${abilityFilter}.mp4`;
  
    return url;
  };

import { Request, Response } from "express";
import {
  AghsDescs,
  IAbilities,
  IAbilityForSend,
  IAghsDesc,
  IHeroAbilities,
} from "../types";
import { getAbilities, getAghs, getHeroesAbilities } from "../other-api";
import { send } from "../utils";

export const sendHeroAbilities = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { heroName } = req.body as { heroName?: string };
  if (!heroName) {
    send(res, 400, "text/plain", "no hero name");
    return;
  }
  // получение списка всех способностей в игре
  const abilities: IAbilities = await getAbilities();

  // получение списка всех названий способностей персонажей
  const heroesAbilitiesInfo: IHeroAbilities = await getHeroesAbilities();

  //получение списка всех аганимов и шардов в игре

  const heroesAghsAndShards: AghsDescs = await getAghs();

  // обработка ошибок загрузок

  if (!abilities || !heroesAbilitiesInfo || !heroesAghsAndShards) {
    send(res, 500, "text/plain", "Error other API");
    return;
  }

  // шард и аганим именно нужного персонажа

  const heroAghsAndShard: IAghsDesc = heroesAghsAndShards.filter(
    (item: IAghsDesc) => item.hero_name === heroName
  )[0];

  if (!heroAghsAndShard) {
    send(res, 400, "text/plain", "hero not found");
    return;
  }

  // детальная информация о способностях персонажа + аганим и шард
  const heroesAbilities = {
    abilities: heroesAbilitiesInfo[`${heroName}`].abilities.map(
      (item: string): IAbilityForSend => {
      
        return {
          ...abilities[`${item}`],
          videoSRC: getAbilityVideo(heroName,item)
        }
      }
    ),
    aghsAndShard: heroAghsAndShard,
  };

  heroesAbilities.abilities.map((item : IAbilityForSend)=> {item.img = `https://cdn.akamai.steamstatic.com${item.img}`})

  send(res, 200, "json", heroesAbilities);
};
