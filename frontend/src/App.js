import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/users";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [users, setUsers] = useState([]);

  // READ
  const getUsers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, dateOfBirth }),
    })
      .then((res) => res.json())
      .then(() => {
        setFirstName("");
        setLastName("");
        setDateOfBirth("");
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(API_URL + "/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => getUsers())
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <h2>Add User</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.dateOfBirth}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
