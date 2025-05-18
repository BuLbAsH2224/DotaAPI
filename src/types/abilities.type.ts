export interface IAbilityAttrib {
    key: string;
    header: string;
    value: string | string[];
    generated?: boolean
}

export interface IAbility {
    dname: string;
    behavior: string[] | string;
    dmg_type?: string ;
    bkbpierce?: string;
    desc?: string;
    attrib: IAbilityAttrib[];
    mc?: string | string[];
    cd?: string | string[];
    dispellable?: string;
    img: string;
    lore?: string;
    notes?: string[];
    cmb?: string | string[];
    hurl?: string | string[];
    cast_range_pve?: string | string[];
    vision?: string | string[];
    duration?: string;
    charge?: string;
    is_innate?: boolean;
    target_team: string[],
    target_type: string[]
}

export interface IAbilityForSend {
    dname: string;
    behavior: string[] | string;
    dmg_type?: string ;
    bkbpierce?: string;
    desc?: string;
    attrib: IAbilityAttrib[];
    mc?: string | string[];
    cd?: string | string[];
    dispellable?: string;
    img: string;
    lore?: string;
    notes?: string[];
    cmb?: string | string[];
    hurl?: string | string[];
    cast_range_pve?: string | string[];
    vision?: string | string[];
    duration?: string;
    charge?: string;
    is_innate?: boolean;
    target_team: string[],
    target_type: string[]
    videoSRC: string,
}
export interface ISkillTree{
    name: string,
    level: number
}
export type IAbilities = Record<string, IAbility>;