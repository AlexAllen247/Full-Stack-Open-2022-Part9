export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientSensitive {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type Patient = Omit<PatientSensitive, "ssn">;

export type NewPatient = Omit<PatientSensitive, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
