import React, { Component, Fragment } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import ReactGrid from "./ReactGrid";
import { Redirect } from "react-router-dom";

export default class EmployeeDetails extends Component {
  getKeys = employeeList => {
    if (employeeList.length > 0) {
      return Object.keys(employeeList[0]);
    }
  };

  // convert table based json data to object based json data
  formatData = rows => {
    let employeeList = [];
    let employeeFields = [];
    for (let i = 1; i < rows.length; i++) {
      let empObj = {};
      empObj["id"] = i;
      for (let j = 0; j < rows[i].length; j++) {
        let fieldName = rows[0][j];
        empObj[fieldName] = rows[i][j];
      }
      employeeList.push(empObj);
    }

    this.getKeys(employeeList).forEach(fieldName => {
      let empFieldObj = {
        name: fieldName,
        title: fieldName.toUpperCase()
      };
      employeeFields.push(empFieldObj);
    });

    return { employeeList, employeeFields };
  };

  // perform action on file load
  fileHandler = event => {
    let fileObj = event.target.files[0];

    // pass the file imported as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let { employeeList, employeeFields } = this.formatData(
          resp.rows.slice(0, 50) // No of rows to be shown
        );
        // Update store data
        this.props.setEmployeeDetails(employeeList, employeeFields);
        // Set file load flat to true
        this.props.setFileLoadFlag(true);
        document.getElementById("file-input").style.backgroundColor = "#0fbc0f";
      }
    });
  };

  render() {
    if (this.props.showEmployeeFlag) 
      return <Redirect to={`/${this.props.employeeId}`} />;
    
    return (
      <div className="employee-container row no-gutters">
        <h2 className="col-12">Import an Excel File to proceed</h2>
        <div className="col-12 import-btn">
          <input
            id="file-input"
            type="file"
            onChange={e => {
              this.fileHandler(e);
            }}
          />
        </div>
        {this.props.fileLoadFlag && (
          <p className="col-12">File loaded successfully!</p>
        )}

        <div className="col-12">
          {this.props.employeeList.length > 0 && (
            <Fragment>
              <h2>Employee Details</h2>
              <ReactGrid {...this.props} />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
