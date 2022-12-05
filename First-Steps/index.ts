const express = require("express");
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseInput } from "./exerciseCalculator";

app.get("/hello", (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello Full Stack");
});

app.get(
  "/bmi",
  (
    req: { query: { height: any; weight: any } },
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        send: { (arg0: { error: string }): void; new (): any };
      };
      send: (arg0: { height: any; weight: any; bmi: string }) => void;
    }
  ) => {
    const { height, weight } = req.query;
    const validParameters: boolean =
      !isNaN(Number(height)) && !isNaN(Number(weight));

    const bmi = calculateBmi(Number(height), Number(weight));

    if (!validParameters || !weight || !height) {
      res.status(400).send({ error: "malformatted parameters" });
    }

    res.send({ height, weight, bmi });
  }
);

app.post("/exercises", (req: { body: { target: any; dailyExercises: any; }; }, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyExercises } = req.body;

  if (!(dailyExercises && target)) {
    res.status(400).send({ error: "parameters missing" });
  }

  try {
    const { parsedTarget, parsedDailyHours } = parseInput(
      target,
      dailyExercises
    );
    res.send(calculateExercises(parsedDailyHours, parsedTarget));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
