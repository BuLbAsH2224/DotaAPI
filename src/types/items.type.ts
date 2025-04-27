export interface IAttribItem {
    key: string;
    display?: string;
    value: string;
  }
  export interface IAbilitiesItem{
    type: string;
    title: string;
    description: string;
  }

  
export interface IItem {
    abilities: IAbilitiesItem[];
    hint: string[];
    dispellable?: string,
    target_team?: string,
    target_type? : string[]
    id: number;
    img: string;
    dname: string;
    qual: string;
    cost: number;
    behavior: string | string[];
    notes: string;
    attrib: IAttribItem[];
    mc: boolean;
    hc: boolean;
    cd: number;
    lore: string;
    components: string[] | null;
    created: boolean;
    charges: boolean;
  }
  
export interface IItems {
    [itemName: string]: IItem;
  }
  export interface IHeroPopularItemsID {
    start_game_items: { [key: string]: number };
    early_game_items: { [key: string]: number };
    mid_game_items: { [key: string]: number };
    late_game_items: { [key: string]: number };
  }
  export interface IHeroPopularItems {
    start_game_items: IItem[];
    early_game_items: IItem[];
    mid_game_items: IItem[];
    late_game_items: IItem[];
  }
  