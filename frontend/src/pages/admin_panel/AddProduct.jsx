import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [images, setImages] = useState([""]);
  const [product, setProduct] = useState({images: []})
  const navigate = useNavigate();

  useEffect(()=> {
    setProduct({...product, images: images})
  }, [images])

  function addProduct(e) {
    e.preventDefault()
    adminService
    .addProduct(product)
    .then(res => res.status)
    .then(status => {
      if (status == 200) {
        alert("Өнім сәтті қосылды")
        navigate("/admin")
      }
    })
  }

  return (
    <div className="flex justify-center flex-1">
      <div className="flex items-center flex-col space-y-3">
        <h1 className="text-2xl font-bold ">Жаңа өнімді қосыңыз</h1>
        <form className="flex flex-col space-y-3 border border-black p-3  " onSubmit={addProduct}>
          <div>
            <label htmlFor="">Өнім атауы </label>
            <input type="text" name="" id="" required placeholder="title" onChange={(e) => setProduct({...product, title: e.target.value})} />
          </div>

          <div className="flex items-start flex-col space-y-2">
            <label htmlFor="">Өнім сипаттамасы</label>
            <textarea
              name=""
              id=""
              required
              placeholder="description"
              className="w-full"
              onChange={(e) => setProduct({...product, description: e.target.value})}
            ></textarea>
          </div>

          <div>
            <label htmlFor="">Өнім бағасы</label>
            <input
              type="number"
              min={1}
              name=""
              id=""
              required
              placeholder="price"
              onChange={(e) => setProduct({...product, price: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Өнім санаты</label>
            <input
              type="text"
              name=""
              id=""
              required
              placeholder="category"
              onChange={(e) => setProduct({...product, category: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Өнімнің нобайы </label>
            <input
              type="url"
              name=""
              id=""
              required
              placeholder="thumbnail image url"
              onChange={(e) => setProduct({...product, thumbnail: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Өнім маркасы </label>
            <input
              type="text"
              name=""
              id=""
              required
              placeholder="brand"
              onChange={(e) => setProduct({...product, brand: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Өнім суреттері</label>

            <div className="flex flex-col space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input type="url" placeholder="image url" onChange={(e) => setImages((images) => {
                      const newImages = images.slice(0);
                      newImages[index] = e.target.value;
                      return newImages;
                  })} />
                  {images.length > 1 && (
                    <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))} className="text-red-500 font-bold px-2">✕</button>
                  )}
                </div>
              ))}

              <button className="text-white bg-black rounded p-2 self-center" onClick={() => setImages([...images, ""])}>
              Қосымша суреттер қосыңыз
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="">қанша бар</label>
            <input
              type="number"
              min={1}
              name=""
              id=""
              required
              placeholder="stock number"
              onChange={(e) => setProduct({...product, stock: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="">Жынысы</label>
            <select onChange={(e) => setProduct({...product, gender: e.target.value || null})}>
              <option value="">Таңдамау</option>
              <option value="male">Ерлер</option>
              <option value="female">Әйелдер</option>
            </select>
          </div>

          <div>
            <label htmlFor="">Жеңілдік пайызы (%) </label>
            <input
              type="number"
              min={0}
              max={99}
              name=""
              id=""
              placeholder="мысалы: 36"
              onChange={(e) => setProduct({...product, discount: e.target.value ? Number(e.target.value) : null})}
            />
          </div>

          <button type="submit" className="bg-black text-white p-3 rounded self-center">Өнім қосу</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
