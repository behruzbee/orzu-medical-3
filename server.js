import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw2lfieNmtdVEJmzgH1U4Tp5mG9KHf1cAP1TyIud0o381SWAFzpkRKhrnoH86xgDVcG/exec";

app.post("/submit", async (req, res) => {
  try {
    const payload = req.body;

    // Отправляем данные на Google Script
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.send(response); // возвращаем ответ клиенту
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
