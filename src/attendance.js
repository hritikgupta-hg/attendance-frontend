import React, { useEffect, useState } from "react";
import './attendance.css';

export const Attendance = () => {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  // let studentData = [];
  let revDate;
  if (date) {
    const currentDate = new Date(date);
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    revDate = `${day}-${month}-${year}`;
  }

  const [attendance, setAttendance] = useState(null);
  const [studentData, setStudents] = useState([]);

  const subjects = [
    "MACHINE LEARNING",
    "ARTIFICIAL INTELLIGENCE",
    "DATA MINING",
    "CRYPTOGRAPHY & NETWORK SECURITY",
    "PARALLEL AND DISTRIBUTED ALGORITHMS",
    "ADVANCED COMPUTERS ARCHITECTURE",
    "PRINCIPLES OF MANAGEMENT",
  ]; // Example subjects

  const getAllStudent = async () => {
    try {
      const response = await fetch("https://attendance-backend-e0lz.onrender.com/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);
      // studentData = data;
      // console.log(studentData);
      setStudents(data.sort((a, b) => a.sid - b.sid));
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://attendance-backend-e0lz.onrender.com/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, date }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
      setAttendance(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };
  return (
    <>
      <h1>Attendance Records</h1>
      <form className="attendance-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Subject:
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled>
                Select a subject
              </option>
              {subjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Get Attendance</button>
      </form>
      {attendance && attendance.length == 0 && <div>No record found</div>}
      {attendance && attendance.length > 0 && (
        <div>
          <h2>
            Attendance Records for {subject} on {revDate}
          </h2>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((obj, index) => {
                const a = attendance.filter(
                  (obj1) => obj1.name.toLowerCase() === obj.name.toLowerCase()
                );
                console.log(a);
                return (
                  <tr key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td>{obj.sid}</td>
                    <td>{obj.name}</td>
                    <td>{a.length === 1 ? "Present" : "Absent"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
