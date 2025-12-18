import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CaseList from './components/CaseList';
import CaseForm from './components/CaseForm';
import CaseDetails from './components/CaseDetails';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export default function App() {
  const [dark, setDark] = useState(() => {
    const v = localStorage.getItem('theme') || 'light';
    return v === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="app">
      <nav className="navbar">
  <h1>Legal Case Management System</h1>

  <div className="nav-actions">
    <Link to="/">Home</Link>
    <Link to="/add">Add Case</Link>
    <ThemeToggle dark={dark} setDark={setDark} />
  </div>
</nav>


      <main className="main">
        <Routes>
          <Route path="/" element={<CaseList />} />
          <Route path="/add" element={<CaseForm />} />
          <Route path="/edit/:id" element={<CaseForm editMode />} />
          <Route path="/case/:id" element={<CaseDetails />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Law Dept</footer>
    </div>
  );
}
