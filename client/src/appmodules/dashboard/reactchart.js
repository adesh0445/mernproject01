import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function Reactchart() {

  const [allEmployees, setAllEmployees] = useState([]);
  const [chartData, setChartData] = useState([]);
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";


  // ✅ API से डेटा लाना
  const myapi = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/Employees`);

      console.log("API Response:", data);

      // कभी API array देता है, कभी object
      const all = Array.isArray(data) ? data : data.AllEmployees || [];

      setAllEmployees(all);
      createChart(all);
    } catch (error) {
      console.error("API Fetch Error:", error);
    }
  };

  // ✅ filter() से male/female count निकालना (lowercase support)
  const createChart = (data) => {
    if (!data || data.length === 0) {
      setChartData([]);
      return;
    }

    const maleCount = data.filter(
      (emp) => emp.gender && emp.gender.toLowerCase() === "male"
    ).length;

    const femaleCount = data.filter(
      (emp) => emp.gender && emp.gender.toLowerCase() === "female"
    ).length;

    const chartArr = [
      { gender: "Male", count: maleCount },
      { gender: "Female", count: femaleCount },
    ];

    console.log("Chart Data:", chartArr);
    setChartData(chartArr);
  };

  useEffect(() => {
    myapi();
  }, []);

  // ✅ Dropdown Filter
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "all") {
      createChart(allEmployees);
    } else {
      const filtered = allEmployees.filter(
        (emp) => emp.gender && emp.gender.toLowerCase() === value
      );
      createChart(filtered);
    }
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <h3 className="text-center mb-4">कर्मचारियों का Gender Distribution</h3>

        {/* 👉 Filter Dropdown */}
        <div className="row mb-3">
          <div className="col-md-4">
            <select className="form-select" onChange={handleFilter}>
              <option value="all">सभी</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* 👉 Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gender" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              name="कर्मचारी संख्या"
              fill="blue"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
}
