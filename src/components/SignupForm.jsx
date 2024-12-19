import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const SignupForm = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      role_id: '1' // Customer role by default
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');

  useEffect(() => {
    // Fetch roles when component mounts
    api.get('/roles')
      .then(response => setRoles(response.data))
      .catch(() => setError('Failed to load roles'));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      // Format data based on role
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: parseInt(data.role_id)
      };

      // Add store data if store role is selected
      if (data.role_id === '2') {
        formData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.tax_no,
          bank_account: data.bank_account
        };
      }

      await api.post('/signup', formData);
      alert('You need to click link in email to activate your account!');
      navigate(-1);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
              }
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <select
            {...register('role_id')}
            className="w-full p-2 border rounded"
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {selectedRole === '2' && (
          <>
            <div>
              <label className="block mb-1">Store Name</label>
              <input
                type="text"
                {...register('store_name', { 
                  required: 'Store name is required',
                  minLength: { value: 3, message: 'Store name must be at least 3 characters' }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.store_name && <span className="text-red-500">{errors.store_name.message}</span>}
            </div>

            <div>
              <label className="block mb-1">Store Phone</label>
              <input
                type="tel"
                {...register('store_phone', { 
                  required: 'Store phone is required',
                  pattern: {
                    value: /^(\+90|0)?[0-9]{10}$/,
                    message: 'Please enter a valid Turkish phone number'
                  }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.store_phone && <span className="text-red-500">{errors.store_phone.message}</span>}
            </div>

            <div>
              <label className="block mb-1">Tax ID</label>
              <input
                type="text"
                {...register('tax_no', { 
                  required: 'Tax ID is required',
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: 'Tax ID must match pattern TXXXXVXXXXXX where X is a number'
                  }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.tax_no && <span className="text-red-500">{errors.tax_no.message}</span>}
            </div>

            <div>
              <label className="block mb-1">Bank Account (IBAN)</label>
              <input
                type="text"
                {...register('bank_account', { 
                  required: 'IBAN is required',
                  pattern: {
                    value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                    message: 'Please enter a valid Turkish IBAN'
                  }
                })}
                className="w-full p-2 border rounded"
              />
              {errors.bank_account && <span className="text-red-500">{errors.bank_account.message}</span>}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing up...
            </span>
          ) : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;