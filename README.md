[![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url] [![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MrSingh2000/chat-app">
    <img src="client/public/logo512.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Chatty :speech_balloon:</h3>

  <p align="center">
    A MERN stack based Chat application.
    <br />
    <a href="https://chatty001.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/MrSingh2000/chat-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/MrSingh2000/chat-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://chatty001.netlify.app)

This is a personal project based on mainly MERN stack. Tried to make a Chat application with various features, although there is always a scope to make the application better, So if you wanna add your taste to the existing application, feel free to fork the repo and just start working on your local machine!

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [NodeJS](https://nodejs.org/)
- [ExpressJS](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [MaterialUI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Set up the project locally on your system following instructions on setting up your project.
To get a local copy up and running, follow these simple steps.

### Prerequisites

Installing latest Package Manager

- npm
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  yarn install yarn@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MrSingh2000/chat-app.git
   ```
2. Install Backend & Frontend packages
   ```sh
   npm install
   ```
   ```sh
   cd .\client\ npm install
   ```
3. Setting up environment variables in `.env`

   `Backend`

   ```txt
   MONGODB_URI = 'my_mongodb_uri'
   JWT_SECRET = 'your_jwt_secret'
   AZURE_SAS_URL = 'azure_sas_url'
   AZURE_CONTAINER = 'azure_container_name'
   AZURE_CONNECTION_STRING = 'connection_string'
   ```

   `Frontend`

   ```txt
   REACT_APP_HOST = 'localhost:5000'
   ```

4. Start the server
   ```sh
   npm run server
   ```
5. Start the client application
   ```sh
   npm run client
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage
I tried to add various features to the Chat application, some of them are listed :-

#### Login / Signup
![login-signup]

#### Search Usernames and Add in contact List
![search_username]

#### Chat with Friends
![send_mess]

#### Change Profile Picture / Profile Status
![add_profile]

#### Check/add all status
![status]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Anshuman Singh - [@LinkedIn](https://www.linkedin.com/in/anshuman-singh-856991201/) - patialashahi2000@gmail.com

Project Link: [https://github.com/MrSingh2000/chat-app](https://github.com/MrSingh2000/chat-app)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/MrSingh2000/chat-app.svg?style=for-the-badge
[forks-url]: https://github.com/MrSingh2000/chat-app/network/members
[stars-shield]: https://img.shields.io/github/stars/MrSingh2000/chat-app.svg?style=for-the-badge
[stars-url]: https://github.com/MrSingh2000/chat-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/MrSingh2000/chat-app.svg?style=for-the-badge
[issues-url]: https://github.com/MrSingh2000/chat-app/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/anshuman-singh-856991201
[product-screenshot]: readme_assets/screenshot.png
[login-signup]: readme_assets/login.png
[search_username]: readme_assets/search_username.png
[send_mess]: readme_assets/send_mess.png
[add_profile]: readme_assets/add_profile.png
[status]: readme_assets/status.png

