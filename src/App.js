import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css"; // Import the CSS file
import { Attendance } from "./attendance";


function App() {
  

  return (
    <div className="App">
      <header className="app-header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoflsgzwhrdzd4dIMwGQXgFTxyyXDPqCSjjg&"></img>
        <h1 className="college-name" style={{ textShadow: "3px 3px #000" }}>
          College of Technology
        </h1>
        <h2 className="department-name" style={{ textShadow: "3px 3px #000" }}>
          Department of Computer Engineering
        </h2>
      </header>
      <div className="links">
        <Link to="/attendance" className="link-button">Attendance Record</Link>
        <Link to="/defaulter" className="link-button">Defaulter Record</Link>
      </div>
      <Outlet/>
    </div>
  );
}

export default App;
