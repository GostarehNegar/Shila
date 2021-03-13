import { connect } from "react-redux";
import DataServices from "../services/dataservice";

import Profile from "./Pages/Profile";

const mapStateToProps = (state) => {
  var phone = window.location.pathname.replace("/contact/", "");
  var dataService = DataServices.Create(state); //.getPhoneCalls();
  return {
    phoneCalls: dataService.getPhoneCallByNumber(0, 1000, phone).toArray(),
  };
};
const mapDispatchToProps = (dispatch) => ({
  // deleteConversation: id => {
  //     dispatch(deleteConversation(id))
  // }
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileContainer;
