import React, {Component} from 'react';
import {Route, Routes, Switch} from 'react-router';

import Layout from "./components/Layout";
import QuizListPage from "./components/QuizListPage";
import {PlayPage} from "./components/play/PlayPage";
import APIPlaygroundPage from "./components/APIPlaygroundPage";
import HostPage from "./components/play/HostPage";
import {LoginPage} from "./components/forms/LoginPage";
import PlayCodePage from "./components/play/PlayCodePage";

export default function App(props) {
    
        return (
            <Layout>
                <Routes>
                    <Route path='/' element={<LoginPage />}/>
                    <Route path='/play' element={<PlayCodePage />}/>
                    <Route path='/play/*' element={<PlayPage />} />
                    <Route path='/host/*' element={<HostPage />}/>
                    <Route path='/apidebug' element={<APIPlaygroundPage />} />
                    <Route path='/quizlist' element={<QuizListPage />} />
                </Routes>
            </Layout>
        );
}
