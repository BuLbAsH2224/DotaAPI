import express, { Application, NextFunction, Request, Response } from "express";
import {
  sendHeroAbilities,
  sendHeroesPreviewInfo,
  sendHeroPopularItemsFull,
  sendHeroStats,
} from "./api";
import cors from "cors";
import { corsAllowedUrls } from "./config";

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: corsAllowedUrls,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/getHeroesPreviewInfo", (req: Request, res: Response) => {
  sendHeroesPreviewInfo(res);
});

app.get("/getHeroStats/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  sendHeroStats(id, res);
});

app.get("/getHeroPopularItems/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  sendHeroPopularItemsFull(id, res);
});

app.get("/getHeroAbilities/:heroName", (req: Request, res: Response) => {
  const { heroName } = req.params;
  sendHeroAbilities(heroName, res);
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
