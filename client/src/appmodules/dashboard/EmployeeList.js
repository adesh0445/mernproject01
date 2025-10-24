import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export function Employeelist() {
  const [Employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // API se employee data laana
  const WorkersApi = async () => {
    await axios.get("http://localhost:9800/Employees").then((res)=>{
        if (res.data.status === 251) {
        setEmployees(res.data.AllEmployees);
      }
    });
  };

  useEffect(() => {
    WorkersApi();
  }, []);

  // Input value update karna
  const inputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter lagana (case-insensitive search)
  const filteredEmployees = Employees.filter((emp) => {
    if (searchInput.trim() === "") {
      return true; // agar input blank ho to sab dikhao
    } 
    else {
      return emp.fullName.toLowerCase().includes(searchInput.toLowerCase());
    }
    
  });

  const handleEdit = (id) => navigate(`/dashboard/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      const res = await axios.delete(`http://localhost:9800/Employees/${id}`);
      if (res.data.status === 250) {
        alert(res.data.message);
        WorkersApi();
      } else {
        alert("Failed to delete employee");
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-3 text-center">
        <h3>Employee List</h3>

        {/* 🔍 Search bar */}
        <div className="col-md-12 content-center">
          <div>
            Search Employee:
            <input
              type="text"
              placeholder="Search by name..."
              onChange={inputChange}
              value={searchInput}
              className="m-1"
            />
            {/* agar chahe to button bhi rakh sakte ho */}
            <button className="btn btn-success m-1">Search</button>
          </div>
        </div>

        {/* 🧾 Employee Table */}
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, i) => (
                <tr key={i}>
                  <td>{emp.fullName}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.email}</td>
                  <td>{emp.gender}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(emp._id)}
                    >
                      <FaEdit />
                    </button>
                    <button className="btn btn-info me-2">
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(emp._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No employee found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
