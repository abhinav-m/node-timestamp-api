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
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET");

    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader("Access-Control-Allow-Credentials", true);
    const responseContent = content ? content : "";
    res.writeHead(statusCode, responseHeader);
    res.end(responseContent, "utf-8");
  });
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
