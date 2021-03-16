import * as React from "react";
import Paper from "@material-ui/core/Paper";
import utils from "../../services/utils";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";

import { Animation, Stack } from "@devexpress/dx-react-chart";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

export const SideBySideChart = (props) => {
  let data = [];
  if (props.status === "missed") {
    data = utils
      .from(props.data)
      .groupBy((phoneCall) => phoneCall.date)
      .select((item) => ({
        key: item.key(),
        count: item.getSource().filter((phone) => phone.status === "missed")
          .length,
      }))
      .toArray();
  }
  if (props.status === "hangedUpIn") {
    data = utils
      .from(props.data)
      .groupBy((phoneCall) => phoneCall.date)
      .select((item) => ({
        key: item.key(),
        count: item
          .getSource()
          .filter(
            (phone) => phone.status === "hangup" && phone.direction === "in"
          ).length,
      }))
      .toArray();
  }
  if (props.status === "hangedUpOut") {
    data = utils
      .from(props.data)
      .groupBy((phoneCall) => phoneCall.date)
      .select((item) => ({
        key: item.key(),
        count: item
          .getSource()
          .filter(
            (phone) => phone.status === "hangup" && phone.direction === "out"
          ).length,
      }))
      .toArray();
  }

  if (props.status === "failed") {
    data = utils
      .from(props.data)
      .groupBy((phoneCall) => phoneCall.date)
      .select((item) => ({
        key: item.key(),
        count: item
          .getSource()
          .filter(
            (phone) =>
              phone.status === "hangup" && phone.callDuration === "failed"
          ).length,
      }))
      .toArray();
  }

  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries name="paris" valueField="count" argumentField="key" />

        <Title text="number of calls" />
        <Animation />
        <Stack />
      </Chart>
    </Paper>
  );
};
export const Bar = (props) => {
  const data = utils
    .from(props.data)
    .groupBy((phoneCall) => phoneCall.date)
    .select((item) => ({
      key: item.key(),
      missedCount: item.getSource().filter((phone) => phone.status === "missed")
        .length,
      hangeUpInCount: item
        .getSource()
        .filter(
          (phone) => phone.status === "hangup" && phone.direction === "in"
        ).length,
      hangeUpOutCount: item
        .getSource()
        .filter(
          (phone) => phone.status === "hangup" && phone.direction === "out"
        ).length,
      failedCount: item
        .getSource()
        .filter(
          (phone) =>
            phone.callDuration === "failed" && phone.status === "hangup"
        ).length,
    }))
    .toArray();

  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries
          name="Missed"
          valueField="missedCount"
          argumentField="key"
          color="#c74040"
        />
        <BarSeries
          name="In"
          valueField="hangeUpInCount"
          argumentField="key"
          color="darkcyan"
        />
        <BarSeries
          name="Out"
          valueField="hangeUpOutCount"
          argumentField="key"
          color="#3e7853"
        />
        <BarSeries
          name="Failed"
          valueField="failedCount"
          argumentField="key"
          color="#6d787d"
        />

        <Title text="number of calls" />
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Stack />
      </Chart>
    </Paper>
  );
};
