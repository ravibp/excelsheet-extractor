import { connect } from "react-redux";
import React from "react";
import Employee from "../components/Employee";
import * as EmployeeActions from "../actions/EmployeeActions";

class EmployeeConnector extends React.Component {
  render() {
    return <Employee {...this.props} />;
  }
}
const mapStateToProps = state => {
  return {
    employeeList: state.employeeReducer.employeeList,
    employeeFields: state.employeeReducer.employeeFields,
    fileLoadFlag: state.employeeReducer.fileLoadFlag,
    showEmployeeFlag: state.employeeReducer.showEmployeeFlag,
    employeeId: state.employeeReducer.employeeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEmployeeDetails: (employeeList, employeeFields) =>
      dispatch(
        EmployeeActions.setEmployeeDetails(employeeList, employeeFields)
      ),
    setFileLoadFlag: fileLoadFlag =>
      dispatch(EmployeeActions.setFileLoadFlag(fileLoadFlag)),
      showEmployeeInfo: (showEmployeeFlag, employeeId) =>
      dispatch(EmployeeActions.showEmployeeInfo(showEmployeeFlag, employeeId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeConnector);
