import React from 'react';
import { Link } from 'react-router-dom';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-8">

        {/* Лого и описание */}
        <div className="space-y-3">
          <img src="img/Logo.png" alt="Logo" width="180px" className="object-contain brightness-0 invert opacity-80" />
          <p className="text-sm text-gray-500 max-w-xs">Люкс тауарларының сенімді интернет-дүкені</p>
        </div>

        {/* Навигация */}
        <div className="space-y-3">
          <p className="text-white font-semibold text-sm">Навигация</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/products" className="hover:text-violet-400 transition-colors">Каталог</Link>
            <Link to="/confidential" className="hover:text-violet-400 transition-colors">Құпиялық саясаты</Link>
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-3">
          <p className="text-white font-semibold text-sm">Қолдау қызметі</p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:+77757004494" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <CallOutlinedIcon fontSize="small" />
              +7 775 700 44 94
            </a>
            <a href="https://web.whatsapp.com/" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <QuestionAnswerOutlinedIcon fontSize="small" />
              Бізге жазыңыз
            </a>
            <a href="mailto:shop@swiftness.kz" className="flex items-center gap-2 hover:text-violet-400 transition-colors">
              <EmailOutlinedIcon fontSize="small" />
              shop@swiftness.kz
            </a>
          </div>
        </div>

      </div>

      {/* Нижняя полоса */}
      <div className="border-t border-gray-800 px-6 py-4 text-center text-xs text-gray-600">
        © 2024 Swiftness Online Shop. Барлық құқықтар қорғалған.
      </div>
    </footer>
  );
}

export default Footer;
