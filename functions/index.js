const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.use(async (req, res) => {
  const { handler } = await import("./build/handler.js");
  return handler(req, res);
});

exports.ssr = functions.https.onRequest(app);
exports.ssr_preview = functions.https.onRequest(app);
