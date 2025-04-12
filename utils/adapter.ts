import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Router from "next/router";
import {
  AssignUserRoleRequest,
  ChangePasswordRequest,
  CreateEmployeeRequest,
  CreateQRCodeRequest,
  CreateRoleRequest,
  CreateRouteRequest,
  CreateVehicleRequest,
  EmployeeAssignmentRequest,
  LoginRequest,
  RegisterRequest,
} from "./requestModels";
import {
  AllEmployeeResponse,
  AllRolesResponse,
  AllRouteResponse,
  AllUsersResponse,
  AllVehicleResponse,
  ChangePasswordResponse,
  CreateRoleResponse,
  CreateRouteResponse,
  EmployeeByIdResponse,
  GetAllQRCodeVehicleResponse,
  SatisfactionResponseModel,
  GetEmployeeAssignmentByDateResponse,
  GetQRCodeByIdResponse,
  LoginResponse,
  RegisterResponse,
  RouteByIdResponse,
  SurveyAnswersResponse,
  UserResponse,
  VehicleByIdResponse,
  SurveyAnswerByIdResponse,
  RatingResponseModel,
  GetSurveyCountByAgeResponseModel,
  GetMonthlySurveyAnswerResponseModel,
  GetAverageCountDayOfWeekResponseModel,
  GetSurveyCountByShiftResponseModel,
  ComplaintResponseModelElementName,
  ComplaintResponseModelOrderNumber,
  WarningSurveyResponseModel,
  MonthlyRatingResponseModel,
  GetAverageCountByHourResponseModel,
  GetSurveyCountResponseModel,
} from "./responseModels";
// create instance
const instance = axios.create({
  withCredentials: true,
  // httpAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});

// instance configuration
instance.defaults.baseURL = "https://api.peeky.az";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Accept"] = "application/json";

// service URLs
const IDENTITY_SERVICE_ACCOUNT: string = "/identity/api/account";
const IDENTITY_SERVICE_ROLE: string = "/identity/api/rolemanagement";
const ADMIN_SERVICE_EMPLOYEE: string = "/admin/api/employee";
const ADMIN_SERVICE_ROUTE: string = "/admin/api/route";
const ADMIN_SERVICE_QR: string = "/admin/api/qrcode";
const ADMIN_SERVICE_VEHICLE: string = "/admin/api/vehicle";
const ADMIN_SERVICE_EMPLOYEE_ASSIGNMENT: string = "/admin/api/dailyassignment";
const DAHSBOARD_SERVICE_SURVEY: string = "/dashboard/api/surveyanswer";
const DAHSBOARD_SERVICE_SATISFACTION: string = "/dashboard/api/satisfaction";
const DAHSBOARD_SERVICE_RATING: string = "/dashboard/api/rating";
const DAHSBOARD_SERVICE_COMPLAINT: string = "/dashboard/api/complaint";

/**
 * Api response interface
 * @param {"success" | "error"} status - API-dən gələn cavabın uğurlu vəya uğursuz olması
 * @param {string} message - statusa uyğun mesaj
 * @param {T} data - API-dən gələn data
 * @param {string[] | null} - API-dən gələn error mesajlar
 */
interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
  errors: string[] | null;
}

// request configuration
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //Cookies.get("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response configuration
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Cookie gələrsə:", document.cookie);
    return Promise.resolve(response);
  },
  (error: AxiosError) => {
    error.status == 401 && Router.push("/");
    if (error.message) {
      const errorData = error.response?.data as object;
      return Promise.reject(errorData);
    }
  }
);

const requests = {
  get: async <T>(url: string, data?: object): Promise<ApiResponse<T>> => {
    const res: AxiosResponse<ApiResponse<T>> = await instance.get(url, data);
    return res?.data;
  },

  post: async <T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const res: AxiosResponse<ApiResponse<T>> = await instance.post(
      url,
      data,
      config
    );
    return res?.data;
  },
};

// Account APIes
const account = {
  login: (data: LoginRequest) =>
    requests.post<LoginResponse>(IDENTITY_SERVICE_ACCOUNT + "/login", data),
  register: (data: RegisterRequest) =>
    requests.post<RegisterResponse>(
      IDENTITY_SERVICE_ACCOUNT + "/register",
      data
    ),
  change_password: (data: ChangePasswordRequest) =>
    requests.post<ChangePasswordResponse>(
      IDENTITY_SERVICE_ACCOUNT + "/change-password",
      data
    ),
  logout: () => requests.post(IDENTITY_SERVICE_ACCOUNT + "/logout"),
  user: () => requests.get<UserResponse>(IDENTITY_SERVICE_ACCOUNT + "/user"),
  allUsers: () =>
    requests.get<AllUsersResponse>(IDENTITY_SERVICE_ACCOUNT + "/all-users"),
  refreshToken: () =>
    requests.post(IDENTITY_SERVICE_ACCOUNT + "/refresh-token"),
};

