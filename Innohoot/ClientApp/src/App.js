import React, {Component} from 'react';
import {Route, Routes, Switch} from 'react-router';

import Layout from "./components/Layout";
import {LoginPage} from "./components/LoginPage";
import QuizListPage from "./components/QuizListPage";
import {PlayPage} from "./components/play/PlayPage";
import APIPlaygroundPage from "./components/APIPlaygroundPage";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<LoginPage />}/>
                    <Route path='/play' element={<PlayPage />}/>
                    <Route path='/apidebug' element={<APIPlaygroundPage />} />
                </Routes>
            </Layout>
        );
    }
}
