import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import API from "../api/axios.config";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Registration() {
  const [credentials, setCredentials] = useState({ email: "", password: "", firstname: "", lastname: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post("/auth/register", credentials)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          setLoading(false);
          updateUser();
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.response?.data?.[0]?.msg || err.message);
        setCredentials({ email: "", password: "", firstname: "", lastname: "" });
        setLoading(false);
      });
  };

  return (
    <div className={`flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 ${loading ? "opacity-50" : ""}`}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Тіркелу</h1>
            <p className="text-sm text-gray-400 mt-1">Жаңа аккаунт жасаңыз</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl">
              {error}. Қайталап көріңіз!
            </div>
          )}

          <form className="space-y-4" onSubmit={submitForm}>
            <div className="flex gap-3">
              <div className="space-y-1 flex-1">
                <label className="text-sm font-medium text-gray-700">Аты</label>
                <div className="relative flex items-center">
                  <PersonOutlinedIcon className="absolute left-3 text-gray-400" fontSize="small" />
                  <input
                    type="text"
                    placeholder="Атыңыз"
                    required
                    disabled={loading}
                    value={credentials.firstname}
                    onChange={(e) => setCredentials({ ...credentials, firstname: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-1 flex-1">
                <label className="text-sm font-medium text-gray-700">Тегі</label>
                <div className="relative flex items-center">
                  <PersonOutlinedIcon className="absolute left-3 text-gray-400" fontSize="small" />
                  <input
                    type="text"
                    placeholder="Тегіңіз"
                    required
                    disabled={loading}
                    value={credentials.lastname}
                    onChange={(e) => setCredentials({ ...credentials, lastname: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Электрондық пошта</label>
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
              <label className="text-sm font-medium text-gray-700">Құпиясөз</label>
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
              <p className="text-xs text-gray-400">Кемінде 8 символ, бас әріп және сан болуы керек</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 text-white py-2.5 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 mt-2"
            >
              {loading ? "Жүктелуде..." : "Тіркелу"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Есептік жазбаңыз бар ма?{" "}
            <Link to="/login" className="text-violet-600 font-semibold hover:underline">
              Кіру
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
