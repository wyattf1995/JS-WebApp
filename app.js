const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
//const db = require("./db");
const cors = require("cors");
const url = require("url");
const port = 3000;

const app = express();

app.use(cors());

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
var router = express.Router();
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
//Routers

//const usersRouter = require("./routes/user.js");

//app.use("/users", usersRouter);

//app.use("/", (req, res) => {
//  res.send("Welcome to the homepage");
//});

app.get("/arbiscraper", (req, res) => {
  //tell the request to fetch the url, send the results to a callback function
  request(
    {
      uri:
        "https://www.ebay.com/b/Textbooks-Educational-Reference-Books/184644/bn_7115678050?LH_Auction=1&rt=nc&_sop=1"
    },
    function(err, response, body) {
      var self = this;
      self.items = new Array();
      //basic error check
      if (err && response.statusCode !== 200) {
        console.log("Request error.");
      }

      var $ = cheerio.load(body),
        $body = $("body"),
        $products = $body.find(".s-item");

      $products.each(function(i, item) {
        var $a = $(item)
            .find("a")
            .attr("href"),
          $title = $(item)
            .find(".s-item__title")
            .text(),
          $img = $(item).find(".s-item__image-img");

        self.items[i] = {
          href: $a,
          title: $title,
          thumbnail: $img.attr("src")
          // urlObj: url.parse($a.attr("href"), true)
        };
      });
      console.log(self.items);

      res.render("list", {
        title: "Arbiscraper",
        items: self.items
      });
    }
  );
});

//PORT TO LISTEN ON
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
