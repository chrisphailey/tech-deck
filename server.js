const express = require('express')
const app = express();

const path = require("path");
const helpers = require('./utils/helpers');


// Sequelize
const sequelize = require("./config/connection");

// Handlebars templates
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });
// Set the handlebars engine
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Session Cookies
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(session(sess));

// Routes
app.use(require("./controllers/index"));

// Database and Server
const PORT = process.env.PORT || 3001;
// Make sure force: false when dev is done
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
});
