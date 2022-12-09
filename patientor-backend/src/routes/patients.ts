/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = toNewPatient(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      req.body
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newPatient = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id = String(req.params.id);
  const patient = patientService.getPatient(id);

  if (patient) {
    return res.send(patient);
  } else {
    return res.status(400).end();
  }
});

export default router;
