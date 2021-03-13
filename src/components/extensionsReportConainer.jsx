import { connect } from "react-redux";
import DataServices from "../services/dataservice";
import ExtensionsReport from "./Pages/ExtensionsReport";


const mapStateToProps = (state) => {
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    extensions:dataService.getExtensions().toArray()
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});
const ExtensionsReportContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtensionsReport);
export default ExtensionsReportContainer;
