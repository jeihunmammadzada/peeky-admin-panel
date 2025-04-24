
// Model enum
export enum Models {
  BMC = 1,
  Neoplan = 2,
  BYD = 3
}

// Login model type
export type loginModel = {
    username: string,
    password: string
}


// Register model type
export type registerModel = {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
}

// Change password model
export type changePassword = {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

// Add vehicle model
export type addVehicle = {
    model: number,
    identificationNumber: number,
    plateNumber: string,
    note: string
}

// Add route model
export type addRoute = {
  number: string;
  destinations: { address: string }[];
}

// Add employee model
export type addEmployee = {
  registerNumber: number;
  name: string;
  surname: string;
  patronymic: string;
  mobileNumber: string;
  note: string;
}

//create role model
export type roleRequest = {
  roleName: string;
}

//create user
export type userResponse = {
  name: string,
  surname: string,
  username: string,
  email: string,
  password: string,
  phoneNumber: string
}

// assign user to role model
export type assignRoleRequest = {
  userId: string;
  roleId: string;
}

// add Timetable
export type assignment = {
  date: Date,
  assignmentExcelBase64: string,
}

// Enum for model
export const Model: any = [
  {
    value: 1,
    label: "BMC"
  },
  {
    value: 2,
    label: "Neoplan"
  },
  {
    value: 3,
    label: "BYD"
  }
]

// Response status
export enum ResponseStatus {
  success = "success",
  error = "error"
}

// Days of week
export enum DaysOfWeek {
  Monday = "B.E.",
  Tuesday = "Ç.A.",
  Wednesday = "Ç.",
  Thursday = "C.A.",
  Friday = "C.",
  Saturday = "Ş.",
  Sunday = "B."
}

// Short questions
export const QuestionsEnum: Record<number, string> = {
  1: "Avtobus təmizliyi",
  2: "Havalandırma keyfiyyəti",
  3: "Sürücü geyimi",
  4: "Sürücü davranışı",
  5: "İdarəetmə tərzi",
  6: "Vaxtında çatma",
  7: "Telefondan istifadə",
  8: "Dayanacaq sayı",
  9: "Dayanacaq şəraiti",
  10: "Avtobusda sıxlıq"
};

// Months
export const Months: Record<number, string> = {
  1: "Yanvar",
  2: "Fevral",
  3: "Mart",
  4: "Aprel",
  5: "May",
  6: "İyun",
  7: "İyul",
  8: "Avqust",
  9: "Sentyabr",
  10: "Oktyabr",
  11: "Noyabr",
  12: "Dekabr"
};

// Hours
export const Hours: Record<number, string> = {
  6: "06:00 - 08:00",
  8: "08:00 - 10:00",
  10: "10:00 - 12:00",
  17: "17:00 - 19:00",
  19: "19:00 - 21:00",
  21: "21:00 - 23:00",
  23: "23:00 - 00:00",
};