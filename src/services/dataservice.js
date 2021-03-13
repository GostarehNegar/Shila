import PhoneCall from "./entities/PhoneCall";
import utils from "./utils";
import { getEntities } from "../store/reducers/entities";
import extention from "./entities/Extention";
import { updateTypeAliasDeclaration } from "typescript";

class DataServices {
  state = {};
  constructor(state) {
    this.state = state;
  }

  getPhoneCalls = (page, length) => {
    //debugger;
    page = page || 0;
    length = length || 20;
    var calls = getEntities(this.state, "phonecall");
    return utils
      .from(calls)
      .select((x) => new PhoneCall(x))
      .orderByDescending((x) => x.time)
      .skip(page * length)
      .take(length);
  };
  getPhoneCallByNumber = (page, length, phone) => {
    //debugger;
    page = page || 0;
    length = length || 20;
    phone = phone || "09372803900";
    var calls = getEntities(this.state, "phonecall");
    return utils
      .from(calls)
      .select((x) => new PhoneCall(x))
      .orderByDescending((x) => x.time)
      .where((phonecall) => phonecall.caller === phone)
      .skip(page * length)
      .take(length);
  };
  getHangedup = (page, length) => {
    //debugger;
    page = page || 0;
    length = length || 20;
    var calls = getEntities(this.state, "phonecall");
    return utils
      .from(calls)
      .select((x) => new PhoneCall(x))
      .orderByDescending((x) => x.time)
      .where((phonecall) => phonecall.status === "hangup")
      .skip(page * length)
      .take(length);
  };
  //fix THIS
  getMissedCalls(page, length) {
    //debugger;
    page = page || 0;
    length = length || 6;
    var calls = getEntities(this.state, "phonecall");
    // debugger;
    console.error(`call lenght ****** ${calls.length}`);
    return utils
      .from(calls)
      .select((x) => new PhoneCall(x))
      .orderByDescending((x) => x.time)
      .where((phonecall) => phonecall.status === "missed")
      .skip(page * length)
      .take(length);
  }

  static Create(state) {
    return new DataServices(state);
  }
  getCurrent(page, length) {
    // debugger;

    page = page || 0;
    length = length || 1;
    var calls = getEntities(this.state, "phonecall");
    return (
      utils
        .from(calls)
        .select((x) => new PhoneCall(x))
        .orderByDescending((x) => x.time)
        // .where((phonecall) => phonecall.status === "hangup")
        .where((phoneCall) => phoneCall.called === "103")
        .skip(page * length)
        .take(length)
    );
  }
  getExtensions(page, length) {
    //debugger;
    page = page || 0;
    length = length || 6;
    var calls = getEntities(this.state, "phonecall");

    // debugger;
    return utils
      .from(calls)
      .select((x) => new PhoneCall(x))
      .groupBy((phoneCall) => phoneCall.called)
      .select(
        (item) => new extention({ key: item.key(), source: item.getSource() })
      )
      .where((item) => item.id !== "140" && item.id !== "141");
    // .orderByDescending((x) => x.phoneCalls.time);
    // .orderByDescending((x) => x.time)
    // .where((phonecall) => phonecall.status === "missed")
    // .skip(page * length)
    // .take(length);
  }
  getExtension(id){

    return utils.from(this.getExtensions())
      .firstOrDefault(x=>x.id===id)
  }

  getPhoneCallByExtension(id) {
    // debugger
    id = id;
    var gotExtension = this.getExtensions();
    // if(ext!=null)
    // {
    //   var ret= utils.from(ext.phoneCalls).orderByDescending(x=>x.time).toArray();
    //   debugger
    //   return ret
    // }
    // return [];
    debugger;
    var ret = utils
      .from(gotExtension)
      .where((item) => item.id === id)
      .toArray();
    // .orderByDescending((x) => x.phoneCalls.time);
    return ret;
  }
}

export default DataServices;
