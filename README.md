#NC-NEWS_KST

Hello and welcome to NC_NEWS_KST. This project is a news platform designed using a React front-end and a Node.js & Postgres SQL based back end.

Please follow this link to access the hosted version: https://nc-news-kst.herokuapp.com/

In order to clone your own version of this project, please use the following link to find the repository on GitHub where the files are located: https://github.com/MidknightMan/nc-news-kt

To install the dependencies, please run the command 'npm install' in your terminal once you have cloned the repository into your desired location. The required minimum version of Node.js needed to run this project is XX whilst the minimum version of Postgres required is XX.

To create a 'knexfile.js', the process environment must first be set up; this can be achieved by creating an environment variable ("ENV") and assigning it to default to development unless the NODE_ENV has already been specified. Once this has been setup, a configuration may be created by ensuring that this is an object containing the keys client, migrations and seeds. The client should be set as 'pg' to ensure that Postgres is used whilst the migrations and seeds should contain each a key whose value is set to the directory of the files. Configuration can then be tailored towards the different environments by creating a configuation object specifying which database the connection should be to. If using Linux, this is where the Postgres username and password should be input.

Seeding the local databases can be achieved by running the following commands:

1. 'npm run setup-dbs' - this will create the schema necessary to populate with the data.
2. 'npm run seed' - this will seed the data into the database created.

To run tests, please use the 'npm test' command. This will run the full suite of tests as specified in the 'app.spec.js' file; if you wish to run singular tests, please use a '.only' on the relevant it/describe block.
