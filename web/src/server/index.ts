import express from "express";
import path from "path"

const app = express();

app.use(express.static(path.join(__dirname, "..",  "..", "public")));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
})

app.listen(process.env.PORT || 8080);