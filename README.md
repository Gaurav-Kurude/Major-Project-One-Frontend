# MyShoppingSite — E-Commerce Web Application

MyShoppingSite is a full-stack e-commerce web application built using React, React Router, Bootstrap, Node.js, Express.js, and MongoDB.
The application allows users to browse products, search and filter products, manage their wishlist and cart, add delivery addresses, complete checkout, and view their orders and profile.

---
## Demo Link

[Live Demo](https://major-project-one-frontend-sage.vercel.app/)

---

## Quick Start

```
git clone https://github.com/Gaurav-Kurude/Major-Project-One-Frontend.git
cd Major-Project-One-Frontend
npm install
npm run dev 
```

---
## Technologies
- React JS
- React Router
- Node Js
- Express
- MongoDB

---

## Demo Video 
Watch a walkthrough (3-5 minutes) of all major features of this app:
[Loom Video Link](https://drive.google.com/file/d/1eZJjW11gB6rJBhvtSSfLngGFJbTZDyqo/view?usp=sharing)

---

## Features
**Home**
- Display a list of all products
- Users can search for products using the search functionality

**Product Details**
- View full product information(Description, Price, Discount, Rating, Quantity, Image)
- Buttons to add to cart "Add to Cart" & add to wishlist "Wishlist"

**Profile**
- View personal Details of user like Name, Email & Contact No.
- Have buttons to see order history & manage address.

---

## Api Reference

### **GET /api/products**<br>
List all Products<br>
Sample Response:<br>
```
[{_id, productImage, productName, ...}, ...]
```

### **GET /api/products/:id**<br>
Get details for one product<br>
Sample Response:<br>
```
{_id, productImage, productName, ...}
```

### **GET /api/categories**<br>
Get Product of specific category<br>
Sample Response:<br>
```
[{_id, productImage, productName, ...}, ...]
```

### **GET /api/categories/:categoryId**<br>
Get Products of specific category<br>
Sample Response:<br>
```
{_id, productImage, productName, ...}
```

### **POST /api/products**<br>
Create a new product<br>
Sample Response:<br>
```
[{_id, productImage, productName, ...}, ...]
```

### **POST /api/orders**<br>
Create a new product order<br>
Sample Response:<br>
```
{ "address": {
      "name": "John Doe",
      "phone": "94200*****",
    },...} 
```

### **Get /api/orders**<br>
Get a products order<br>
Sample Response:<br>
```
[{ "address": {
      "name": "John Doe",
      "phone": "94200*****",
    },...} ...]
```

### **DELETE /api/orders/:id**<br>
Delete a specific product order<br>
Sample Response:<br>
```
{ "address": {
      "name": "John Doe",
      "phone": "94200*****",
    },...} 
```
## Contact
For bugs or feature requests, please reach out to gauravkurude.sitmech@gmail.com