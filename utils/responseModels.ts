/**
 * @file Response models for API
 * @author Peeky development team
 */

// Login response model
export type LoginResponse = Readonly<string>;

// Register response model
export type RegisterResponse = Readonly<{
  userId: string;
}>;

// Change password response model
export type ChangePasswordResponse = Readonly<string>;

// All user response model
type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type AllUsersResponse = Readonly<{
  users: User[];
}>;

// User info response model
export type UserResponse = Readonly<{
  user: User;
}>;

// All roles response model
type Role = {
  id: string;
  name: string;
};

export type AllRolesResponse = Readonly<{
  roles: Role[];
}>;

// Create role response model
export type CreateRoleResponse = Readonly<{
  role: Role;
}>;

// Assign user to role response model
export type AssignUserRoleResponse = Readonly<boolean>;

// ===== Admin Project =====

// Create employee response model
type Employee = {
  id: string;
  registerNumber: number;
  name: string;
  surname: string;
  patronymic: string;
  mobileNumber: string;
  note: string;
  isActive: boolean;
};

export type CreteEmployeeResponse = Readonly<{
  employee: Employee;
}>;

// Get all employee response model
export type AllEmployeeResponse = Readonly<{
  employees: Employee[];
}>;

/**
 * Get employee by Id
 * @param {string} employeeId - Sürücünün Id-si
 */
export type EmployeeByIdResponse = Readonly<{
  employee: Employee;
}>;

// Create route response model
type Destination = {
  id: string;
  address: string;
};

export type CreateRouteResponse = Readonly<{
  route: {
    id: string;
    number: string;
    destinations: Destination[];
    isActive: boolean;
  };
}>;

// Get all routes response model
type Route = {
  id: string;
  number: string;
  destinations: Destination[];
  isActive: boolean;
};

export type AllRouteResponse = Readonly<{
  routes: Route[];
}>;

/**
 * Get route by ID
 * @param {string} routeId - Xəttin ID-si
 */
export type RouteByIdResponse = Readonly<{
  route: Route;
}>;

// Create vehicle response
type Vehicle = {
  id: string;
  model: number;
  modelName: string;
  identificationNumber: number;
  plateNumber: string;
  note: string;
  isActive: boolean;
};

// Get all vehicle response model
export type AllVehicleResponse = {
  vehicles: Vehicle[];
};

/**
 * Get vehicle by Id
 * @param {string} vehicleId - Avtobusun ID-si
 */
export type VehicleByIdResponse = Readonly<{
  vehicle: Vehicle;
}>;

/**
 * Get Employee Assignment by Date
 * @param {Date} date - Tarix (format: YYYY-MM-DD)
 */

type dailySchedule = {
  id: string;
  employeeId: string;
  registerNumber: number;
  fullName: string;
  vehicleId: string;
  plateNumber: string;
  routeId: string;
  routeNumber: string;
  destinationId: string;
  destinationAddress: string;
  startTime: string;
  departureTime: string;
  serviceName: string;
  note: string;
  isActive: boolean;
};

type employeeDayOff = {
  id: string;
  employeeId: string;
  registerNumber: number;
  fullName: string;
  reason: string;
  isActiv: boolean;
};

export type GetEmployeeAssignmentByDateResponse = Readonly<{
  dailyAssignments: {
    identificationNumber: number;
    plateNumber: string;
    registerNumber1: number;
    employeeFullName1: string;
    registerNumber2: number;
    employeeFullName2: string;
    route: string;
    startTime: string;
    endTime: string;
  };
}>;

// Get QR Code list
type QrCodeVehicle = {
  id: string;
  plateNumber: string;
};

export type GetAllQRCodeVehicleResponse = Readonly<{
  qrCodeVehicles: QrCodeVehicle[];
}>;

/**
 * @param {string} id - QR Id-si
 */
export type GetQRCodeByIdResponse = Readonly<{
  qrCode: {
    qrCodeBase64: string;
  };
}>;

