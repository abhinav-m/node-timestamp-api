const config = require("./config/config");

const http = require("http");
const path = require("path");
const fs = require("fs");

const { route } = require("./router");

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  route(req.url, function(page) {
    debugger;
    const { statusCode, content, contentType } = page;
    const responseHeader = contentType ? { "Content-Type": contentType } : {};
    const responseContent = content ? content : "";
    res.writeHead(statusCode, responseHeader);
    res.end(responseContent, "utf-8");
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
