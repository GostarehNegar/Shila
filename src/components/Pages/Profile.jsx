import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "called", headerName: "To", width: 200 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "formattedTime", headerName: "Time", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
];

const Profile = (props) => {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>{props.phoneCalls[0].caller}</p>
        <p>{props.phoneCalls[0].fullName}</p>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={props.phoneCalls}
          columns={columns}
          pageSize={10}
          autoHeight="true"
        />
      </div>
    </div>
  );
};

export default Profile;
