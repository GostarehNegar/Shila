import React from "react";
import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { RangeDatePicker } from "jalali-react-datepicker";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { SideBySideChart, Bar } from "../Reports/Charts";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import jalaali from "jalaali-js";
import { useEffect } from "react";
const datePickerTheme = {
  backColor: "#444",
  // head
  headBackColor: "#333",
  headTitleColor: "#aeaeae",
  headArrowColor: "#aeaeae",
  headRangeBackColor: "#333",
  headRangeColor: "steelblue",

  // weekdays color
  weekDaysColor: "#aeaeae",

  // days
  daysColor: "#000",
  daysBackColor: "#444",
  holidaysColor: "#f76060",
  holidaysBackColor: "#444",
  daysRound: "0%",

  // start end
  startRangeBackColor: "steelblue",
  startRangeColor: "#000",
  endRangeBackColor: "steelblue",
  endRangeColor: "#000",
  continueRangeBackColor: "grey",
  continueRangeColor: "#000",
  sameRangeBackColor: "steelblue",
  sameRangeColor: "#000",

  // buttons
  submitBackColor: "#333",
  submitHoverBackColor: "#f3f3f3",
  submitColor: "#aeaeae",
  submitHoverColor: "#000",
  cancelBackColor: "#333",
  cancelHoverBackColor: "#D6D6D6",
  cancelColor: "#aeaeae",
  cancelHoverColor: "#000",
};
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const columns = [
  { field: "caller", headerName: "Number", flex: 1 },
  { field: "direction", headerName: "Direction", flex: 1 },
  { field: "callDuration", headerName: "Duration", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "date", type: "date", headerName: "Date", flex: 1 },
  { field: "formattedTime", headerName: "time", flex: 1 },
];
const SingleExtensionReport = (props) => {
  // useEffect(() => {
  //   const data = props.extension.filterPhoneCalls({
  //     start: fromDate,
  //     end: toDate,
  //     status: statusFilter,
  //   });
  //   retu
  // }, [])
  const [fromDate, setFromDate] = useState();
  // const [data, setData] = useState([]);
  const [toDate, setToDate] = useState();
  const [range, setRange] = useState({ from: null, to: null });
  const classes = useStyles();
  const [statusFilter, setStatusFilter] = useState();
  const data = props.extension.filterPhoneCalls({
    start: fromDate,
    end: toDate,
    status: statusFilter,
  });

  useEffect(() => {
    const { from, to } = range;
    if (to && from) {
      var a = jalaali.toGregorian(from.year, from.month, from.day);
      var b = new Date(a.gy, a.gm - 1, a.gd).toString();
      console.log(to);

      var c = jalaali.toGregorian(range.to.year, range.to.month, range.to.day);
      var d = new Date(c.gy, c.gm - 1, c.gd).toString();
    }
    setFromDate(b);
    setToDate(d);
  }, [range]);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <p>{props.extension.id}</p>
        {statusFilter === "all" || typeof statusFilter === "undefined" ? (
          <Bar data={data} />
        ) : (
          <SideBySideChart data={data} status={statusFilter} />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "15px",
        }}
      >
        <div style={{ textAlign: "right", width: "50%" }}>
          {/* <RangeDatePicker theme={datePickerTheme}
            // isRenderingButtons="false"
            onClickSubmitButton={submitExample}
            fromLabel = "From"
            toLabel = "To"
          /> */}
          <DatePicker locale="fa" onChange={setRange} value={range} />
        </div>
        <div style={{ textAlign: "left", width: "50%" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"hangedUpIn"}>In</MenuItem>
              <MenuItem value={"hangedUpOut"}>Out</MenuItem>
              <MenuItem value={"missed"}>Missed</MenuItem>
              <MenuItem value={"failed"}>Failed</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          autoHeight="true"
        />
      </div>
    </div>
  );
};

export default SingleExtensionReport;
