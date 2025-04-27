export interface IAghsDesc {
    hero_name: string,
    hero_id: number,
    has_scepter: number,
    scepter_desc: string,
    scepter_skill_name: string,
    scepter_new_skill: false,
    has_shard: boolean,
    shard_desc: string,
    shard_skill_name: string,
    shard_new_skill: boolean
  }
export type AghsDescs = IAghsDesc[]