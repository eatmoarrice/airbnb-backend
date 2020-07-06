var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config({ path: ".env" });

//dac biet ne

var indexRouter = require("./routes/index");

const experienceRouter = require(".//routes/experience");
const usersRouter = require("./routes/users"); // gắn link với sever
const reviewsRouter = require("./routes/reviews"); // gắn link với sever
const tagsRouter = require("./routes/tags");

var app = express();
var cors = require("cors");

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(usersRouter); // helloooooooo, this one must be change, nhìn phía trên sẽ thấy
app.use(reviewsRouter); // tương tự nè
app.use(experienceRouter);
app.use(tagsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// quan trọng
app.listen(5000, () => console.log(`example app`));
mongoose
	.connect(process.env.DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => console.log("connected to database"));

module.exports = app;
