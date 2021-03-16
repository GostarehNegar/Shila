import PhoneCall from "./PhoneCall";
import utils from "../utils";

class extention {
  constructor(data) {
    this.data = data;
  }
  get id() {
    return this.data.key;
  }
  get phoneCalls() {
    return utils
      .from(this.data.source)
      .orderByDescending((x) => x.time)
      .toArray();
  }
  get missedCalls() {
    return this.data.source.filter((item) => item.status === "missed");
  }

  get missedCallsCount() {
    return this.missedCalls.length;
  }

  get todaysMissedCallsCount() {
    var today = new Date().toLocaleDateString("fa-IR");
    return this.missedCalls.filter((item) => item.date === today).length;
  }

  get hangedUpCalls() {
    return this.data.source.filter((item) => item.status === "hangup");
  }

  get hangedUpCallsCount() {
    return this.hangedUpCalls.length;
  }

  get todaysHangedUpCallsCount() {
    var today = new Date().toLocaleDateString("fa-IR");
    return this.hangedUpCalls.filter((item) => item.date === today).length;
  }

  get currentCall() {
    const newArray = this.data.source.sort((call) => call.time);
    //   console.log(newArray)
    return newArray[newArray.length - 1];
  }
  filterPhoneCalls({ start, end, status }) {
    debugger;
    status = status || "all";
    start = new Date(start).getTime() || "null";
    end = new Date(end).getTime() + 86400000 || "null";
    if (start !== "null" && end !== "null" && status === "all") {
      return utils
        .from(this.phoneCalls)
        .where(
          (phonecall) =>
            phonecall.numericDate <= end && phonecall.numericDate >= start
        )
        .toArray();
    }
    if (start === "null" && end === "null" && status === "all") {
      return this.phoneCalls;
    }
    if (start === "null" && end === "null" && status !== "all") {
      if (status === "hangedUpIn") {
        return utils
          .from(this.phoneCalls)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" && phonecall.direction === "in"
          )
          .toArray();
      }
      if (status === "hangedUpOut") {
        return utils
          .from(this.phoneCalls)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" && phonecall.direction === "out"
          )
          .toArray();
      }
      if (status === "missed") {
        return utils
          .from(this.phoneCalls)
          .where((phonecall) => phonecall.status === "missed")
          .toArray();
      }
      if (status === "failed") {
        return utils
          .from(this.phoneCalls)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" &&
              phonecall.callDuration === "failed"
          )
          .toArray();
      }
    }
    if (start !== "null" && end !== "null" && status !== "all") {
      var phoneCallFilteredByDate = utils
        .from(this.phoneCalls)
        .where(
          (phonecall) =>
            phonecall.numericDate <= end && phonecall.numericDate >= start
        )
        .toArray();
      if (status === "hangedUpIn") {
        return utils
          .from(phoneCallFilteredByDate)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" && phonecall.direction === "in"
          )
          .toArray();
      }
      if (status === "hangedUpOut") {
        return utils
          .from(phoneCallFilteredByDate)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" && phonecall.direction === "out"
          )
          .toArray();
      }
      if (status === "missed") {
        return utils
          .from(phoneCallFilteredByDate)
          .where((phonecall) => phonecall.status === "missed")
          .toArray();
      }
      if (status === "failed") {
        return utils
          .from(phoneCallFilteredByDate)
          .where(
            (phonecall) =>
              phonecall.status === "hangup" &&
              phonecall.callDuration === "failed"
          )
          .toArray();
      }
    }
  }
}
export default extention;
