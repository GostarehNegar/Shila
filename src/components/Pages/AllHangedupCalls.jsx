import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import {OdooButton} from "../Styling/MaterialUiCustomizations";

const columns = [
  { field: "fullName", headerName: "Name", flex: 1 },
  { field: "caller", headerName: "Number", flex: 1 },
  { field: "date", type: "date", headerName: "Date", flex: 1 },
  { field: "formattedTime", type: "dateTime", headerName: "Time", flex: 1 },
  {field: "callDuration", type: "dateTime", headerName: "Duration", flex: 1},
  {
    field: "odoo",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const onClick = () => {
        alert(params.row.caller);
      };

      return <OdooButton onClick={onClick}>Odoo</OdooButton>;
    },
  },
];
const handleClick = (e) => {
  window.location.replace(`/contact/${e.row.caller}`);
};
const AllHangedupCalls = (props) => {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>All Hanged Up Calls</p>
      </div>
      <div style={{ width: "100%"}} className={"MuiDataGrid-row.Mui-odd"}>
        <DataGrid
          rows={props.allHangedUps}
          columns={columns}
          pageSize={10}
          autoHeight="true"
          onRowClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AllHangedupCalls;
