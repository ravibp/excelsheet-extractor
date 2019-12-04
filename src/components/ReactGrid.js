import React, { useState } from "react";
import {
  EditingState,
  PagingState,
  IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel
} from "@devexpress/dx-react-grid-bootstrap4";
import "./ReactGrid.scss";

const getRowId = row => row.id;

export default props => {
  const { employeeList, employeeFields } = props;
  const columns = employeeFields;
  const rows = employeeList;
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);

  const TableRow = ({ row, ...restProps }) => {
    return (
      <Table.Row
        {...restProps}
        // eslint-disable-next-line no-alert
        onClick={e => {
          if (window.confirm(`View details of Employee '${row.first_name}'?`)) {
            props.showEmployeeInfo(true, row.id);
          }
        }}
        style={{
          cursor: "pointer"
        }}
      />
    );
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    props.setEmployeeDetails(changedRows, props.employeeFields);
  };
  return (
    <div className="card grid-container">
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
        />
        <IntegratedPaging />
        <EditingState onCommitChanges={commitChanges} />
        <Table rowComponent={TableRow} {...props} />
        <TableHeaderRow />
        <PagingPanel pageSizes={pageSizes} />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
      </Grid>
    </div>
  );
};
