import React, { useEffect, useState } from "react";
import productService from "../services/product.service";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';

function Home() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getProducts()
      .then((response) => response.data)
      .then((data) => { setProducts(data); setLoading(false); })
      .catch((error) => { setError(error); setLoading(false); });
  }, []);

  return (
    <div className="flex-1 py-8 px-10">

      {/* Преимущества */}
      <div className="grid grid-cols-4 gap-4 py-8 px-6 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <DeliveryDiningOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">ЖЕТКІЗУ</p>
          <p className="text-xs text-gray-400 text-center">Тез жеткізу барлық қалаға</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <EventRepeatOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">ҚАЙТАРУ</p>
          <p className="text-xs text-gray-400 text-center">14 күн ішінде қайтару</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <CheckCircleOutlineOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">КЕПІЛДІК</p>
          <p className="text-xs text-gray-400 text-center">Ресмі тауарларға кепілдік</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <RedeemOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">СЫЙЛЫҚ ОРАУ</p>
          <p className="text-xs text-gray-400 text-center">Сыйлық орау қызметі</p>
        </div>
      </div>

      <div className="mt-10 space-y-16">

        {/* TOM FORD */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl overflow-hidden px-10 py-10">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%)'}}></div>
          <div className="relative">
            <p className="text-violet-400 text-xs tracking-[0.3em] uppercase mb-1">Luxury Eyewear</p>
            <h2 className="text-white text-2xl font-bold tracking-widest uppercase mb-8">Tom Ford</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://avvenice.com/83710/tom-ford-rizzo-sunglasses-square-acetate-sunglasses-ft0730-black-tom-ford-eyewear.jpg",
                "https://www.eyeons.com/images/catalog/products/tom-ford/ft0823-clark-28u-00.jpg",
                "https://optika-outlet.ru/assets/images/products/33979/849-52f-1.jpg",
                "https://avvenice.com/108927/tom-ford-slater-sunglasses-occhiali-da-sole-cat-eye-nero-ft0658-occhiali-da-sole-tom-ford-eyewear.jpg"
              ].map((src, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
                  <div className="h-44 flex items-center justify-center p-5 bg-white">
                    <img src={src} alt="Tom Ford" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MICHAEL KORS */}
        <div className="relative bg-gradient-to-r from-rose-50 to-pink-100 rounded-3xl overflow-hidden px-10 py-10">
          <div className="absolute right-0 top-0 w-64 h-64 bg-pink-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
          <div className="relative">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-1">Luxury Bags</p>
            <h2 className="text-gray-800 text-2xl font-bold tracking-widest uppercase mb-8">Michael Kors</h2>
            <div className="grid grid-cols-5 gap-4">
              {[
                "https://www.usmagazine.com/wp-content/uploads/2019/02/Michael-Kors-Bag-Green.jpg?w=1000&quality=86&strip=all",
                "https://ak1.ostkcdn.com/images/products/10878042/Michael-Michael-Kors-Cindy-Black-Gold-Saffiano-Leather-Dome-Handbag-13ef9e7c-1d1d-4181-a140-f8e344b79d98.jpg",
                "http://www.panchemodan.ru/upload/iblock/10f/10fa5e64b402ef70050698378c7d91fa.jpg",
                "https://cdn.store-assets.com/s/395847/i/56767924.png",
                "https://i1.adis.ws/i/forzieri/ik130415-110-00-1x-t"
              ].map((src, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-pink-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="h-40 flex items-center justify-center p-4">
                    <img src={src} alt="Michael Kors" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARTIER */}
        <div className="relative bg-gradient-to-r from-amber-50 to-yellow-100 rounded-3xl overflow-hidden px-10 py-10">
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
          <div className="relative">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-1">Luxury Watches</p>
            <h2 className="text-gray-800 text-2xl font-bold tracking-widest uppercase mb-8">Cartier</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://storage.yandexcloud.net/cdn-prod.viled.kz/v3/original/230152s7rom.jpeg",
                "https://miojewelry.com/wp-content/uploads/2016/07/Cartier-Ballon-Bleu-Silver-Dial-Alligator-Leather-Diamond-Mens-Watch-WE902056.jpg",
                "https://storage.yandexcloud.net/cdn-prod.viled.kz/v3/original/175604Zhg54.jpg",
                "https://storage.yandexcloud.net/cdn-prod.viled.kz/v3/original/269022NjgYf.jpg"
              ].map((src, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="h-44 flex items-center justify-center p-5">
                    <img src={src} alt="Cartier" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
