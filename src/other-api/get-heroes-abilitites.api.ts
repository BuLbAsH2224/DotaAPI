import axios from "axios";
import { IAbilities } from "../types";

export const getAbilities = async (): Promise<IAbilities> => {
    const res = await axios.get(`https://api.opendota.com/api/constants/abilities`);
    return res.data;
};
