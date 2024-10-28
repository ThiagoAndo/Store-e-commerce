<center><h1> Multi REST API's web application </h1> </center> </br><p align="center"> <img width="300" src="assets/cart.svg"></p>
  
<div style="text-align: justify">
The Next Online Shopping is a modern, full-stack e-commerce web application built to showcase a professional approach to online shopping platforms. I Developed it using React JS, Next JS, Node JS, and Express JS, this project highlights a range of skills, from interactive front-end development to efficient back-end  <a href="https://github.com/ThiagoAndo/rest-countries-api-with-color-theme-switcher-master.git">API</a>. Users is be able to: management. Designed with user experience at its core, the platform is optimized for ease of use, enabling smooth navigation, intuitive product browsing, and streamlined order processing. By leveraging local storage and a robust API (<a href="https://github.com/ThiagoAndo/rest-countries-api-with-color-theme-switcher-master.git">Next-store-API</a>), this application provides a seamless shopping experience that’s fast, responsive, and capable of scaling with user demand.
</div>

## Table of contents

- [Overview](#overview)
  - [Key Features](#built-using)
  - [Flowchart](#flowchart)
  - [Screenshot](#screenshot)
- [Local development](#local-development)
  - [Instructions](#instructions)
  - [Test](#🧪-test)
  - [Useful resources](#useful-resources)
- [Author and alive web site links](#author)



## Overview

### Key Features

<div style="text-align: justify">
  <ul>
    <li>
      <span style="font-weight:bold">Responsive Design:</span> A mobile-friendly layout ensuring smooth navigation across all devices.
    </li>
     <li>
      <span style="font-weight:bold">User-Friendly Interface:</span> An intuitive design makes searching, viewing, and selecting products easy and engaging.
    </li>
     <li>
      <span style="font-weight:bold">Local Storage Integration: </span>  Provides a continuous shopping experience by saving the user’s preferences and cart details.
    </li>
     <li>
      <span style="font-weight:bold"><a href="https://github.com/ThiagoAndo/rest-countries-api-with-color-theme-switcher-master.git">Backend API:</a></span> A custom-built API to handle user authentication, product management, and order processing.
    </li>
     <li>
      <span style="font-weight:bold">Efficient State Management:</span> Use of local storage and modern libraries to manage state effectively.
    </li>
</ul>
</div>


### User is be able to:

<div style="text-align: justify">
  <ul>
    <li>
      <span style="font-weight:bold">Register a New User:</span> Users can create an account to access personalized features.
    </li>
     <li>
      <span style="font-weight:bold">Update User Information:</span>Easily modify profile details as needed.
    </li>
     <li>
      <span style="font-weight:bold">View All Products: </span>  Browse through a comprehensive list of available products.
    </li>
     <li>
      <span style="font-weight:bold">View Product Details:</span>  Access in-depth information for individual products.
    </li>
     <li>
      <span style="font-weight:bold">Filter Products by Name:</span> Quickly find products using search functionality.
    </li>
     <li>
      <span style="font-weight:bold">Filter Products by Category:</span> Sort products by category for easier navigation.
    </li>
     <li>
      <span style="font-weight:bold">Add Products to Cart:</span> Save items for later purchase with a simple click.
    </li>
     <li>
      <span style="font-weight:bold">Purchase a Product: </span> Complete transactions seamlessly within the app.
     <li>
      <span style="font-weight:bold">Guest Checkout:</span>  Allows users to make purchases without creating an account.
    </li>
     <li>
      <span style="font-weight:bold">Check Purchase History</span> View past transactions for tracking orders.
    </li>
   
</ul>
</div>

### Built using

- Next JS
- Redux toolkit
- Framer motion
- useContext API
- Keen-slider


### Flowchart

<br />
<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/Multi-API.png" alt="Mobile Version Picture">
</p>
<br />
<br />
<br />
## Screenshot

<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/home.png" alt="Mobile Version Picture">
     <figcaption>Fig.1 - Home page</figcaption>
</p>
<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/countrySearch.png" alt="Mobile Version Picture">
     <figcaption>Fig.2 - Input search</figcaption>
</p>
<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/countryFilter.png" alt="Mobile Version Picture">
     <figcaption>Fig.2 - Input fielter</figcaption>
</p>

<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/expanded.png" alt="Mobile Version Picture">
     <figcaption>Fig.3 - Country detailed</figcaption>
</p>

<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/countySearch.png" alt="Mobile Version Picture">
     <figcaption>Fig.4 - Irish counties input search</figcaption>
</p>

<br />
<br />
<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/countyFilter.png" alt="Mobile Version Picture">
     <figcaption>Fig.5 - Irish counties input filter</figcaption>
</p>
<br />
<br />

<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/full.png" alt="Mobile Version Picture">
     <figcaption>Fig.5 -Full forecast application</figcaption>
</p>
</br>
</br>
<p align="center" style="solid 1px red">
    <img  src="assets/screenshots/error.png" alt="Mobile Version Picture">
     <figcaption>Fig.6 -Error page</figcaption>
</p>
<br />
<br />
<br />
<img align="right" src="https://i.ibb.co/CJfW18H/ship.gif" width="200"/>

## Local development

To run the project from a container, ensure that Node.js (version 14 or higher)
and npm (version 7 or higher) are installed on your development machine.

### Instructions

- Fork this repository
- Clone your forked repository
- CD into the project folder
- Sing up to Geoapify, TimeZoneDB and OpenWeather APIs to optain your user keys. They all provide free services.
- Create a `.env` file in the root directory with those variables:

```shell
VITE_GEOPIFY= your Geoapify key
VITE_TIME_ZONE_KEY= your TimeZoneDB key
VITE_WEATHER_SECRETE_KEY= your OpenWeather key
```

To install the application:

```shell
npm install
```

To start the development server:

```shell
npm run dev
```

### 🧪 Test

After the project is installed and running, you can simulate accessing the application from abroad using Git by running the following command:

```shell
git checkout 68cedd3
```

Or if you want simulate accessing the application from a remote Irish countie run:

```shell
git checkout 272f4ad
```

## Author

- Github - [Thiago Ando de Freitas](https://github.com/ThiagoAndo)
- Personal website - [Portfolio](https://thiago-freitas-portfolio.vercel.app/)
- Alive Website - [rest-countries-api](https://rest-mult-api.netlify.app)

<hr />

 <div style="text-align: center" >
<h5 style="color:black;">"The impediment to action advances action. What stands in the way becomes the way"</h5>
<h5 style="color:black;">Marcus Aurelius </h5>
</div>
