# kms-challenge

## Installation
Install Node.js and then run:
```bash
npm install
```
This will install all required packages.
To execute tests run:
```bash
npm run test:dev
npm run test:test
npm run test:prod
```
Depending on the environment you want to run tests against. You can change the app URL in the ".env" file.

Tests are stored in the tests folder. Inside the tests folder there is a "pages" folder where page objects are stored, and a "data" folder where test data is stored in JSON format.