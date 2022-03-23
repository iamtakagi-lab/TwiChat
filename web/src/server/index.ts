import express from "express";
import path from "path"

const isProduction = process.env.NODE_ENV === "production"

const publicPath = isProduction ? path.join(__dirname, "..", "public") : path.join(__dirname, "..", "..", "public")

const app = express();

app.use(express.static(publicPath));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(publicPath, "index.html"));
})

app.listen(process.env.PORT || 8080);