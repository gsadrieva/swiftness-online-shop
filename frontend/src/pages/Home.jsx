import React, { useEffect, useState } from "react";
import productService from "../services/product.service";
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import { useTranslation } from "../hooks/useTranslation";
import { useNavigate } from "react-router-dom";

function Home() {
  const { tr } = useTranslation();
  const navigate = useNavigate();
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

      <div className="grid grid-cols-4 gap-4 py-8 px-6 bg-white rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <DeliveryDiningOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">{tr.delivery}</p>
          <p className="text-xs text-gray-400 text-center">{tr.deliveryDesc}</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <EventRepeatOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">{tr.returns}</p>
          <p className="text-xs text-gray-400 text-center">{tr.returnsDesc}</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <CheckCircleOutlineOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">{tr.guarantee}</p>
          <p className="text-xs text-gray-400 text-center">{tr.guaranteeDesc}</p>
        </div>
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-violet-50">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
            <RedeemOutlinedIcon fontSize="large"/>
          </div>
          <p className="font-bold text-gray-800 tracking-widest text-sm">{tr.giftWrap}</p>
          <p className="text-xs text-gray-400 text-center">{tr.giftWrapDesc}</p>
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
                { src: "/img/image.1.jpg", id: 2 },
                { src: "/img/image.2.jpg", id: 3 },
                { src: "/img/image.3.jpg", id: 4 },
                { src: "/img/image.4.jpg", id: 5 }
              ].map((item, i) => (
                <div key={i} onClick={() => item.id && navigate('/products/' + item.id)} className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer">
                  <div className="h-44 flex items-center justify-center p-5 bg-white">
                    <img src={item.src} alt="Tom Ford" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LUXURY BAGS - Michael Kors - розовый */}
        <div className="relative bg-gradient-to-r from-rose-50 to-pink-100 rounded-3xl overflow-hidden px-10 py-10">
          <div className="absolute right-0 top-0 w-64 h-64 bg-pink-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30"></div>
          <div className="relative">
            <p className="text-pink-400 text-xs tracking-[0.3em] uppercase mb-1">Luxury Bags</p>
            <h2 className="text-gray-800 text-2xl font-bold tracking-widest uppercase mb-8">Michael Kors</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { src: "/img/image.5.jpg", id: 9 },
                { src: "/img/image.11.jpg", id: 10 },
                { src: "/img/image.12.jpg", id: 11 },
                { src: "/img/image.13.jpg", id: 12 }
              ].map((item, i) => (
                <div key={i} onClick={() => item.id && navigate('/products/' + item.id)} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-pink-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="h-40 flex items-center justify-center p-4">
                    <img src={item.src} alt="Michael Kors" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LUXURY WATCHES - Cartier - жёлтый */}
        <div className="relative bg-gradient-to-r from-amber-50 to-yellow-100 rounded-3xl overflow-hidden px-10 py-10">
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
          <div className="relative">
            <p className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-1">Luxury Watches</p>
            <h2 className="text-gray-800 text-2xl font-bold tracking-widest uppercase mb-8">Cartier</h2>
            <div className="grid grid-cols-5 gap-4">
              {[
                { src: "/img/image.10.jpg", id: 14 },
                { src: "/img/image.6.jpeg", id: 13 },
                { src: "/img/image.7.jpg", id: 8 },
                { src: "/img/image.8.jpg", id: 7 },
                { src: "/img/image.9.jpg", id: 6 }
              ].map((item, i) => (
                <div key={i} onClick={() => item.id && navigate('/products/' + item.id)} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="h-44 flex items-center justify-center p-5">
                    <img src={item.src} alt="Cartier" className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500" />
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
