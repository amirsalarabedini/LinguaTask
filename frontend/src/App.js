import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CaptionGenerator from './components/tasks/CaptionGenerator';
import TextSummarizer from './components/tasks/TextSummarizer';
import Translator from './components/tasks/Translator';
import History from './components/tasks/History';
import Navbar from './components/layout/Navbar';

// Auth context
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/tasks/caption" element={
              <PrivateRoute>
                <CaptionGenerator />
              </PrivateRoute>
            } />
            <Route path="/tasks/summary" element={
              <PrivateRoute>
                <TextSummarizer />
              </PrivateRoute>
            } />
            <Route path="/tasks/translation" element={
              <PrivateRoute>
                <Translator />
              </PrivateRoute>
            } />
            <Route path="/tasks/history" element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;