// Role Management
const roles = {
  allRoles: () =>
    requests.get<AllRolesResponse>(IDENTITY_SERVICE_ROLE + "/all-roles"),
  createRole: (data: CreateRoleRequest) =>
    requests.post<CreateRoleResponse>(
      IDENTITY_SERVICE_ROLE + "/create-role",
      data
    ),
  assignUserRole: (data: AssignUserRoleRequest) =>
    requests.post<AssignUserRoleRequest>(
      IDENTITY_SERVICE_ROLE + "/assign-user-role",
      data
    ),
};

// Routes
const route = {
  create: (data: CreateRouteRequest) =>
    requests.post<CreateRouteResponse>(
      ADMIN_SERVICE_ROUTE + "/create-route",
      data
    ),
  getAll: () =>
    requests.get<AllRouteResponse>(ADMIN_SERVICE_ROUTE + "/get-all-routes"),
  getById: (routeId: string) =>
    requests.get<RouteByIdResponse>(
      ADMIN_SERVICE_ROUTE + "/get-route-by-id?routeId=" + routeId
    ),
};

// QR
const qr = {
  create: (data: CreateQRCodeRequest) =>
    requests.post(ADMIN_SERVICE_QR + "/create-qrcode", data),
  getAll: () =>
    requests.get<GetAllQRCodeVehicleResponse>(
      ADMIN_SERVICE_QR + "/get-all-qrcode-vehicles"
    ),
  getById: (id: string) =>
    requests.get<GetQRCodeByIdResponse>(
      ADMIN_SERVICE_QR + "/get-qrcode-by-id?id=" + id
    ),
};

// Employee
const employee = {
  create: (data: CreateEmployeeRequest) =>
    requests.post(ADMIN_SERVICE_EMPLOYEE + "/create-employee", data),
  getAll: () =>
    requests.get<AllEmployeeResponse>(
      ADMIN_SERVICE_EMPLOYEE + "/get-all-employees"
    ),
  getById: (employeeId: string) =>
    requests.get<EmployeeByIdResponse>(
      ADMIN_SERVICE_EMPLOYEE + "/get-employee-by-id?employeeId=" + employeeId
    ),
};

// Vehicle
const vehicle = {
  create: (data: CreateVehicleRequest) =>
    requests.post(ADMIN_SERVICE_VEHICLE + "/create-vehicle", data),
  getAll: () =>
    requests.get<AllVehicleResponse>(
      ADMIN_SERVICE_VEHICLE + "/get-all-vehicles"
    ),
  getById: (vehicleId: number) =>
    requests.get<VehicleByIdResponse>(
      ADMIN_SERVICE_VEHICLE + "/get-vehicle-by-id?vehicleId=" + vehicleId
    ),
};

// Employee Assignments
const employeeAssignments = {
  createAssignment: (data: EmployeeAssignmentRequest) =>
    requests.post(
      ADMIN_SERVICE_EMPLOYEE_ASSIGNMENT + "/create-assignment",
      data
    ),
  getAssignmentByDate: (data: string) =>
    requests.get<GetEmployeeAssignmentByDateResponse>(
      ADMIN_SERVICE_EMPLOYEE_ASSIGNMENT + "/get-assignment?date=" + data
    ),
};

