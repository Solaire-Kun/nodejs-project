# nodejs-project

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#languages-used">Languages Used</a></li>
    <li><a href="#contact-me">Contact Me</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

A custom API of an imaginary online product store for [start2impact](https://www.start2impact.it) project. <br>
You are an administrator, you can manage, create, update, users, products and orders.

<!-- USAGE -->
## Usage

- **Download this repository**
- **Open this project on [Visual Studio Code](https://code.visualstudio.com)**
- **Go to repository folder where you downloaded**
- **Open console in Visual Studio Code and type ```npm i```**
- **We will use [Postman](https://www.postman.com)**
- **Download Postman Desktop Agent to allow the website access to localhost**
<br>

- **How to create a User:**
```
{
    "name": "Name of the user",
    "lastName": "Last name of the user",
    "email": "Email of the user"
}
```

- **How to create an Product:**
```
{
    "productName": "Name of the product",
    "size": "Size of the Product",
    "brand": "Brand of the Product",
    "pictures": "Pictures of this Product"
}
```

- **How to create an Order:**
```
{
    "productId": ["ID of an existing Product 1", "ID  of an existing Product 2"],
    "userId": ["ID of an existing User 1", "ID of an existing User 2"]
}
```
you can put as many Products/Users you like.

- **How to update anything:** <br>
Simply do a **PATCH** request to localhost:300/users/ID OR /products/ID OR /orders/ID ... <br>
Then if you want to update an User name for example do the following:
```
{
    "name": "NEW NAME"
}
```
and send the request.

- **How to delete anything:** <br>
Simply do a **DELETE** request to localhost:300/users/ID OR /products/ID OR /orders/ID ... <br>
for example if you want to delete an User: ```localhost:300/users/6357ebfb2690f2d097817df1```

- **How to upload a picture:** <br>
To upload a picture make a **POST** request to localhost:300/upload, click in form-data in postman change the Key Text to File and upload 2 pictures and send.

<!-- LANGUAGES USED -->
## Languages Used

- **Node.js**
- **Express**
- **Mongoose**
- **Multer**

<!-- CONTACT -->
## Contact Me

[Send Email](mailto:vinciguerrawork03@hotmail.com) <br>
[Project Link](https://github.com/Solaire-Kun/nodejs-project)