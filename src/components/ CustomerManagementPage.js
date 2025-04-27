/**
 * @file Customer Management Page Component
 * @description Provides a full management interface for customers including listing, searching, creating, editing, 
 *              and deleting customers. Handles form modal toggling, backend API communication, 
 *              and customer data state management for the UI. 
 * @author Nathan Xia
 * @version 1.0.0
 */



import React, { useEffect, useState } from 'react';
import CustomerList from './CustomerList'; 
import CustomerForm from './CustomerForm'; 
import api from '../api'; 

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/customers');
        setCustomers(response.data);
        setSearchResult(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleCreateClick = () => {
    setShowForm(true);
    setEditingCustomer(null); // Clear editing mode
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleSaveCustomer = async (formData) => {
    try {
      if (editingCustomer) {
        // Update existing customer
        const response = await api.put(`/customers/${editingCustomer.id}`, formData);
        if (response.status === 200) {
          const updatedList = customers.map(cust => 
            cust.id === editingCustomer.id ? { ...cust, ...formData } : cust
          );
          setCustomers(updatedList);
          setSearchResult(updatedList);
          setShowForm(false);
          setEditingCustomer(null);
          alert('Customer updated successfully!');
        }
      } else {
        // Create new customer
        const response = await api.post('/customers', formData);
        if (response.status === 201) {
          const addedCustomer = {
            id: response.data.insertId,
            ...formData
          };
          const updated = [...customers, addedCustomer];
          setCustomers(updated);
          setSearchResult(updated);
          setShowForm(false);
          alert('Customer created successfully!');
        }
      }
    } catch (error) {
      console.error('Failed to save customer:', error);
      alert('Failed to save customer');
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/customers/${customerId}`);
      if (response.status === 200) {
        const updatedList = customers.filter(cust => cust.id !== customerId);
        setCustomers(updatedList);
        setSearchResult(updatedList);
        alert('Customer deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete customer:', error);
      alert('Failed to delete customer');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResult(customers);
      return;
    }

    const filtered = customers.filter(cust => 
      cust.name.toLowerCase().includes(value) ||
      cust.company_name.toLowerCase().includes(value)
    );
    setSearchResult(filtered);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="customer-management-page">
      <h1>Customer Management</h1>

      <div className="customer-toolbar">
        <button className="btn-small" onClick={handleCreateClick}>Create</button>
        <input
          type="text"
          className="search-input"
          placeholder="Search by Name or Company..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="customer-list-container">
        {searchResult.length > 0 ? (
          <CustomerList 
            customers={searchResult}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        ) : (
          <div className="no-data">No matching customers</div>
        )}
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <CustomerForm
              onSave={handleSaveCustomer}
              onCancel={handleCancel}
              initialData={editingCustomer}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
