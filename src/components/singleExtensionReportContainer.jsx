import { connect } from "react-redux";
import DataServices from "../services/dataservice";
import singleExtensionReport from "./Pages/singleExtensionReport";

const mapStateToProps = (state) => {
  var id = window.location.pathname.replace("/extensioncalls/", "");
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    allcallsbyextension: dataService.getPhoneCallByExtension(id),
    extension : dataService.getExtension(id)
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});

const SingleExtensionReportContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(singleExtensionReport);
export default SingleExtensionReportContainer;
