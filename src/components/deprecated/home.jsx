import React from "react";
import { connect } from "react-redux";
import { getSinedIn } from "../../store/reducers/app";
import { BrowserRouter, Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    singnedIn: getSinedIn(state),
  };
};

// Using "Stateless Functional Components"
const Home = (props) => {
  return (
    <div>
      <h1>App </h1>
      <h2>Sample App: </h2>
      <p>:</p>
      <ul>
        <li>
          {" "}
          <Link to="/phonecalls">Phone Calls </Link>
        </li>
      </ul>
    </div>
  );
  //     return props.singnedIn?
  //     <div>
  //     <h1>App </h1>
  //     <h2>Sample App:  </h2>
  //     <p>:</p>
  //     <ul>
  //         <li> Charters:  <a href="/charters">Charters </a>.</li>
  //         <li>   <a href="/logs">Logs </a></li>
  //         <li>   <a href="/phonecalls">Phone Calls </a></li>
  //     </ul>
  // </div>
  //         :
  //         <SignIn/>
};

const HomeContainer = connect(mapStateToProps)(Home);
export default HomeContainer;
