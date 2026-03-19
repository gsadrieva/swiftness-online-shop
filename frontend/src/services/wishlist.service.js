import API from "../api/axios.config";

class WishlistService {
  getWishlist() {
    return API.get("/wishlist");
  }
  addToWishlist(id) {
    return API.post("/wishlist", { id });
  }
  removeFromWishlist(id) {
    return API.delete(`/wishlist/${id}`);
  }
}

export default new WishlistService();
