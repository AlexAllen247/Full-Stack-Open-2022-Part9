const express = require("express");
const app = express();
import { calculateBmi } from "./bmiCalculator";

app.get("/hello", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req: { query: { height: any; weight: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string; }): void; new(): any; }; }; send: (arg0: { height: any; weight: any; bmi: string; }) => void; }) => {
  const { height, weight } = req.query;
  const validParameters: boolean =
    !isNaN(Number(height)) && !isNaN(Number(weight));

  const bmi = calculateBmi(Number(height), Number(weight));

  if (!validParameters || !weight || !height) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
