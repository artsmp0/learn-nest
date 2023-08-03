const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(process.cwd(), "my-uploads");
    try {
      fs.mkdirSync(filePath);
    } catch (error) {}
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploader = multer({ dest: "uploads/", storage });

app.post("/aaa", uploader.single("aaa"), function (req, res, next) {
  console.log("req.file", req.file);
  console.log("req.body", req.body);
});

app.post(
  "/bbb",
  uploader.array("bbb", 2),
  (req, res, next) => {
    console.log("req.files", req.files);
    console.log("req.body", req.body);
  },
  // 在 express 里，约定有 4 个参数的中间件为错误处理中间件。
  (err, req, res, next) => {
    if (
      err instanceof multer.MulterError &&
      err.code === "LIMIT_UNEXPECTED_FILE"
    ) {
      res.status(400).end("Too many files uploaded");
    }
  }
);

app.post(
  "/ccc",
  uploader.fields([
    { name: "aaa", maxCount: 3 },
    { name: "bbb", maxCount: 2 },
  ]),
  function (req, res, next) {
    console.log("req.files", req.files);
    console.log("req.body", req.body);
  }
);

app.post("/ddd", uploader.any(), function (req, res, next) {
  console.log("req.files", req.files);
  console.log("req.body", req.body);
});

app.listen(3000, () => {
  console.log("server start...");
});
