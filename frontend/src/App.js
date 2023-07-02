import React from 'react';

import  { Routes, Route, redirect } from "react-router-dom";
import Profile from './components/user/Profile'
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Calendar from './components/calendar/Calendar';

import Main from './layouts/Main';
import ErrorPage from './ErroPage';
import { RequireAuth, AuthProvider } from "./resources/auth";


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Main />} errorElement={<ErrorPage />}>
          <Route 
            path="calendar"
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
          } 
          />
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="sign-up" element={<RegistrationForm />} />
          <Route 
            path="files" 
            element={
              <RequireAuth>
                <RegistrationForm />
              </RequireAuth>
            } 
          />
          <Route
            path="me"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={() => {redirect("/calendar")}} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
