import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
});

const SignupForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const [roles, setRoles] = useState([]);
  const [storeFieldsVisible, setStoreFieldsVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    try {
      const { role_id } = data;
      let postData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id,
      };

      if (role_id === 'store') {
        postData.store = {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxNo,
          bank_account: data.storeBankAccount,
        };
      }

      await axiosInstance.post('/signup', postData);
      alert('You need to click link in email to activate your account!');
      history.goBack();
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please try again.');
    }
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setStoreFieldsVisible(selectedRole === 'store');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          {...register('name', { required: true, minLength: 3 })}
        />
        {errors.name && <span>Name is required and must be at least 3 characters.</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Email is required and must be valid.</span>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
        />
        {errors.password && <span>Password must be at least 8 characters, including numbers, upper and lower case letters, and special characters.</span>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            validate: value => value === watch('password') || "Passwords don't match"
          })}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      </div>

      <div>
        <label>Role</label>
        <select {...register('role_id', { required: true })} onChange={handleRoleChange}>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
        {errors.role_id && <span>Role is required.</span>}
      </div>

      {storeFieldsVisible && (
        <>
          <div>
            <label>Store Name</label>
            <input
              {...register('storeName', { required: true, minLength: 3 })}
            />
            {errors.storeName && <span>Store Name is required and must be at least 3 characters.</span>}
          </div>

          <div>
            <label>Store Phone</label>
            <input
              {...register('storePhone', { required: true, pattern: /^(\+90|0)?5\d{2}\d{7}$/ })}
            />
            {errors.storePhone && < span>Store Phone is required and must be a valid Türkiye phone number.</span>}
          </div>

          <div>
            <label>Store Tax ID</label>
            <input
              {...register('storeTaxNo', { required: true, pattern: /^T\d{4}V\d{6}$/ })}
            />
            {errors.storeTaxNo && <span>Store Tax ID is required and must match the pattern "TXXXXVXXXXXX".</span>}
          </div>

          <div>
            <label>Store Bank Account</label>
            <input
              {...register('storeBankAccount', { required: true, pattern: /^TR\d{2}[0-9]{5}[0-9]{1,16}$/ })}
            />
            {errors.storeBankAccount && <span>Store Bank Account is required and must be a valid IBAN.</span>}
          </div>
        </>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;