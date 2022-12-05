import { question } from "readline-sync";

interface rawValues {
  rawTarget: string;
  rawDailyHours: string[];
}

interface parsedValues {
  parsedTarget: number;
  parsedDailyHours: number[];
}

const getInput = (): rawValues => {
  const rawTarget = question("What is your target value? ");

  let dayNumber = 1;
  const rawDailyHours: string[] = [];

  while (true) {
    const input = question(
      `How many hours did you exercise on day ${dayNumber}? (Press 'enter' to quit): `
    );

    if (input) {
      rawDailyHours.push(input);
      dayNumber++;
    } else {
      break;
    }
  }

  return { rawTarget, rawDailyHours };
};

export const parseInput = (
  rawTarget: string,
  rawDailyHours: string[]
): parsedValues => {
  if (Number(rawTarget) <= 0) {
    throw new Error("Target must be a positive value!");
  }
  if (rawDailyHours.length === 0) {
    throw new Error("Provide at least one value for exercised days!");
  }
  if (
    !isNaN(Number(rawTarget)) &&
    !rawDailyHours.map((hour) => Number(hour)).some(isNaN)
  ) {
    return {
      parsedTarget: Number(rawTarget),
      parsedDailyHours: rawDailyHours.map((hour) => Number(hour)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((day) => day > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target ? true : false;

  let rating;
  let ratingDescription;

  if (target > average) {
    rating = 1;
    ratingDescription = "There is room for improvement, you can do it!";
  } else if (target === average) {
    rating = 2;
    ratingDescription = "Good job!";
  } else {
    rating = 3;
    ratingDescription = "Fantastic! Keep it going!";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { rawTarget, rawDailyHours } = getInput();
  const { parsedTarget, parsedDailyHours } = parseInput(
    rawTarget,
    rawDailyHours
  );
  console.log(calculateExercises(parsedDailyHours, parsedTarget));
} catch (error) {
  if (error instanceof Error)
    console.log("Error, something bad happened, message: ", error.message);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
