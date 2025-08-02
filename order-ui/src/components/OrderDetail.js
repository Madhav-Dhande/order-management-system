import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id)
      .then(res => setOrder(res.data))
      .catch(() => setOrder(null));
  }, [id]);

  if (!order) {
    return <div className="alert alert-danger">Order not found.</div>;
  }

  return (
    <div className="card col-md-6 mx-auto shadow">
      <div className="card-header bg-primary text-white">
        <h4>Order Details</h4>
      </div>
      <div className="card-body">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Amount:</strong> ${order.orderAmount?.toLocaleString()}</p>
        <p><strong>Date:</strong> {order.orderDate}</p>
        <p>
          <strong>Invoice:</strong>
          <a
            href={order.invoiceFileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-secondary btn-sm"
            title="Download Invoice"
          >
            <i className="bi bi-download"></i> Download
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;