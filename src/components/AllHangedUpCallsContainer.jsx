import { connect } from "react-redux";
import DataServices from "../services/dataservice";

import AllHangedupCalls from "./Pages/AllHangedupCalls";

const mapStateToProps = (state) => {
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    allHangedUps: dataService.getHangedup(0, 10000).toArray(),
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});
const AllHangedUpCallsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllHangedupCalls);
export default AllHangedUpCallsContainer;
