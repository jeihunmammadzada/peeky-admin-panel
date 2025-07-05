import { registerModel } from "@/const/definitions";
import APIList from "./adapter";
import {
  AssignUserRoleRequest,
  ChangePasswordRequest,
  CreateBlockedNumberRequest,
  CreateEmployeeRequest,
  CreateQRCodeRequest,
  CreateRoleRequest,
  CreateRouteRequest,
  CreateVehicleRequest,
  EmployeeAssignmentRequest,
  LoginRequest,
  RemoveBlockedNumberRequest,
} from "./requestModels";

/**
 * Login action
 * @param model
 * @returns
 */
export const Login = async (model: LoginRequest) => {
  try {
    const data = await APIList.account.login(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Register action
 * @param model
 * @returns
 */
export const Register = async (model: registerModel) => {
  try {
    const data = await APIList.account.register(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Change password action
 * @param model
 * @returns
 */
export const ChangePassword = async (model: ChangePasswordRequest) => {
  try {
    const data = await APIList.account.change_password(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Logout action
export const Logout = async () => {
  try {
    const data = await APIList.account.logout();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get logged user information
 * @returns
 */
export const User = async () => {
  try {
    const data = await APIList.account.user();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get all user list
export const AllUsers = async () => {
  try {
    const data = await APIList.account.allUsers();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get all roles
export const AllRoles = async () => {
  try {
    const data = await APIList.roles.allRoles();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Create new role
 * @param model
 * @returns
 */
export const createRole = async (model: CreateRoleRequest) => {
  try {
    const data = await APIList.roles.createRole(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Assign role to user
 * @param model
 * @returns
 */
export const assignUserRole = async (model: AssignUserRoleRequest) => {
  try {
    const data = await APIList.roles.assignUserRole(model);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get vehicle list
export const getVehicleList = async () => {
  try {
    const data = await APIList.vehicle.getAll();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get vehicle by ID
 * @param {string} vehicleId
 * @returns
 */
export const GetVehicleByID = async (vehicleId: number) => {
  try {
    const data = await APIList.vehicle.getById(vehicleId);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Add vehicle
 * @param model
 * @returns
 */
export const CreateVehicle = async (model: CreateVehicleRequest) => {
  try {
    const data = await APIList.vehicle.create(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get route list
export const getRouteList = async () => {
  try {
    const data = await APIList.route.getAll();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get route by ID
 * @param {string} routeId
 * @returns
 */
export const GetROuteByID = async (routeId: string) => {
  try {
    const data = await APIList.route.getById(routeId);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Add route
 * @param {Object} model
 * @returns
 */
export const CreateRoute = async (model: CreateRouteRequest) => {
  try {
    const data = await APIList.route.create(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get employee list
export const getEmployeeList = async () => {
  try {
    const data = await APIList.employee.getAll();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get employee by ID
 * @param {string} employeeId
 * @returns
 */
export const GetEmployeeByID = async (employeeId: string) => {
  try {
    const data = await APIList.employee.getById(employeeId);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Add employee
 * @param {CreateEmployeeRequest} model
 * @returns
 */
export const CreateEmployee = async (model: CreateEmployeeRequest) => {
  try {
    const data = await APIList.employee.create(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Employee asssignment
 * @param model
 * @returns
 */
export const CreateAssignment = async (model: EmployeeAssignmentRequest) => {
  try {
    const data = await APIList.employeeAssignments.createAssignment(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Get list of employee assignment
 * @param {string} date
 * @returns
 */
export const AssignmentList = async (date: string) => {
  try {
    const data = await APIList.employeeAssignments.getAssignmentByDate(date);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Create QR code
 * @param model
 * @returns
 */

export const CreateQrCode = async (model: CreateQRCodeRequest) => {
  try {
    const data = await APIList.qr.create(model);
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

// Get QR list
export const GetQRList = async () => {
  try {
    const data = await APIList.qr.getAll();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get QR by Id
 * @param {string} id - QR Id-si
 * @returns
 */

export const GetQRById = async (id: string) => {
  try {
    const data = APIList.qr.getById(id);
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};



/**
 * Create blocked number
 * @param model
 * @returns
 */

export const CreateBlockedNumber = async (model: CreateBlockedNumberRequest) => {
  try {
    const data = await APIList.blockedNumbers.create(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Remove blocked number
 * @param model
 * @returns
 */

export const RemoveBlockedNumber = async (model: RemoveBlockedNumberRequest) => {
  try {
    const data = await APIList.blockedNumbers.remove(model);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Get Blocked number list
export const GetBlockedNumberList = async () => {
  try {
    const data = await APIList.blockedNumbers.getAll();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};



/**
 * @param {number} pageNumber - Səhifənin nömrəsi
 * @param {number} pageSize - Səhifə olan data sayı
 * @returns
 */
export const GetSurveysAnswers = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const data = await APIList.surveyAnswers.getSurveyAnswer(
      pageNumber,
      pageSize
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get survey answers by id
 * @param {string} id - Səhifə olan data sayı
 * @returns
 */
export const GetSurveyAnswerById = async (
  id: string
) => {
  try {
    const data = await APIList.surveyAnswers.getSurveyAnswerById(
      id
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get survey count
 * @returns
 */
export const GetSurveyCount = async () => {
  try {
    const data = await APIList.surveyAnswers.getSurveyCount();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get monthly survey answer
 * @returns
 */
export const GetMonthlySurveyAnswer = async () => {
  try {
    const data = await APIList.surveyAnswers.getMonthlySurveyAnswer();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get warning of employee behaviour
 * @returns
 */
export const GetWarningOfEmployeeBehaviour = async () => {
  try {
    const data = await APIList.surveyAnswers.getWarningOfEmployeeBehaviour();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get warning of employee driving
 * @returns
 */
export const GetWarningOfEmployeeDriving = async () => {
  try {
    const data = await APIList.surveyAnswers.getWarningOfEmployeeDriving();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get warning of employee phone using
 * @returns
 */
export const GetWarningOfEmployeePhoneUsing = async () => {
  try {
    const data = await APIList.surveyAnswers.getWarningOfEmployeePhoneUsing();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get warning of route passenger density
 * @returns
 */
export const GetWarningOfRoutePassengerDensity = async () => {
  try {
    const data = await APIList.surveyAnswers.getWarningOfRoutePassengerDensity();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get survey anonym answers
 * @returns
 */
export const GetSurveyAnonymAnswer = async () => {
  try {
    const data = await APIList.surveyAnswers.getSurveyAnonymAnswer();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get average count day of week
 * @returns
 */
export const GetAverageCountDayOfWeek = async () => {
  try {
    const data = await APIList.surveyAnswers.getAverageCountDayOfWeek();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get average count by hour
 * @returns
 */
export const GetAverageCountByHour = async () => {
  try {
    const data = await APIList.surveyAnswers.getAverageCountByHour();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get survey count by age
 * @returns
 */
export const GetSurveyCountByAge = async () => {
  try {
    const data = await APIList.surveyAnswers.getSurveyCountByAge();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get survey count by shift
 * @returns
 */
export const GetSurveyCountByShift = async () => {
  try {
    const data = await APIList.surveyAnswers.getSurveyCountByShift();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Company Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetCompanySatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getCompanySatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get M10 Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetM10Satisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getM10Satisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Vehicle Clean Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleCleanSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getVehicleCleanSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Vehicle Ventilation Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleVentilationSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getVehicleVentilationSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Line Place And Count Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetLinePlaceAndCountSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getLinePlaceAndCountSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Line Station Condition Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetLineStationConditionSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getLineStationConditionSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Line passanger density Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetLinePassangerDensitySatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getLinePassangerDensitySatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Behaviour Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeBehaviourSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getEmployeeBehaviourSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Employee Driving Condition Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeDrivingConditionSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getEmployeeDrivingConditionSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Employee Phone using Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeePhoneUsingSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getEmployeePhoneUsingSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Discipline Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeDisciplineSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getEmployeeDisciplineSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Wear Satisfaction
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeWearSatisfaction = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.satisfaction.getEmployeeWearSatisfaction(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Vehicle Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getVehicleRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Vehicle Clean Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleCleanRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getVehicleCleanRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Vehicle Ventilation Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleVentilationRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getVehicleVentilationRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Route Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRouteRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getRouteRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Route Station Condition Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRouteStationConditionRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getRouteStationConditionRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Route Passanger Density Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRoutePassangerDensityRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getRoutePassangerDensityRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Route Place And Count Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRoutePlaceAndCountRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getRoutePlaceAndCountRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeeRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Behaviour Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeBehaviourRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeeBehaviourRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Employee Discipline Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeDisciplineRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeeDisciplineRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get Employee Driving Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeDrivingRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeeDrivingRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Employee Phone Using Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeePhoneUsingRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeePhoneUsingRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get Employee Wear Rating
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeWearRating = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.rating.getEmployeeWearRating(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get vehicle monthly rating
 * @retuns
 */

export const GetVehicleMonthlyRating = async () => {
  try {
    const data = await APIList.rating.getVehicleMonthlyRating();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get route monthly rating
 * @retuns
 */

export const GetRouteMonthlyRating = async () => {
  try {
    const data = await APIList.rating.getRouteMonthlyRating();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get employee monthly rating
 * @retuns
 */

export const GetEmployeeMonthlyRating = async () => {
  try {
    const data = await APIList.rating.getEmployeeMonthlyRating();
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};



/**
 * Get question complaint count
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetQuestionComplaintCount = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getQuestionComplaintCount(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};



/**
 * Get employee complaint count
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeComplaintCount = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getEmployeeComplaintCount(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};



/**
 * Get vehicle complaint count
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleComplaintCount = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getVehicleComplaintCount(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};


/**
 * Get route complaint count
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRouteComplaintCount = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getRouteComplaintCount(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get employee complaint count by question
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetEmployeeComplaintCountByQuestion = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getEmployeeComplaintCountByQuestion(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get vehicle complaint count by question
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetVehicleComplaintCountByQuestion = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getVehicleComplaintCountByQuestion(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};

/**
 * Get route complaint count by question
 * @param {string} beginDate
 * @param {string} endDate
 * @retuns
 */

export const GetRouteComplaintCountByQuestion = async (
  beginDate: string,
  endDate: string
) => {
  try {
    const data = await APIList.complaint.getRouteComplaintCountByQuestion(
      beginDate,
      endDate
    );
    return data;
  } catch (error) {
    Promise.reject(error);
  }
};