/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import patientData from "../../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatient, PublicPatient, Patient } from "../types";

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
  return patientData.find(patient => patient.id === id);
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

export default { getPatientsSensitive, getPatients, getPatient, addPatient };
