import { connect } from "react-redux";
import DataServices from "../services/dataservice";

import PhoneCall from "./Pages/PhoneCall";

const mapStateToProps = (state) => {
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    //calls: dataService.getPhoneCalls().toArray(),
    hangedUp: dataService.getHangedup(0, 6).toArray(),
    mainPageMissedCalls: dataService.getMissedCalls(0, 6).toArray(),
    // allMissedCalls: dataService.getMissedCalls(0, 1000).toArray(),
    currentCall: dataService.getCurrent().toArray(),
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});
const PhoneCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhoneCall);
export default PhoneCallContainer;
