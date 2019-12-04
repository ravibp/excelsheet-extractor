import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {}
    };
  }
  componentDidMount() {
    this.props.setFileLoadFlag(false);
    this.setState({
      employee: this.props.employeeList.filter(
        emp => emp.id === this.props.employeeId
      )[0]
    });
  }
  routeToMainPage = () => {
    this.props.showEmployeeInfo(false, null);
  };
  render() {
    if (!this.props.showEmployeeFlag) return <Redirect to={`/`} />;
    const { employee } = this.state;
    return (
      <div>
        <button className="mb-3" onClick={this.routeToMainPage}>
          Go to employee dashboard
        </button>
        <h3>Details of Employee - {employee.first_name}</h3>
        <table className="table">
          <Fragment>
            <thead>
              <tr>
                {Object.entries(employee).map(([key]) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.entries(employee).map(([key, value]) => (
                  <td key={key}>{value.toString()}</td>
                ))}
              </tr>
            </tbody>
          </Fragment>
        </table>
      </div>
    );
  }
}
export default Employee;
