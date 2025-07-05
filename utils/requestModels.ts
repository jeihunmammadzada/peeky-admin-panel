/**
 * @file Request models for API
 * @author Peeky development team
 */

import { Models } from "@/const/definitions"


/**
* Login request model
* @param {string} username - İstifadəçi adı
* @param {string} password - İstifadəçinin parolu
 */

export type LoginRequest = {
    username: string,
    password: string
}

/**
 * Register request model
 * @param {string} name - İstifadəçinin adı
 * @param {string} surname - İstifadəçinin soyadı
 * @param {string} username - İstifadəçinin istifadəçi adı
 * @param {string} email - İstifadəçinin email ünvanı
 * @param {string} password - İstifadəçi üçün parol
 * @param {string} phoneNumber - İstifadəçinin əlaqə nömrəsi
 */

export type RegisterRequest = {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string
}

/**
 * Change password request model
 * @param {string} currentPassword - İstifadəçinin mövcud parolu
 * @param {string} newPassword - İstifadəçinin yeni parolu
 * @param {string} confirmNewPassword - yeni parolun təsdiqi
 */
export type ChangePasswordRequest = {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

/**
 * Create role request model
 * @param {string} roleName - Rolun adı
 */
export type CreateRoleRequest = {
    roleName: string
}

/**
 * Assign user to role request model
 * @param {string} userId - İstifadəçinin ID-si
 * @param {string} roleId - Rolun ID-si
 */
export type AssignUserRoleRequest = {
    userId: string,
    roleId: string
}

// ===== Admin project =====

/**
 * Create employee request model
 * @param {number} registerNumber - Qeydiyyat nömrəsi
 * @param {string} name - Sürücünün adı
 * @param {string} surname - Sürücünün soyadı
 * @param {string} patronymic - Sürücünün ata adı
 * @param {string} mobileNumber - Sürücünün telefon nömrəsi
 * @param {string} note - Qeyd
 */

export type CreateEmployeeRequest = {
    registerNumber: number,
    name: string,
    surname: string,
    patronymic: string,
    mobileNumber: string,
    additionalMobileNumber: string,
    note: string
}

/**
 * Create route request model
 * @param {string} number - Xəttin nömrəsi
 * @param {Object} destination - Məntəqələr
 * @param {string} destination.id - Məntəqənin Id-si
 * @param {string} destination.address - Məntəqənin ünvanı
 */

type Destination = {
    address: string
}

export type CreateRouteRequest = {
    number: string,
    destinations: Destination[]
}

/**
 * Create vehicle request model
 * @param {Models} model - Avtobusunun modeli
 * @param {number} identificationNumber - Qeydiyyat nömrəsi
 * @param {string} plateNumber - Avtobusun DQN-ı
 * @param {string} note - Qeyd
 */

export type CreateVehicleRequest = {
    model: Models,
    identificationNumber: number,
    plateNumber: string,
    note: string
}

/**
 * Create Employee Assignment request model
 * @param {Date} assignmentDate - Təhkimolma tarixi
 * @param {assignmentExcelBase64} - exel file
 */

  
  export type EmployeeAssignmentRequest = {
    date: Date,
    assignmentExcelBase64: string,
  }


  /**
   * Create QR Code request model
   * @param {string} vehicleId - Avtobusun ID-si
   */
  export type CreateQRCodeRequest = {
    vehicleId: string
  }


  /**
   * Create blocked number request model
   * @param {string} mobileNumber - Telefon nömrəsi
   */
  export type CreateBlockedNumberRequest = {
    mobileNumber: string
  }

   /**
   * Remove blocked number request model
   * @param {string} blockedMobileNumberId - Telefon nömrəsinin ID-si
   */
   export type RemoveBlockedNumberRequest = {
    blockedMobileNumberId: string
  }
