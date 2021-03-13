import { connect } from "react-redux";
import DataServices from "../services/dataservice";

import AllMissedCalls from "./Pages/AllMissedCalls";

const mapStateToProps = (state) => {
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    allMissedCalls: dataService.getMissedCalls(0, 10000).toArray(),
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});
const AllMissedCallsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllMissedCalls);
export default AllMissedCallsContainer;
