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
    return utils.from(this.data.source).orderByDescending((x) => x.time).toArray()
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
}
export default extention;
