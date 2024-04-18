import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtList from './components/ArtList.js';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<ArtList />} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
