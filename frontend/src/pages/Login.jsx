import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import UserContext from "../context/user";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from "../hooks/useTranslation";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { tr } = useTranslation();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    userService.login(credentials)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) { setLoading(false); updateUser(); navigate("/"); }
      })
      .catch((err) => {
        setError(err.message);
        setCredentials({ email: "", password: "" });
        setLoading(false);
      });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">{tr.welcome}</h1>
            <p className="text-sm text-gray-400 mt-1">{tr.loginSubtitle}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl">
              {error}. {tr.loginError}
            </div>
          )}

          <form className="space-y-4" onSubmit={submitForm}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{tr.email}</label>
              <div className="relative flex items-center">
                <EmailOutlinedIcon className="absolute left-3 text-gray-400" fontSize="small" />
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  disabled={loading}
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{tr.password}</label>
              <div className="relative flex items-center">
                <LockOutlinedIcon className="absolute left-3 text-gray-400" fontSize="small" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="············"
                  required
                  disabled={loading}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 mt-2"
            >
              {loading ? tr.loading : tr.loginBtn}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            {tr.noAccount}{" "}
            <Link to="/register" className="text-violet-600 font-semibold hover:underline">{tr.register}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
