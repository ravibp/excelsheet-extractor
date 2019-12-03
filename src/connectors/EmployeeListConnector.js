import { connect } from "react-redux";
import * as EmployeeActions from "../actions/EmployeeActions";
import React from "react";
import EmployeeList from "../components/EmployeeList";

class EmployeeListConnector extends React.Component {
  render() {
    return <EmployeeList {...this.props} />;
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListConnector);
