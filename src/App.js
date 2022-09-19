import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import RTL from './layouts/full-layout/customizer/RTL';
import ThemeSettings from './layouts/full-layout/customizer/ThemeSettings';
// React routes
import Router from './routes/Router';

import BlankLayout from './layouts/blank-layout/BlankLayout';
import FullLayout from './layouts/full-layout/FullLayout';
import Connect from './views/authentication/Connect';
import Dashboard from './views/dashboard/Dashboard';
import Loading from './views/authentication/Loading';
import ErrorLoad from './views/authentication/ErrorLoad';

// Web 3 React
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect, useInactiveListener } from './web3/hooks';

import 'react-perfect-scrollbar/dist/css/styles.css';

const App = () => {

  // START CONNECT TO WEB 3.0

  const web3React = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === web3React.connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, web3React.connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // END CONNECT TO WEB 3.0

  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const currentAdr = sessionStorage.getItem('adr')

  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    Router().then(response => {
      setRoutes(response);
    });
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route, key) => {
      if (route.children) {
        return getRoutes(route.children);
      }

      if (route) {
        return <Route exact path={route.path} element={route.element} key={key} />;
      }

      return null;
    });


  return (
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <Routes>
            {(customizer.connect || currentAdr) && routes !== null ?
              <Route path="/" element={<FullLayout />}>
                {getRoutes(routes[0].children)}
              </Route>
              : (customizer.connect || currentAdr) && routes === null ?
                <Route path="/" element={<FullLayout />}>
                  <Route path="/" element={<Dashboard />} />
                </Route>
                : (!customizer.connect || !currentAdr) && routes !== null ?
                  <Route path="/" element={<BlankLayout />}>
                    <Route path="/" element={<Connect />} />
                    {getRoutes(routes[1].children)}
                  </Route>
                  : (!customizer.connect || !currentAdr) && routes === null ?
                    <Route path="/" element={<BlankLayout />}>
                      <Route path="/" element={<Loading />} />
                    </Route>
                    :
                    <Route path="/" element={<BlankLayout />}>
                      <Route path="/" element={<ErrorLoad />} />
                    </Route>
            }
          </Routes>
        </RTL>
      </ThemeProvider>
  );
};

export default App;

