import { question } from "readline-sync";

interface rawValues {
  rawHeight: string;
  rawWeight: string;
}

interface parsedValues {
  parsedHeight: number;
  parsedWeight: number;
}

const getInput = (): rawValues => {
  const rawHeight = question("Enter your height in cm: ");
  const rawWeight = question("Enter your weight in kg: ");

  return { rawHeight, rawWeight };
};

const parseInput = (rawHeight: string, rawWeight: string): parsedValues => {
  if (Number(rawHeight) <= 0 || Number(rawWeight) <= 0) {
    throw new Error("Height and Weight must be a positive value!");
  }
  if (!isNaN(Number(rawHeight)) && !isNaN(Number(rawWeight))) {
    return {
      parsedHeight: Number(rawHeight),
      parsedWeight: Number(rawWeight),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else return "Obese";
};

try {
  const { rawHeight, rawWeight } = getInput();
  const { parsedHeight, parsedWeight } = parseInput(rawHeight, rawWeight);
  console.log(calculateBmi(parsedHeight, parsedWeight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
/*
console.log(calculateBmi(180, 74));
console.log(calculateBmi(178, 98));
console.log(calculateBmi(165, 65));
console.log(calculateBmi(185, 72));
console.log(calculateBmi(155, 82));
*/
