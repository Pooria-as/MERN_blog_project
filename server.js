const express = require("express");
const connectToDatabase = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to Database
connectToDatabase();
// app.get("/", (req, res) => {
//   res.json("this is test json");
// });
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => console.log(`API running on port ${PORT} ...`));
