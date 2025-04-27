import express, { Application, NextFunction, Request, Response } from "express";
import { sendHeroAbilities, sendHeroesPreviewInfo, sendHeroPopularItemsFull, sendHeroStats } from "./api";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const app: Application = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",     
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


app.get("/getHeroesPreviewInfo", (req: Request, res: Response) => {
  sendHeroesPreviewInfo(res);
});

app.post("/getHeroStats", (req: Request, res: Response) => {
  sendHeroStats(req,res)
});

app.post("/getHeroPopularItems", (req: Request, res: Response) => {
  sendHeroPopularItemsFull(req,res)
});

app.post("/getHeroAbilities", (req: Request, res: Response) => {
  sendHeroAbilities(req,res)
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.type("text/plain");
  res.send("404 - Not Found");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.type("text/plain");
  res.send("Error 500");
});

app.listen(port, () => console.log(`Running on port ${port}`));
