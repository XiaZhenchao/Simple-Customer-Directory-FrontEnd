/**
 * @file CustomerList Component
 * @description Displays a list of CustomerCard components by mapping over the provided customers array. 
 *              Passes edit and delete handlers to each individual card for interaction control at the list level.
 * @author Nathan Xia
 * @version 1.0.0
 */

import React from 'react';
import CustomerCard from './CustomerCard';

const CustomerList = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CustomerList;
