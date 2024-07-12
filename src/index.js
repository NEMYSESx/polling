import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
const data = [];
app.get("/", (req, res) => {
  res.send("hii from server");
});

app.post("/shakir", (req, res) => {
  data.push(req.body.msg);
});

app.get("/ana", (req, res) => {
  if (data.length != 0) {
    setTimeout(() => {
      res.send("hello");
    }, 10000);
  }
});

app.listen(port, () => {
  console.log("server is running...");
});
