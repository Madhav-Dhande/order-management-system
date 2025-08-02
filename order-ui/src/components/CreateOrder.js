import React, { useState } from 'react';
import { createOrder } from '../services/api';

const CreateOrder = () => {
  const [form, setForm] = useState({
    customerName: '',
    orderAmount: '',
    invoice: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, invoice: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('customerName', form.customerName);
    data.append('orderAmount', form.orderAmount);
    data.append('invoice', form.invoice);

    createOrder(data)
      .then((res) => {
        alert('Order Created!');
        setForm({ customerName: '', orderAmount: '', invoice: null });
      })
      .catch((err) => {
        alert('Error creating order');
        console.error(err);
      });
  };

  return (
    <div className="col-md-6 mx-auto">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input type="text" name="customerName" className="form-control" value={form.customerName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Order Amount</label>
          <input type="number" name="orderAmount" className="form-control" value={form.orderAmount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Invoice PDF</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateOrder;
