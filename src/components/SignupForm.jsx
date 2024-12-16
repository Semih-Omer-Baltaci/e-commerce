import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom';

// Create axios instance
const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

const SignupForm = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useHistory().use();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      role_id: '2' // Customer role as default
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');

  useEffect(() => {
    api.get('/roles')
      .then(res => setRoles(res.data))
      .catch(err => console.error(err));
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };

      if (data.role_id === '3') { // Store role
        formData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_no,
          bank_account: data.store_bank_account
        };
      }

      await api.post('/signup', formData);
      alert('You need to click link in email to activate your account!');
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label>Name</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' }
          })}
          className="w-full border p-2"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div className="mb-4">
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full border p-2"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div className="mb-4">
        <label>Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character'
            }
          })}
          className="w-full border p-2"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>

      <div className="mb-4">
        <label>Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: value => value === password || 'Passwords do not match'
          })}
          className="w-full border p-2"
        />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
      </div>

      <div className="mb-4">
        <label>Role</label>
        <select {...register('role_id')} className="w-full border p-2">
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>

      {selectedRole === '3' && (
        <>
          <div className="mb-4">
            <label>Store Name</label>
            <input
              {...register('store_name', {
                required: 'Store name is required',
                minLength: { value: 3, message: 'Store name must be at least 3 characters' }
              })}
              className="w-full border p-2"
            />
            {errors.store_name && <span className="text-red-500">{errors.store_name.message}</span>}
          </div>

          <div className="mb-4">
            <label>Store Phone</label>
            <input
              {...register('store_phone', {
                required: 'Store phone is required',
                pattern: {
                  value: /^(\+90|0)?[0-9]{10}$/,
                  message: 'Invalid Turkish phone number'
                }
              })}
              className="w-full border p-2"
            />
            {errors.store_phone && <span className="text-red-500">{errors.store_phone.message}</span>}
          </div>

          <div className="mb-4">
            <label>Tax ID</label>
            <input
              {...register('store_tax_no', {
                required: 'Tax ID is required',
                pattern: {
                  value: /^T\d{4}V\d{6}$/,
                  message: 'Invalid Tax ID format (TXXXXVXXXXXX)'
                }
              })}
              className="w-full border p-2"
            />
            {errors.store_tax_no && <span className="text-red-500">{errors.store_tax_no.message}</span>}
          </div>

          <div className="mb-4">
            <label>Bank Account (IBAN)</label>
            <input
              {...register('store_bank_account', {
                required: 'IBAN is required',
                pattern: {
                  value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                  message: 'Invalid IBAN format'
                }
              })}
              className="w-full border p-2"
            />
            {errors.store_bank_account && <span className="text-red-500">{errors.store_bank_account.message}</span>}
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;