import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "caller", headerName: "Number", flex: 1 },
  { field: "direction", headerName: "Direction", flex: 1 },
  { field: "callDuration", headerName: "Duration", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "date", type: "date", headerName: "Date", flex: 1 },
  { field: "formattedTime", headerName: "time", flex: 1 },
];

const singleExtensionReport = (props) => {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>{props.extension.id}</p>
        {/* <p>{props.allcallsbyextension[0].fullName}</p> */}
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={props.extension.phoneCalls}
          columns={columns}
          pageSize={10}
          autoHeight="true"
        />
      </div>
    </div>
  );
};

export default singleExtensionReport;
