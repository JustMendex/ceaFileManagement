const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const xss = require("xss-clean");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "/upload"));
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.originalname
        .split(".pdf")[0]
        .split(" ")
        .join("-") +
        "-" +
        Date.now() +
        ".pdf"
    );
  },
});

const upload = multer({ storage: storage });

const globalErrorHandler = require("./controllers/errorController");

const everythingRouter = require("./routes/everythingRoutes");

const app = express();

app.enable("trust Proxy");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

//app.options('*', cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

//Disabled to run only on dev mode
// app.use(morgan('dev'));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(
  "/api/F893JG03VLKJ09C24V25",
  upload.fields([
    { name: "lettreConsultation", maxCount: 1 },
    { name: "reglementConsultation", maxCount: 1 },
    { name: "offresConcurrents", maxCount: 1 },
    { name: "pvOuverture", maxCount: 1 },
    { name: "bonCommande", maxCount: 1 },
    { name: "pvReception", maxCount: 1 },
    { name: "facture", maxCount: 1 },
  ]),
  everythingRouter
);

app.use("/pdf", express.static(__dirname + "/upload"));

app.use("/", express.static(__dirname + "/dist"));
app.all("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "./dist/") });
});

app.use(globalErrorHandler);

module.exports = app;
