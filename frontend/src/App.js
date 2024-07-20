import React from 'react';
import {  Routes, Route, Navigate  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import CategoryList from './components/CategoryList';
import ExpenseList from './components/ExpenseList';
import Profile from './components/Profile';
import Footer from "./components/Footer";
import { ConfigProvider } from './context/ConfigContext';

function App() {
  return (
    <ConfigProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/expense" />} />
          <Route path="/auth/signup" element={<IsAnon><SignUp /></IsAnon>} />
          <Route path="/auth/login" element={<IsAnon><Login /></IsAnon>} />
          <Route path="/expense" element={<IsPrivate><ExpenseList /></IsPrivate>} />
          <Route path="/category" element={<IsPrivate><CategoryList /></IsPrivate>} />
          <Route path="/profile" element={<IsPrivate><Profile /></IsPrivate>} />
        </Routes>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;