// Surveys
const surveyAnswers = {
  getSurveyAnswer: (pageNumber: number, pageSize: number) =>
    requests.get<SurveyAnswersResponse>(
      DAHSBOARD_SERVICE_SURVEY +
        `/get-survey-answers?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),

  getSurveyAnswerById: (id: string) =>
    requests.get<SurveyAnswerByIdResponse>(
      DAHSBOARD_SERVICE_SURVEY +
        `/get-survey-answers-by-main-id?surveyAnswerMainId=${id}`
    ),

  getSurveyCount: () =>
    requests.get<GetSurveyCountResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-survey-count`
    ),

  getMonthlySurveyAnswer: () =>
    requests.get<GetMonthlySurveyAnswerResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-monthly-survey-answer`
    ),

  getAverageCountDayOfWeek: () =>
    requests.get<GetAverageCountDayOfWeekResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-average-count-day-of-week`
    ),

  getSurveyCountByAge: () =>
    requests.get<GetSurveyCountByAgeResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-survey-count-by-age`
    ),

  getAverageCountByHour: () =>
    requests.get<GetAverageCountByHourResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-average-count-by-hour`
    ),

  getSurveyCountByShift: () =>
    requests.get<GetSurveyCountByShiftResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-survey-count-by-shift`
    ),

  getWarningOfEmployeeBehaviour: () =>
    requests.get<WarningSurveyResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-warning-of-employee-behaviour`
    ),

  getWarningOfEmployeeDriving: () =>
    requests.get<WarningSurveyResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-warning-of-employee-driving`
    ),
  getWarningOfEmployeeHabit: () =>
    requests.get<WarningSurveyResponseModel>(
      DAHSBOARD_SERVICE_SURVEY + `/get-warning-of-employee-habit`
    ),
};

// Satisfaction
const satisfaction = {
  getCompanySatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-company-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getM10Satisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-m10-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleCleanSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-vehicle-clean-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleVentilationSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-vehicle-ventilation-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getLineStationConditionSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-line-station-condition-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getLinePlaceAndCountSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-line-place-and-count-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeBehaviourSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-employee-behaviour-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeDisciplineSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-employee-discipline-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeDrivingConditionSatisfaction: (
    beginDate: string,
    endDate: string
  ) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-employee-driving-condition-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeHabitSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-employee-habit-satisfaction?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeWearSatisfaction: (beginDate: string, endDate: string) =>
    requests.get<SatisfactionResponseModel>(
      DAHSBOARD_SERVICE_SATISFACTION +
        `/get-employee-wear-satisfaction?begin=${beginDate}&end=${endDate}`
    ),
};

// Rating
const rating = {
  getVehicleRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-vehicle-rating?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleCleanRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-vehicle-clean-rating?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleVentilationRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-vehicle-ventilation-rating?begin=${beginDate}&end=${endDate}`
    ),

  getRouteRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-route-rating?begin=${beginDate}&end=${endDate}`
    ),

  getRouteStationConditionRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-route-station-condition-rating?begin=${beginDate}&end=${endDate}`
    ),

  getRoutePlaceAndCountRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-route-place-and-count-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeBehaviourRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-behaviour-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeDisciplineRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-discipline-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeDrivingRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-driving-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeHabitRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-habit-rating?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeWearRating: (beginDate: string, endDate: string) =>
    requests.get<RatingResponseModel>(
      DAHSBOARD_SERVICE_RATING +
        `/get-employee-wear-rating?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleMonthlyRating: () =>
    requests.get<MonthlyRatingResponseModel>(
      DAHSBOARD_SERVICE_RATING + `/get-vehicle-monthly-rating`
    ),
  getEmployeeMonthlyRating: () =>
    requests.get<MonthlyRatingResponseModel>(
      DAHSBOARD_SERVICE_RATING + `/get-employee-monthly-rating`
    ),

  getRouteMonthlyRating: () =>
    requests.get<MonthlyRatingResponseModel>(
      DAHSBOARD_SERVICE_RATING + `/get-route-monthly-rating`
    ),
};

// Complaint
const complaint = {
  getQuestionComplaintCount: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelOrderNumber>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-question-complaint-count?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeComplaintCount: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelElementName>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-employee-complaint-count?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleComplaintCount: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelElementName>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-vehicle-complaint-count?begin=${beginDate}&end=${endDate}`
    ),

  getRouteComplaintCount: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelElementName>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-route-complaint-count?begin=${beginDate}&end=${endDate}`
    ),

  getEmployeeComplaintCountByQuestion: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelOrderNumber>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-employee-complaint-count-by-question?begin=${beginDate}&end=${endDate}`
    ),

  getVehicleComplaintCountByQuestion: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelOrderNumber>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-vehicle-complaint-count-by-question?begin=${beginDate}&end=${endDate}`
    ),

  getRouteComplaintCountByQuestion: (beginDate: string, endDate: string) =>
    requests.get<ComplaintResponseModelOrderNumber>(
      DAHSBOARD_SERVICE_COMPLAINT +
        `/get-route-complaint-count-by-question?begin=${beginDate}&end=${endDate}`
    ),
};

const APIList = {
  account,
  qr,
  employee,
  route,
  vehicle,
  roles,
  employeeAssignments,
  surveyAnswers,
  satisfaction,
  rating,
  complaint,
};

export default APIList;
