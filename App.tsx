import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/redux";
import { AppNavigator } from "./src/routing/AppNavigator";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <React.Fragment>
      <ApplicationProvider {...eva} theme={eva.light}>
        <ToastProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppNavigator />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
}
