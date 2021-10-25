import './App.css';
import Router, { IPrivateRoute } from './routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import Home from './Features/Home/pages/home';
import { Dashboard } from './Features/Dashboard/index';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

function App() {
    const [authenticated, setAuthenticated] = React.useState(false);

    React.useEffect(() => {
        // const remembered = localStorage.getItem('remembered');
        const loggedIn = Boolean(localStorage.getItem('token'));
        setAuthenticated(loggedIn);
    }, [authenticated]);

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        {/* {authenticated ? (
                            <Redirect to="/dashboard" />
                        ) : ( */}
                        <Home />
                        {/* )} */}
                    </Route>
                    {/* <PrivateRoute
                        isSignedIn={authenticated}
                        component={Dashboard}
                        path="/dashboard"
                    /> */}
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default App;
