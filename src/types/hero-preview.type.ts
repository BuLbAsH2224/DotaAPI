export interface IHeroPreview {
  id: number;
  localized_name: string;
  primary_attr: string;
  img: string;
  icon: string;
  hero_id: number;
}
export type HeroPreviews = IHeroPreview[];