type pageData = {
  surveyId: string;
  surveyCreatedDate: Date;
  passangerFullName: string;
  passsangerMobileNumber: string;
};

type pageInformation = {
  number: number;
  size: number;
  totalCount: number;
};

/**
 * Survey Answers response model
 */

export type SurveyAnswersResponse = Readonly<{
  mainAnswers: {
    pageData: pageData[];
    pageInformation: pageInformation;
  };
}>;

/**
 * Survey answers response model
 */

type surveySubQuestionAnswer = {
  type: number;
  question: string;
  answer: string;
};

type surveyQuestionAnswers = {
  orderNumber: number;
  category: number;
  type: number;
  question: string;
  answer: string;
  surveySubQuestionAnswer: surveySubQuestionAnswer | null;
};

type passanger = {
    name: string;
    surname: string;
    birthday: string;
    genderName: string;
    mobileNumber: string;
}

export type SurveyAnswerByIdResponse = Readonly<{
  surveyAnswersById: {
    passanger: passanger,
    surveyQuestionAnswers: surveyQuestionAnswers[];
  };
}>;


/**
 * Get survey count
 */
export type GetSurveyCountResponseModel = Readonly<{
    result: {
      allSurveysCount: number,
      difference: number
    }
}>;


/**
 * Get monthly survey answer
 */
export type GetMonthlySurveyAnswerResponseModel = Readonly<{
  monthlySurveys: {
    surveyCount: number,
    endOfMonth: string
  }[]
}>;

/**
 * Get average count day og week
 */
export type GetAverageCountDayOfWeekResponseModel = Readonly<{
  result: {
    dayOfWeek: string,
    averageCount: number
  }[]
}>;

/**
 * Get survey count by shift
 */
export type GetSurveyCountByShiftResponseModel = Readonly<{
  result: {
    firstShiftCount: number,
    secondShiftCount: number
  }
}>;

/**
 * Get Average count by hour response model
 */
export type GetAverageCountByHourResponseModel = Readonly<{
  result: {
    hour: number,
    averageCount: number
  }[]
}>;

/**
 * Get survey count by age
 */
export type GetSurveyCountByAgeResponseModel = Readonly<{
  result: {
    lessThan18: number,
    from18To24: number,
    from25To34: number,
    from35To44: number,
    from45To54: number,
    from55To64: number,
    moreThan65: number
  }
}>;

/**
 * Warning survey response model
 */

export type WarningSurveyResult = {
  rowNumber: number,
  identificationNumber: number,
  time: string,
  note?: string
}

export type WarningSurveyResponseModel = Readonly<{
  result: WarningSurveyResult[]
}>

/**
 * Get satisfaction response model
 */

export type SatisfactionResponseModel = Readonly<{
  result: {
    satisfiedCount: number;
    dissatisfiedCount: number;
  };
}>;



/**
 * Get rating response model
 */

export type RatingResult = {
  rowNumber: number,
  rating: number,
  maximumRating: number
  ratingElement: string
}

export type RatingResponseModel = Readonly<{
  result: RatingResult[]
}>;


/**
 * Get monthly rating response model
 */

export type MonthlyRatingResult = {
  endOfMonth: string,
  ratingsByQuestion: {
    orderNumber: number,
    rating: number}[]
}

export type MonthlyRatingResponseModel = Readonly<{
  result: MonthlyRatingResult[]
}>; 

/**
 * Get complaint response model
 */

export type ComplaintResultOrderNumber = {
  complaintCount: number,
  questionOrderNumber: number
}

export type ComplaintResultElementName = {
  complaintCount: number,
  elementName: number
}

export type ComplaintResponseModelOrderNumber = Readonly<{
  complaints: ComplaintResultOrderNumber[]
}>;

export type ComplaintResponseModelElementName = Readonly<{
  complaints: ComplaintResultElementName[]
}>;