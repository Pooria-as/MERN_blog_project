const express = require("express");
const connectToDatabase = require("./config/db");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

//Connect to Database
connectToDatabase();

app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => console.log(`API running on port ${PORT} ...`));
