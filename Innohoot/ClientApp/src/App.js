import React, { Component } from 'react';
import { Route, Routes, Switch } from 'react-router';
import { Navigate } from 'react-router-dom';

import Layout from "./components/Layout";
import QuizListPage from "./components/QuizListPage";
import { PlayPage } from "./components/play/PlayPage";
import HostPage from "./components/play/HostPage";
import { LoginPage } from "./components/forms/LoginPage";
import PlayCodePage from "./components/play/PlayCodePage";
import { UserContext } from './context/utils';
import HistoryPage from "./components/HistoryPage";

export default function App(props) {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    UserContext.loggedIn ? <QuizListPage /> : <LoginPage />

                } />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/play' element={<PlayCodePage />} />
                <Route path='/play/*' element={<PlayPage />} />
                <Route path='/history' element={<HistoryPage />} />
                <Route path='/host/*' element={<HostPage />} />
                <Route path='/quizlist' element={<QuizListPage />} />
            </Routes>
        </Layout>
    );
}
