/**
 * @file CustomerCard Component 
 * @description Renders an individual customer's details in a styled card format, including options to edit or delete the customer. 
 *              Displays a default profile picture if none is provided. 
 *              Handles button actions for editing and deleting through props callbacks.
 * @author Nathan Xia
 * @version 1.0.0
 */

import React from 'react';
import defaultProfilePic from "../Profile.png"
const CustomerCard = ({ customer, onEdit, onDelete }) => {
    return (
      <div className="customer-card">
        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEdit(customer)}>✏️</button>
          <button className="delete-btn" onClick={() => onDelete(customer.id)}>🗑️</button>
        </div>
  
        <img
          className="customer-avatar"
          src={customer.profile_picture_url || defaultProfilePic}
          alt={customer.name}
        />
        <h3>{customer.name}</h3>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Company:</strong> {customer.company_name}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Contract Start:</strong> {new Date(customer.contract_start_date).toISOString()}</p>
        <p><strong>Contract Expire:</strong> {new Date(customer.contract_expire_date).toISOString()}</p>
      </div>
    );
  };
  
  export default CustomerCard;