const fs = require("fs");
const path = require("path");

const route = (url, callback) => {
  //Matches strings starting with /api/ (retrieve timestamp in this case.)
  if (url.match(/^\/api\//gi)) {
    console.log(url.split("/api/"));
    const dateURI = decodeURIComponent(url.split("/api/")[1]);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    let date, stringDate;
    if (isNaN(dateURI)) {
      date = new Date(Date.parse(dateURI));
    } else {
      date = new Date(parseInt(dateURI) * 1000);
    }
    console.log(date);
    const statusCode = 200;
    const unix =
      date.toString() !== "Invalid Date" ? date.getTime() / 1000 : null;
    const natural =
      date.toString() !== "Invalid Date"
        ? date.toLocaleDateString("en-us", dateOptions)
        : null;

    const content = JSON.stringify({
      unix,
      natural
    });

    const response = {
      statusCode,
      content,
      contentType: "application/json"
    };
    callback(response);
  } else {
    let filePath = "." + url;
    if (filePath === "./") {
      filePath = __dirname + "/static/index.html";
    } else {
      //Invalid url.
      filePath = __dirname + "/static/404.html";
    }

    //Get file extension
    const extension = String(path.extname(filePath)).toLowerCase();

    //Set the mime type.
    const mimeTypes = {
      ".html": "text/html"
    };

    const contentType = mimeTypes[extension] || "text/html";
    let response = { contentType };

    fs.readFile(filePath, function(err, content) {
      if (err) {
        response.statusCode = 500;
        response.content =
          "Sorry, check site admin for error:" + err.code + "\n";
      } else {
        response.statusCode = "200";
        response.content = content;
      }
      return callback(response);
    });
  }
};

module.exports = {
  route
};
