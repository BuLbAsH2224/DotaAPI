export const getAbilityVideo = (
  heroName: string,
  abilityName: string
): string => {
  const heroNameFilter = heroName.replace("npc_dota_hero_", "");
  const url = `${defaultUrl}/apps/dota2/videos/dota_react/abilities/${heroNameFilter}/${abilityName}.mp4`;

  return url;
};

export const getAbilityImg = (
  heroName: string,
  abilityName: string
): string => {
  const heroNameFilter = heroName.replace("npc_dota_hero_", "");
  const abilityNameFilter = abilityName.toLowerCase().split(" ").join("_");
  const url = `${defaultUrl}/apps/dota2/images/dota_react/abilities/${heroNameFilter}_${abilityNameFilter}.png`;

  return url;
};
import { Request, Response } from "express";
import {
  AghsDescs,
  IAbilities,
  IAbilityForSend,
  IAghsDesc,
  IFacet,
  IHeroAbilities,
  IHeroAbilityData,
} from "../types";
import { getAbilities, getAghs, getHeroesAbilities } from "../other-api";
import { send } from "../utils";
import { defaultUrl } from "../config";

export const sendHeroAbilities = async (
  heroName: string,
  res: Response
): Promise<void> => {
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

  // способности нужного персонажа

  const heroAbilities: IHeroAbilityData = heroesAbilitiesInfo[`${heroName}`];

  if (!heroAghsAndShard) {
    send(res, 400, "text/plain", "hero not found");
    return;
  }
  const passiveImg = `${defaultUrl}/apps/dota2/images/dota_react/icons/innate_icon.png`;
  const heroNameFilter = heroName.replace("npc_dota_hero_", "");
  // детальная информация о способностях персонажа + аганим и шард
  const shardVideo = `${defaultUrl}/apps/dota2/videos/dota_react/abilities/${heroNameFilter}/${heroNameFilter}_aghanims_shard.webm`;
  const scepterVideo = `${defaultUrl}/apps/dota2/videos/dota_react/abilities/${heroNameFilter}/${heroNameFilter}_aghanims_scepter.webm`;
  const heroAbilitiesFiltered = {
    abilities: heroAbilities.abilities.map((item: string): IAbilityForSend => {
      return {
        ...abilities[`${item}`],
        videoSRC:
          heroAghsAndShard.scepter_skill_name === abilities[`${item}`].dname
            ? scepterVideo
            : heroAghsAndShard.shard_skill_name === abilities[`${item}`].dname
            ? shardVideo
            : getAbilityVideo(heroName, item),
      };
    }),
    aghsAndShard: {
      has_scepter: heroAghsAndShard.has_scepter,
      scepter_desc: heroAghsAndShard.scepter_desc,
      scepter_skill_name: heroAghsAndShard.scepter_skill_name,
      scepter_new_skill: heroAghsAndShard.scepter_new_skill,
      scepter_videoSRC: scepterVideo,
      scepter_imgSRC: getAbilityImg(
        heroName,
        heroAghsAndShard.scepter_skill_name
      ),
      has_shard: heroAghsAndShard.has_shard,
      shard_desc: heroAghsAndShard.shard_desc,
      shard_skill_name: heroAghsAndShard.shard_skill_name,
      shard_new_skill: heroAghsAndShard.shard_new_skill,
      shard_videoSRC: shardVideo,
      shard_imgSRC: getAbilityImg(heroName, heroAghsAndShard.shard_skill_name),
    },
    aspects: heroAbilities.facets
      .filter((item: IFacet) => item.deprecated !== "true")
      .map((item: IFacet) => ({
        ...item,
        img: `${defaultUrl}/apps/dota2/images/dota_react/icons/facets/${item.icon}.png`,
      })),
  };
  
  heroAbilitiesFiltered.abilities.map((item: IAbilityForSend) => {
    item.img = `${defaultUrl}${item.img}`;
  });
  const shard: IAbilityForSend | undefined =
    heroAbilitiesFiltered.abilities.find(
      (item: IAbilityForSend) =>
        item.dname === heroAbilitiesFiltered.aghsAndShard.shard_skill_name
    );
  const scepter: IAbilityForSend | undefined =
    heroAbilitiesFiltered.abilities.find(
      (item: IAbilityForSend) =>
        item.dname === heroAbilitiesFiltered.aghsAndShard.scepter_skill_name
    );

  heroAbilitiesFiltered.aghsAndShard.scepter_imgSRC = scepter
    ? scepter.is_innate
      ? passiveImg
      : scepter.img
    : "";

  heroAbilitiesFiltered.aghsAndShard.shard_imgSRC = shard
    ? shard.is_innate
      ? passiveImg
      : shard.img
    : "";
  send(res, 200, "json", heroAbilitiesFiltered);
};
