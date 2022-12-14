/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import patientData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatient, PublicPatient, Patient, NewEntry } from "../types";

const getPatientsSensitive = (): Patient[] => {
  return patientData;
};

const getPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
    entries: [],
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Patient | undefined => {
  const patient = patientData.find((patient) => patient.id === id);

  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  }

  return undefined;
};

export default {
  getPatientsSensitive,
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};
