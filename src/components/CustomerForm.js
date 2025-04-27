/**
 * @file CustomerForm Component
 * @description Provides a reusable form for creating and editing customer information with field validation. 
 *              Includes validation for required fields, email format, phone number format, and date format.
 *              Supports both creating new customers and updating existing ones through form submission.
 * @author Nathan Xia
 * @version 1.0.0
 */

import React, { useState } from 'react';

const CustomerForm = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_name: '',
    phone: '',
    profile_picture_url: '',
    contract_start_date: '',
    contract_expire_date: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company_name.trim()) newErrors.company_name = "Company name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.contract_start_date)) newErrors.contract_start_date = "Start date must be yyyy-mm-dd";
    if (!dateRegex.test(formData.contract_expire_date)) newErrors.contract_expire_date = "Expire date must be yyyy-mm-dd";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="\d{3}-\d{3}-\d{4}"   
            placeholder="123-456-7890"    
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profile_picture_url"
            value={formData.profile_picture_url}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contract Start Date</label>
          <input
            type="date"
            name="contract_start_date"
            value={formData.contract_start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contract Expire Date</label>
          <input
            type="date"
            name="contract_expire_date"
            value={formData.contract_expire_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Save Customer</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
