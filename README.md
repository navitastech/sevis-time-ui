# Webapp
This is the source repository for the Node/Express (Website) application layer.

## Core Application Technologies
* [Node.js](https://nodejs.org/en/) (Javascript Framework)
* [Express.js](http://expressjs.com/) (Web Framework for Node.js)
* [npm](https://www.npmjs.com/) (Package Manager for Node.js)

## Core JavaScript Testing Technologies
* [Tap](https://www.npmjs.com/package/tap) (Unit Testing)
* [Istanbul](https://www.npmjs.com/package/istanbul) (Unit Testing / Code Coverage)
* [Proxyquire](https://github.com/thlorenz/proxyquire) (Unit Testing / Mocking)
* [nock](https://github.com/pgte/nock) (Unit Testing / Mocking)
* [Chai](http://chaijs.com/) (Unit Testing / Expectations and Assertions)

## Installation locally
1. Download and install [Node.js](https://nodejs.org/en/)
2. Clone the remote WebApp repository to your local development directory
3. Change directories to the root application directory: `cd {your-dev-dir}/webapp`
4. Run `npm install` to download all the dependent node.js packages

#Installation on an Amazon Linux
1. Follow instructions for http://iconof.com/blog/how-to-install-setup-node-js-on-amazon-aws-ec2-complete-guide/
2. Install pm2 instead of forever
3. Clone the remote WebApp repository in /opt
4. Cache the credentials: git config credential.helper store
5. Run a git pull (and enter credentials to cache them)
6. Copy script deploy_webapp.sh from root of /Navitas_Tech/webapp to /opt
7. Use the deploy_webapp.sh for ongoing automated deployments

## Running locally
1. Change directories to the root application directory: `cd {your-dev-dir}/{project}`
3. To start node using the "local" configuration: `NODE_ENV=local node ./bin/www`
4. To start node using the "development" configuration: `NODE_ENV=development node ./bin/www`
6. Access the application via any browser: http://localhost:3000

## Running under a Package Manager (PM2)
1. Install PM2: npm install pm2@latest -g
2. Change directories to the root application directory: `cd {your-dev-dir}/{project}`
3. Start the app using the package manager: pm2 start ./bin/www
4. Access the application via port 3000
5. Top the app using the package manager: pm2 stop www

## Running Unit Tests
The complete suite of unit tests can be executed by running the npm test script.  All unit tests must pass and the minimum unit test code coverage levels, as defined in the project .istanbul.yml file, must be met in order for a build to be successful.

    npm test

Individual unit test files can be executed as follows

    istanbul cover [relative-path-to-test-js-file]

Upon completion of the test execution, the console will report a summary of the code coverage.  A very detailed, HTML-based,
coverage report is also generated and can be viewed in any browser by navigating to the following file

    {your-dev-dir}/{project}/webapp/coverage/index.html

## Adding Packages
When adding packages please use the `--save` option to add to our list of dependencies in the package.json file. If you add a package please notify the team on SLACK that you have added a package so we can install the dependency on our local machines after syncing with the remote repository.
Using the `-g` option will install the package globally so that you will be able to execute it directly from the commandline.

    Example: npm install [NAME] -g --save
