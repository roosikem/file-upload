import express from "express";
import bodyParser from "body-parser";
import { uploadFileController } from "./controllers/fileUploadController.js";

const app = express();
app.use(bodyParser.json());

app.post("/upload-file", uploadFileController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});