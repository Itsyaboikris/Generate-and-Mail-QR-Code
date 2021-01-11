import express, {Application} from "express";
import {homedir} from "os";
import path from "path";

require("dotenv").config();
const cors = require("cors");
const app : Application = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cors());
app.use("/static", express.static(path.join(homedir(), "uploads")));


const port = process.env.NODE_PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));

