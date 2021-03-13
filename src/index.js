import * as React from "react";
import { render } from "react-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import SignIn from "./components/SignIn";
import PhoneCallContainer from "./components/phoneCallContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LayoutContainer from "./components/MainLayout";
import Shila from "./Shila";
import composeServices from "./ServiceComposer";
import AllMissedCallsContainer from "./components/allMissedCallsContainer";
import AllHangedUpCallsContainer from "./components/AllHangedUpCallsContainer";
import ProfileContainer from "./components/ProfileContainer";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import AllHangedupCalls from "./components/Pages/AllHangedupCalls";
import ExtensionsReportContainer from "./components/extensionsReportConainer"
import SingleExtensionReportContainer from "./components/singleExtensionReportContainer";


composeServices();

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const { store, persistor } = Shila.configureStore();
//store.runSaga(rootSaga, store)

const root = document.getElementById("root");
let query = {};
query.get = (x) => window.location.pathname;

render(
  <ThemeProvider theme={theme}>
    <CssBaseLine></CssBaseLine>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <LayoutContainer>
            <Switch>
              <Route path="/SignIn">
                <SignIn />
              </Route>
              <Route path="/Home">
                <PhoneCallContainer />
              </Route>
              <Route path="/PhoneCalls">
                <PhoneCallContainer />
              </Route>
              <Route path="/MissedCalls">
                <AllMissedCallsContainer />
              </Route>
              <Route
                path="/contact/:phone"
                children={<ProfileContainer />}
              ></Route>
              <Route
                path="/extensioncalls/:id"
                children={<SingleExtensionReportContainer />}
              ></Route>
              <Route path="/HangedUps">
                <AllHangedUpCallsContainer />
              </Route>
              <Route path="/ExtensionsReport">
                <ExtensionsReportContainer />
              </Route>
              <Route path="">
                <PhoneCallContainer />
              </Route>
            </Switch>
          </LayoutContainer>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  root
);
