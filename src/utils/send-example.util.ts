import { Response } from "express";
export const send = (res: Response,status : number, type : string, send : any) => {
  res.status(status);
  res.type(type);
  res.send(send);
};
