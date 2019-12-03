import initialState from "./InitialState";
import * as actionKeys from "../actions/ActionTypes";

export default function employeeReducer(state = initialState, action) {
  switch (action.type) {
    case actionKeys.SET_EMP_DETAILS:
      return {
        ...state,
        employeeList: action.employeeList,
        employeeFields: action.employeeFields
      };
    case actionKeys.SET_FILELOAD_FLAG:
      return {
        ...state,
        fileLoadFlag: action.fileLoadFlag
      };
    case actionKeys.SHOW_EMP_INFO:
      return {
        ...state,
        showEmployeeFlag: action.showEmployeeFlag,
        employeeId: action.employeeId
      };

    default:
      return state;
  }
}
