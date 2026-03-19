import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    adminService
      .listProducts()
      .then((res) => res.data)
      .then((products) => setProducts(products));
  }, []);

  function saveProduct(e) {
    e.preventDefault();
    adminService
      .editProduct(product)
      .then((res) => res.status)
      .then((status) => {
        if (status == 200) {
          alert("Өнім сәтті өңделді");
          navigate("/admin");
        }
      });
  }

  return (
    <div className="flex justify-center flex-1">
      <div>
        {!product && <select
          name=""
          id=""
          onChange={(e) =>
            setProduct(products.find((p) => p.id == e.target.value))
          }
        >
          <option value="" disabled selected>
            Select the product
          </option>
          {products &&
            products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
        </select>}
      </div>
      {product && (
        <div className="flex items-center flex-col space-y-3">
          <h1 className="text-2xl font-bold ">Жаңа өнімді өңдеңіз</h1>
          <form
            className="flex flex-col space-y-3 border border-black p-3  "
            onSubmit={saveProduct}
          >
            <div>
              <label htmlFor="">Өнім атауы</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={product.title}
                placeholder="title"
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
            </div>

            <div className="flex items-start flex-col space-y-2">
              <label htmlFor="">Өнім сипаттамасы</label>
              <textarea
                name=""
                id=""
                required
                rows={5}
                placeholder="description"
                value={product.description}
                className="w-full"
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
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
                value={product.price}
                placeholder="price"
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="">Өнім санаты</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={product.category}
                placeholder="category"
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="">Өнімнің нобайы</label>
              <input
                type="url"
                name=""
                id=""
                value={product.thumbnail}
                required
                placeholder="thumbnail image url"
                onChange={(e) =>
                  setProduct({ ...product, thumbnail: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="">Өнім маркасы</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={product.brand}
                placeholder="brand"
                onChange={(e) =>
                  setProduct({ ...product, brand: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="">Өнім суреттері</label>

              <div className="flex flex-col space-y-2">
                {product.images.map((image, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="url"
                      placeholder="image url"
                      value={image}
                      onChange={(e) => {
                        const newImages = product.images.slice(0);
                        newImages[index] = e.target.value;
                        setProduct({...product, images: newImages});
                      }}
                    />
                    {product.images.length > 1 && (
                      <button type="button" onClick={() => setProduct({...product, images: product.images.filter((_, i) => i !== index)})} className="text-red-500 font-bold px-2">✕</button>
                    )}
                  </div>
                ))}

                <button
                  className="text-white bg-black rounded p-2 self-center"
                  onClick={() => setProduct({...product, images: [...product.images, ""]})}
                >
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
                value={product.stock}
                placeholder="stock number"
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="">Жынысы</label>
              <select
                value={product.gender || ""}
                onChange={(e) => setProduct({ ...product, gender: e.target.value || null })}
              >
                <option value="">Таңдамау</option>
                <option value="male">Ерлер</option>
                <option value="female">Әйелдер</option>
              </select>
            </div>

            <div>
              <label htmlFor="">Жеңілдік пайызы (%) — міндетті емес</label>
              <input
                type="number"
                min={1}
                max={99}
                name=""
                id=""
                value={product.discount ?? ""}
                placeholder="мысалы: 36"
                onChange={(e) =>
                  setProduct({ ...product, discount: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white p-3 rounded self-center"
            >
              Өнімді сақтау
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditProduct;

// "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": "549.00",
//     "category": "smartphones",
//     "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
//     "brand": "Apple",
//     "images": [
//       "https://cdn.dummyjson.com/product-images/1/1.jpg",
//       "https://cdn.dummyjson.com/product-images/1/2.jpg",
//       "https://cdn.dummyjson.com/product-images/1/3.jpg",
//       "https://cdn.dummyjson.com/product-images/1/4.jpg",
//       "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
//     ],
//     "stock": 94,
//     "rating": "4.69",
//     "discount_percentage": "12.96",
//     "inCart": false
