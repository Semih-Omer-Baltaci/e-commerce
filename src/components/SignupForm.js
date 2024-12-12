import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './api';

const SignupForm = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('customer');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await api.post('/signup', data);
      if (response.status === 201) {
        alert('You need to click link in email to activate your account!');
        window.history.back();
      }
    } catch (error) {
      console.error(error);
      alert('Error signing up!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register('name', { required: true, minLength: 3 })} />
        {errors.name && <p>Name is required and must be at least 3 characters long.</p>}
      </label>
      <label>
        Email:
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <p>Email is required.</p>}
      </label>
      <label>
        Password:
        <input type="password" {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
        {errors.password && <p>Password must be at least 8 characters long and include numbers, lowercase, uppercase, and special characters.</p>}
      </label>
      <label>
        Confirm Password:
        <input type="password" {...register('confirmPassword', { required: true, validate: (value) => value === watch('password') })} />
        {errors.confirmPassword && <p>Passwords do not match.</p>}
      </label>
      <label>
        Role:
        <select value={selectedRole} onChange={handleRoleChange}>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>
      {selectedRole === 'store' && (
        <div>
          <label>
            Store Name:
            <input type="text" {...register('store.name', { required: true, minLength: 3 })} />
            {errors.store?.name && <p>Store name is required and must be at least 3 characters long.</p>}
          </label>
          <label>
            Store Phone:
            <input type="tel" {...register('store.phone', { required: true, pattern: /^\d{3} \d{3} \d{4}$/ })} />
            {errors.store?.phone && <p>Store phone number is required and must be in the format XXX XXX XXXX.</p>}
          </label>
          <label>
            Store Tax ID:
            <input type="text" {...register('store.tax_no', { required: true, pattern: /^T\d{4}V\d{7}$/ })} />
            {errors.store?.tax_no && <p> Store Tax ID is required and must be in the format TXXXXVXXXXXX.</p>}
          </label>
          <label>
            Store Bank Account:
            <input type="text" {...register('store.bank_account', { required: true, pattern: /^TR\d{2} \d{4} \d{4} \d{4} \d{4} \d{2}$/ })} />
            {errors.store?.bank_account && <p>Store bank account is required and must be a valid IBAN address.</p>}
          </label>
        </div>
      )}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default SignupForm;