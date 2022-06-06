import React from 'react';
import { Route } from 'react-router';

import './css/App.css'
import {Layout} from "./components/Layout";
import {LoginPage} from "./components/LoginPage";
import {QuizListPage} from "./components/QuizListPage";
import {PlayPage} from "./components/play/PlayPage";

export default function App(props) {
    
    const [authStatus, setAuthStatus] = React.useState(false);
    
    let fetchAuth = () => {
        //TODO: fetch auth from server   
    }
    fetchAuth();
    
    return (
      <Layout>
          <Route path={"/"} component={authStatus ? QuizListPage : LoginPage} />
          <Route path={"/play"} component={PlayPage} />
      </Layout>
    );
}
