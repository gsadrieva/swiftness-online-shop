import pool from "../db.mjs";

class OrderRepository {
  static async createOrder(user, products, order) {
    const newOrder = (await pool.query(
      "INSERT INTO orders (user_id, address, delivery_time, payment_method, installment_months) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user.id, order.address, order.deliveryTime, order.paymentMethod, order.installmentMonths ?? null]
    )).rows[0];
    const query =
      "INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    await Promise.all(
      products.map((product) =>
        pool.query(query, [
          newOrder.id,
          product.id,
          product.quantity,
        ])
      )
    );
    const orderDetails = (await pool.query(
      "select * from order_details where order_id = $1", [newOrder.id])).rows;
    return  {...newOrder, products: orderDetails };
  }

  static async getOrders(user) {
    const orders = (await pool.query("select * from orders where user_id = $1", [user.id])).rows;
    const orderDetails = (await pool.query(
      `SELECT
    o.id,
    od.product_id,
    od.quantity,
    p.title,
    p.price,
    p.thumbnail
FROM
    orders o
JOIN
    order_details od ON o.id = od.order_id
JOIN
    products p ON od.product_id = p.id
JOIN
    users u ON o.user_id = u.id
WHERE
    u.id = $1`,
      [user.id]
    )).rows;

    const result = orders.map(order => {
      const details = orderDetails.filter(orderItem => orderItem.id == order.id)
      const totalPrice = details.reduce((acc, item) => acc + item.price * item.quantity, 0);
      return {
       ...order,
       totalPrice,
       products: details
      }
    })

    return result;
  }
}

export default OrderRepository;
