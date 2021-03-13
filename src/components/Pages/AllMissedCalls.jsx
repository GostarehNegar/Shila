import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { OdooButton } from "../Styling/MaterialUiCustomizations";

const columns = [
  { field: "fullName", headerName: "Name", flex: 1 },
  { field: "caller", headerName: "caller", flex: 1 },
  { field: "date", type: "date", headerName: "Date", flex: 1 },
  { field: "formattedTime", type: "dateTime", headerName: "Time", flex: 1 },
  {
    field: "",
    headerName: "Action",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        alert(params.row.caller);
      };
      return <OdooButton onClick={onClick}>odoo</OdooButton>;
    },
  },
];
const handleClick = (e) => {
  window.location.replace(`/contact/${e.row.caller}`);
};
const AllMissedCalls = (props) => {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>All Missed Calls</p>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={props.allMissedCalls}
          columns={columns}
          pageSize={10}
          autoHeight="true"
          onRowClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AllMissedCalls;
