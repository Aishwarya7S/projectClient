import React from "react";
import Sidenav from '../Components/Sidenav';
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Chart Data
  const barChartData = {
    labels: ["Stock In", "Stock Out", "Available Stock"],
    datasets: [
      {
        label: "Stock Data",
        data: [100, 70, 30],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Category ", "Subcategory ", "Inventory"],
    datasets: [
      {
        data: [45, 25, 30],
        backgroundColor: ["#ff9800", "#9c27b0", "#03a9f4"],
      },
    ],
  };

  return (
    <div className="d-flex">
      <Sidenav />
      <div className="container mt-4">
        {/* Welcome Text */}
        <div className="text-center p-4 bg-light rounded shadow mb-4">
          <h1 className="display-5 mt-5">Welcome to the Civil Store Management System</h1>
          <p className="lead mt-3 text-dark">
            Your one-stop solution for efficiently managing categories, stock inwards, stock outwards, and generating insightful reports.
          </p>
          <div className="row">
            <div className="col-md-6">
              <h5 className="text-center">Stock Overview</h5>
              <Bar data={barChartData} />
            </div>

            <div className="col-md-6" style={{ width: '30%', marginLeft: '50px' }}>
              <h5 className="text-center">Category Distribution</h5>
              <Doughnut data={doughnutChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
