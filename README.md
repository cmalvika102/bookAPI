# BookStore API
Nodejs API to fetch and update book store entries

***
### Tech Stack and Concepts used:

* __Backend:__ Nodejs, Expressjs,
* __Database:__ MongoDB
* __Tools:__ Git
***

## Setting up the project
### Backend

1. Clone the repo

   ```sh
   git clone https://github.com/tend2infinity/etherscanAPI
   ```
2. Install NPM packages

   ```sh
   npm install
   ```
4. Create you own `Keys.js` in the root folder, specifying the MONGOURI like so,
   ```
   module.exports = {
       MONGOURI: '****',
     }
   ```

### Usage

1.  Start the server using nodemon in dev mode

    ```sh 
    nodemon app.js
    ```
    This will start your node application on port `5000` of your local machine.
2. Try hitting ```localhost:{PORT}/abc``` to check the response. If it is "/ works!" means we are good to go!

