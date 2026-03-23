# Online Shop

**Современный брендовый интернет-магазин с системой рассрочки**  
*React + Express + PostgreSQL*

---

## 📋 О проекте

Swiftness Online Shop — полноценное e-commerce приложение с каталогом люксовых товаров. Пользователи могут просматривать товары, добавлять в корзину и избранное, оформлять заказы с рассрочкой и отслеживать историю покупок.

---

## 🛠 Технологический стек

| Слой | Технологии |
|------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6, Axios, MUI Icons, Swiper |
| Backend | Node.js, Express, Passport.js, express-validator |
| База данных | PostgreSQL |

---

## 🚀 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/gsadrieva/swiftness-online-shop.git
cd swiftness-online-shop
```

### 2. Запустить backend
```bash
cd backend
npm install
npm start
```

### 3. Запустить frontend
```bash
cd frontend
npm install
npm run dev
```

- **Frontend**: http://localhost:5173  
- **Backend API**: http://localhost:8000

## 📁 Структура проекта

```
swiftness-online-shop/
├── frontend/
│   ├── public/img/          # Картинки товаров
│   └── src/
│       ├── pages/           # Home, Products, ProductDetails, Cart, Checkout, Purchases, Wishlist, Login, Registration
│       ├── components/      # Header, Footer, ProductCard, CartProduct, OrderCard
│       ├── services/        # axios-сервисы (product, cart, order, wishlist, user)
│       ├── context/         # UserContext, CartContext, LanguageContext
│       ├── hooks/           # useTranslation
│       └── i18n/            # translations.js (kz / ru / en)
└── backend/
    └── src/
        ├── routes/          # products, cart, order, wishlist, auth
        └── repositories/    # Product, Cart, Order, User, Wishlist
```

---

## ✨ Функциональность

### Главная страница
- Секции брендов: Tom Ford, Michael Kors, Cartier
- Клик по картинке → страница товара
- Блок преимуществ (доставка, возврат, гарантия, подарочная упаковка)

### Каталог
- Фильтрация по категориям
- Фильтр по полу (Ерлер / Әйелдер)
- Фильтр только со скидками (toggle)
- Слайдер цены от 0 до 1 000 000 ₸
- Смена фото при наведении на карточку

### Корзина
- Добавление / удаление товаров
- Изменение количества
- Выбор плана рассрочки

### 💳 Рассрочка
| План | Описание |
|------|----------|
| Бірден төлеу | Полная оплата сразу |
| 0-0-3 | Равными частями на 3 месяца |
| 0-0-6 | Равными частями на 6 месяцев |
| 0-0-12 | Равными частями на 12 месяцев |
| 0-0-24 | Равными частями на 24 месяца |

### 📦 Заказы
- История всех заказов
- Отображение плана рассрочки
- Кнопка «Қайталау» — повторить заказ
- Уменьшение остатка stock при оформлении

### ❤️ Избранное
- Добавление через иконку сердечка на карточке
- Отдельная страница `/wishlist`

### 🔐 Авторизация
- Регистрация и вход (сессии через Passport.js)
- Роль `user` — покупатель
- Роль `admin` — добавление, редактирование, удаление товаров

### 🌐 Мультиязычность
- Казахский (по умолчанию), Русский, English
- Переключатель KZ / RU / EN в хедере
- Язык сохраняется в localStorage

### 📱 Адаптивность
- Мобильное меню (бургер)
- Адаптивные сетки на всех страницах

---
## License
This portfolio is licensed under the [MIT License](LICENSE) © 2026 gsadrieva



