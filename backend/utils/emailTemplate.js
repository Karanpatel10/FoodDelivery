// utils/emailTemplates.js

export const orderConfirmationEmail = (order) => {
    const itemsHtml = order.item.map(
        items => `<li>${items.name} x ${items.quantity} - $${items.price * items.quantity}</li>`
    ).join("");

    return `
    <div style="font-family: Arial; max-width: 600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <div style="text-align:center;">
            <img src="https://yourwebsite.com/logo.png" alt="Company Logo" style="width:150px;" />
        </div>
        <h2>Thank you for your order!</h2>
        <p>Order ID: <b>${order._id}</b></p>
        <p>Total: $${order.amount}</p>
        <h3>Items:</h3>
        <ul>${itemsHtml}</ul>
        <p>We will notify you once your order is shipped.</p>
        <a href="http://localhost:5173/myorder"<button>Track Order</button></a>
    </div>
    `;
};
