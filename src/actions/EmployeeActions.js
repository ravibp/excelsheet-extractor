import * as actionKeys from "./ActionTypes";

export const setEmployeeDetails = (employeeList, employeeFields) => {
  return {
    type: actionKeys.SET_EMP_DETAILS,
    employeeList, 
    employeeFields
  };
};

export const setFileLoadFlag = (fileLoadFlag) => {
  return {
    type: actionKeys.SET_FILELOAD_FLAG,
    fileLoadFlag
  };
};
export const showEmployeeInfo = (showEmployeeFlag, employeeId) => {
  return {
    type: actionKeys.SHOW_EMP_INFO,
    showEmployeeFlag,
    employeeId
  };
};