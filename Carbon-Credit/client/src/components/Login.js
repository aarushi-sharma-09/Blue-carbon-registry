import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { Turnstile } from '@marsidev/react-turnstile';


const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'buyer' });
  // const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState(null)
  const navigate = useNavigate();
  const SITE_KEY = process.env.REACT_APP_SITE_KEY || '1x00000000000000000000AA';
  const [showPassword, setShowPassword] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);
  const [showTestPrompt, setShowTestPrompt] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowTestPrompt(false), 10000); // Auto-hide after 10 sec
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    // if (!captchaToken) {
    //   alert('Please complete the CAPTCHA.');
    //   return;
    // }
    e.preventDefault();
    try {
      setLoadStatus(true);
      const response = await login({ ...formData });
      localStorage.setItem('token', response.data.access_token);

      const userRole = response.data.role;
      onLogin({ username: formData.username, role: userRole });

      navigate(userRole === 'NGO' ? '/NGO-dashboard' : userRole === 'buyer' ? '/buyer-dashboard' : '/auditor-dashboard');
    } catch (error) {
      setLoadStatus(false);
      if (error.status === 401) {
        setStatus(error?.response?.data?.message)
        setInterval(() => setStatus(null), 3000)
      } else if (error.status === 400) {
        alert(error?.response?.data?.message);
      } else {
        setStatus(error?.response?.data?.message)
        setInterval(() => setStatus(null), 3000)
      }

    }
  };

  return (
    <>
      {/* CHANGED: Background gradient to match the new blue theme. */}
      <div className="flex justify-center items-center py-12 px-4 w-full min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        {status && (

          <div className="flex fixed top-20 left-1/2 items-center py-2 px-4 text-white bg-red-500 rounded-lg shadow-lg transition-transform duration-300 transform -translate-x-1/2 animate-slideIn">

            <span>{status}</span>
          </div>
        )}

        {showTestPrompt && (
          <div className="flex fixed top-14 left-1/2 gap-4 items-center p-4 bg-white rounded-lg shadow-lg transform -translate-x-1/2">
            <span>Login as:</span>
            {/* CHANGED: Test button colors. */}
            <button
              className="py-1 px-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={() => {
                setFormData({ username: "test_buyer", password: "sepolia", role: "buyer" });
                setShowTestPrompt(false);
              }}
            >
              Test Buyer
            </button>
            <button
              className="py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              onClick={() => {
                setFormData({ username: "test_admin", password: "sepolia", role: "NGO" });
                setShowTestPrompt(false);
              }}
            >
              Test NGO
            </button>
          </div>
        )}

        <div className="w-full max-w-md rounded-xl shadow-xl bg-white/80 backdrop-blur-sm">
           {/* CHANGED: Inner form background color. */}
          <div className="p-8 rounded-xl shadow-lg bg-blue-50/90">
             {/* CHANGED: Heading text colors. */}
            <div className="mb-1 text-sm font-semibold tracking-wide text-indigo-700 uppercase">Welcome back</div>
            <h2 className="block mt-1 text-2xl font-medium leading-tight text-indigo-800">Login to your account</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div>
                 {/* CHANGED: Label text color. */}
                <label className="block mb-2 text-sm font-medium text-indigo-700" htmlFor="username">
                  Username
                </label>
                <input
                  // CHANGED: Input field border, focus, and background colors.
                  className="py-2 px-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-blue-100/50"
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-indigo-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="py-2 px-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-blue-100/50"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    // CHANGED: "Show/Hide" text color.
                    className="flex absolute inset-y-0 right-3 items-center text-indigo-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-indigo-700" htmlFor="role">
                  Role
                </label>
                <select
                  className="py-2 px-3 w-full rounded-lg border border-blue-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-blue-100/50"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="buyer">Buyer</option>
                  <option value="NGO">NGO</option>
                  <option value="auditor">Auditor</option>
                </select>
              </div>
              {/* <div> */}
              {/* <Turnstile */}
              {/* options={{ */}
              {/* theme: 'light', */}
              {/* }} */}
              {/* siteKey={SITE_KEY} */}
              {/* onError={() => alert('CAPTCHA failed Try again')} */}
              {/* onSuccess={(token) => setCaptchaToken(token)} */}
              {/* /> */}
              {/* </div> */}
              <div>
                <button
                  // CHANGED: Main login button color.
                  className="py-2 px-4 w-full font-semibold text-white bg-indigo-600 rounded-lg transition-colors duration-300 hover:bg-indigo-700"
                  type="submit"
                >
                  {loadStatus ? "Loading..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;