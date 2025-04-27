export interface ITalent {
  name: string;
  level: number;
}

export interface IFacet {
  id: number;
  name: string;
  icon: string;
  color: string;
  gradient_id: number;
  title: string;
  description: string;
  abilities?: string[];
  deprecated?: string;
}

export interface IHeroAbilityData {
  abilities: string[];
  talents: ITalent[];
  facets: IFacet[];
}

export type IHeroAbilities = {
  [heroName: string]: IHeroAbilityData;
};
