import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm'
import Main from './Main'


export default function Router () {
    
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/calendar" element={<Main key="calendar" />} />
            <Route path="/files" element={<Main key="files" />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </BrowserRouter>
    );
}
