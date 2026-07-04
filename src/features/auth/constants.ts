export const HospitalOwnership = {
  PRIVATE: "PRIVATE",
  PUBLIC: "PUBLIC",
} as const;
export type HospitalOwnership = typeof HospitalOwnership[keyof typeof HospitalOwnership];

export const HospitalType = {
  GENERAL: "GENERAL",
  SPECIALIST: "SPECIALIST",
} as const;
export type HospitalType = typeof HospitalType[keyof typeof HospitalType];
