import Logo from './logo';
import {supabase } from '../supabaseFolder/supabaseClient';
import { useState } from 'react';

async function fetchMedicalRecords(patientId, userId) {
  // 1. Fetch the sensitive data
  const { data, error } = await supabase
    .from('medical_records')
    .select('*')
    .eq('patient_id', patientId);

  if (error) {
    console.error('Error fetching records:', error);
    return null;
  }

  // 2. Log the read in compliance_logs
  await supabase.from('compliance_logs').insert({
    user_id: userId,
    patient_id: patientId,
    action: 'SELECT',
    details: 'User viewed medical_records'
  });

  return data;
}

async function secureSelect(table, filters, userId, patientId) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .match(filters);

  if (!error) {
    await supabase.from('compliance_logs').insert({
      user_id: userId,
      patient_id: patientId,
      action: 'SELECT',
      details: `User viewed ${table}`
    });
  }

  return { data, error };
}


const LoginForm = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username, // or MRN mapped to email in your backend
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in:", data.user.username);
      // redirect to dashboard or trigger 2FA flow
    }
  };


  
    return (
        <div className='login-container min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
           <div className = 'login-card bg-white shadow-lg rounded-xl w-full max-w-md p-8'>
            <div className='header flex justify-center flex-col items-center'>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign in</h2>
            <div className='flex items-center justify-center mb-6'>
                <Logo />
                <h1 className="text-2xl font-bold text-cyan-900">HealthSync</h1>
            </div>
            </div>
            <form className='space-y-5' onSubmit={handleLogin}>
                {/* Username */}
                <div>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>Username</label>
                    <input 
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                    </div>
                {/* Password */}
                <div>
                    <label
                    htmlFor='pasword'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                        Password
                        </label>
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type='password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                {/* Actions */}
                <div className='flex items-center justify-between text-sm'>
                    <label className='flex items-center gap-2'>
                        <input type='checkbox' className='h-4 w-4 text-blue-600' />
                        <span className='text-gray-600'>Remember me</span>
                    </label>
                    <a href='/forgot' className='text-blue-600 hover:underline'>
                    Forgot Password?
                    </a>

                </div>
                {/*Sign In Button */}
                <button type='submit' className='w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-500'>
                    Sign In
                </button>
                {/* 2FA Notice */}
                <p className='text-xs text-gray-500 mt-2'>2FA required after first login.</p>
            </form>
           </div>
        </div>
    )
}





export default LoginForm