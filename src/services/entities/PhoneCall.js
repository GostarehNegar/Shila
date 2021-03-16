import Entity from "./Entity";
import ms from "pretty-ms";

class PhoneCall extends Entity {
  constructor(data) {
    super(data);
    //this.data = data;
  }
  get time() {
    return this.data.payload.time || this.data.payload.Time;
  }
  get status() {
    if (
      this.payload.direction === "in" &&
      this.payload.upTime === null &&
      this.payload.hangupTime !== null
    ) {
      return "missed";
    }
    return (this.payload.status || "unknown").toLowerCase();
  }
  get formattedTime() {
    var date = new Date(this.time);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date.toTimeString();
    var ret = date.toLocaleString("fa-IR");
    debugger;
    return ret;
  }
  get date() {
    var date = new Date(this.time);
    return date.toLocaleDateString("fa-IR");
  }
  get numericDate(){
    return new Date(this.time).getTime()
  }
  get called() {
    return this.payload.calledId;
  }
  get caller() {
    return this.payload.callerId || "unknown";
  }
  get fullName() {
    var fullName =
      (this.payload.firstName || " ") + " " + (this.payload.lastName || " ");
    if (fullName === "   ") {
      return "Not Found";
    }
    return fullName;
  }
  get id() {
    return this.data.id;
  }
  get upTime() {
    if (this.payload.upTime) {
      return new Date(this.payload.upTime);
    } else {
      return "null";
    }
  }
  get direction() {
    return this.payload.direction;
  }
  get hangUP() {
    return this.payload.hangupTime;
  }
  get callDuration() {
    if (this.payload.upTime !== null && this.payload.hangupTime !== null) {
      try {
        var upTime = new Date(this.payload.upTime);
        var hangupTime = new Date(this.payload.hangupTime);
        var callDuration = hangupTime - upTime;
        return ms(callDuration, {
          colonNotation: true,
          secondsDecimalDigits: 0,
        });
      } catch (e) {}
      // callDuration.getHours() +
      // ":" +
      // callDuration.getMinutes() +
      // ":" +
      // callDuration.getSeconds()
    }
    return "failed";
  }
}

export default PhoneCall;
