import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";


  useEffect(() => {
    axios.get(`${API_URL}/Employees/${id}`)
      .then(res => {
        setFullName(res.data.fullName);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setGender(res.data.gender);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = () => {
    const employee = { fullName, phone, email, gender };
    axios.put(`${API_URL}/updateworker/${id}`, employee).then(() => {
        alert("Employee updated successfully ✅");
        navigate("/dashboard/Employeelist");
      }).catch(err => {
        console.error(err);
        alert("Update failed ❌");
      });
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div className="card card-size p-4 shadow">
          <h2 className="text-center mb-4">Edit Employee</h2>

          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="form-control mb-3" />
          <input type="phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="form-control mb-3" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-3" />

          <div className="p-3 mb-3">
            <label className="me-2">Gender: </label>
            <input type="radio" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} />
            <label htmlFor="male" className="me-3">Male</label>

            <input type="radio" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} />
            <label htmlFor="female">Female</label>
          </div>

          <button onClick={handleUpdate} className="btn btn-success w-100 mb-2">Update Save</button>
          <button type="button" className="btn btn-danger" onClick={() => navigate("/dashboard/Employeelist")} className="btn btn-secondary w-100">Cancel</button>
        </div>
      </div>
    </Fragment>
  );
}
