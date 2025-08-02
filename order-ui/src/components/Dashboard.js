import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalOrders = orders.length;
  const totalAmount = orders.reduce((sum, o) => sum + (o.orderAmount || 0), 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📦 All Orders</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="fs-3">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Total Amount</h5>
              <p className="fs-3">₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Invoice</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>₹{order.orderAmount}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <a
                    href={`http://localhost:8080/orders/invoice/${order.orderId}`}
                    className="btn btn-outline-secondary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                    title="Download Invoice"
                  >
                    <i className="bi bi-download"></i> Download
                  </a>
                </td>
                <td>
                  <Link to={`/orders/${order.orderId}`} className="btn btn-info btn-sm">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="alert alert-warning mt-4">No orders found. Try creating one!</div>
      )}
    </div>
  );
};

export default Dashboard;
