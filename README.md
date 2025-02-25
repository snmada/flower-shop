# Flower Shop - Online Flower Store

**Flower Shop** is a fictional e-commerce web application that simulates the shopping experience of an online flower store. 

Built using **Next.js**, it invites customers to explore a variety of floral products, search for particular items, apply filters based on preferences, and sort by different criteria. These advanced search features simplify the process of finding the desired products and adding them to the cart.

The appearance of the application is contoured by **Tailwind CSS** and **shadcn/ui**. Thanks to this dream team, the design receives a modern touch.

For efficient data storage and management, **PostgreSQL** and **Prisma ORM** work in harmony, while vibrant product images are securely stored in **AWS S3**.

Additionally, the application provides an interface for the admin to easily perform CRUD operations on products.  

## Table of Contents

1. [Features](#1-features)
2. [Technologies Used](#2-technologies-used)
3. [Getting Started](#3-getting-started)
4. [Running The Project](#4-running-the-project)
5. [UI Overview](#5-ui-overview)
6. [Credits](#6-credits)

## 1. Features

### Customer Features:
- Browse a wide range of floral products.
- Search for specific items.
- Apply filters based on preferences (category, flowers, and price range).
- Sort products by various criteria (price: low to high, high to low; name: A-Z, Z-A).
- Add items to the cart, adjust quantities, or remove products as needed.
- View a comprehensive order summary with itemized costs and the total amount.

### Admin Features:
- Perform CRUD operations on products.
- Highlight three products to be displayed in the 'Discover' section on the landing page.

## 2. Technologies Used

### Framework & Language
- **Next.js 15 with App Router**
- **TypeScript**

### Styling
- **Tailwind CSS**
- **shadcn/ui**

### Database & ORM
- **PostgreSQL**
- **Prisma**

### Cloud Storage
- **AWS S3**

## 3. Getting Started

### Prerequisites

1. **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/). 
2. **PostgreSQL**: Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/). 
3. **AWS S3**: Create and configure an S3 bucket for image storage. Visit the AWS S3 Documentation from [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) for detailed instructions.

### Clone the Repository
Clone the repository to your local machine using the following command:

  ```bash
  git clone https://github.com/snmada/flower-shop.git
  cd flower-shop
  ```
### Set Up Environment Variables

1. Create a `.env` file in the root directory.
2. Find the `.env.example` file and copy its content.
3. Open your new `.env` file and paste the copied data.
4. Replace the placeholder values with your actual credentials.

## 4. Running The Project

**Important:** This project uses the `pnpm` package manager. Please ensure you have `pnpm` installed before proceeding with the installation of dependencies.

- Install dependencies:

  ```bash
  pnpm install
  ```
- Run database migrations:

  > Reminder: Before running migrations, double-check that `DATABASE_URL` in your `.env` file has been updated with your current database connection string.

  ```bash
  npx prisma migrate dev
  ```

- Seed the database:

  ```bash
  npx prisma db seed
  ```

- Start the development server:

  ```bash
  pnpm run dev
  ```

  You can view the application at `https://localhost:3000` (or another port if configured).

### Optional: Open Prisma Studio to Inspect Your Database
If you want to explore your database visually, you can open Prisma Studio. This tool provides a GUI that makes it easy to perform CRUD operations.

To launch Prisma Studio, run the following command:
  ```bash
  npx prisma studio
  ```

Prisma Studio will open in your default web browser, typically at `https://localhost:5555`.

## 5. UI Overview

This section provides an overview of the application's user interface.

### Landing Page

- Hero Section

![Hero Section](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/hero.jpg?raw=true)

- Discover Section

The Discover Section showcases three products selected by the admin to highlight the best floral arrangements.

![Discover Section](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/discover.jpg?raw=true)

### Products Page

The Products Page displays floral products in a grid layout. Each product includes an image, name, price, category, and an 'Add to cart' button. Users can search for specific products by name and apply filters based on preferences (category, flowers, and price range). They can also sort products by price (low to high, high to low) or alphabetically (A-Z, Z-A).

![Products Page](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/products.jpg?raw=true)

### Cart Page

The Cart Page shows selected products along with their details, including image, name, price, and quantity. Users can adjust quantities, remove items, and view an order summary with itemized costs and the total amount.

![Cart Page](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/cart.jpg?raw=true)

### Admin - All Products

The Admin - All Products Page features a table listing all products. Each row includes an 'Actions' button that reveals options for viewing item details, updating the item, or deleting it. Admin can filter products by category or search for specific items using the search bar. Additionally, there is an 'Add New Product' button for quickly adding new items to the inventory.

![Admin All Products](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-all-products.jpg?raw=true)

### Admin - Add Products

The Admin - Add Products Page includes a form that allows the admin to add new products to the inventory. The form requires essential product details such as name, price, stock, description, category, flowers, and a representative image. 

![Admin Add Product](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-add-product.jpg?raw=true)

### Admin - Product Details

The Admin - Product Details dialog displays information about a selected product.

![Admin Product Details](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-product-details.jpg?raw=true)

### Admin - Update Product

The Admin - Update Product Page includes a pre-filled form with existing product details that allows the admin to modify information.

![Admin Update Product](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-update-product.jpg?raw=true)

### Admin - Delete Product

Before a product is deleted, a confirmation dialog appears asking the admin to confirm the action to prevent accidental deletions.

![Admin Delete Product](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-delete-product.jpg?raw=true)

### Admin - Featured Products

The Admin - Featured Products Page displays the currently highlighted products. The admin has the capability to edit the top three items. Any changes made will be reflected in the 'Discover' section.

![Admin Featured Products](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-featured-products.jpg?raw=true)

- Edit Mode

![Admin Edit Featured Products](https://github.com/snmada/flower-shop/blob/main/assets/screenshots/admin-edit-featured-products.jpg?raw=true)

## 6. Credits

A warm thank you to the talented photographers whose work enhances the visual experience.

- Hero Image: Photo by <a href="https://unsplash.com/@evieshaffer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Evie S.</a> on <a href="https://unsplash.com/photos/pink-petaled-flowers-lJKzqr36EoE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Bouquet A: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-person-holding-flowers-lWURG_uq0rQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet B: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-bouquet-of-flowers-sB2GGXuivng?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet C: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-woman-holding-a-bouquet-of-flowers-ixh2zBIprYU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet D: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-person-holding-flowers-ELh61YVEWIA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet E: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-bouquet-of-red-roses-KWto6Q_o1Hs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet F: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-hand-holding-a-bouquet-of-flowers-hWQ2gLoQwng?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
- Bouquet G: Photo by <a href="https://unsplash.com/@volodin28?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Viacheslav Volodin</a> on <a href="https://unsplash.com/photos/a-bouquet-of-flowers-_KtsyxNNla8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>