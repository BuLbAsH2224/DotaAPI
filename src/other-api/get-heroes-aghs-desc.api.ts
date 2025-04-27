import axios from "axios";
import { AghsDescs } from "../types";

export const getAghs = async (): Promise<AghsDescs> => {
    const res = await axios.get(`https://raw.githubusercontent.com/odota/dotaconstants/refs/heads/master/build/aghs_desc.json`);
    return res.data;
};
