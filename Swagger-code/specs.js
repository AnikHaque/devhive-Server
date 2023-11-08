const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const swaggerJSDocs = YAML.load(path.join(__dirname, "./api.yaml"));
// CDN CSS

const options = {
  customCss:
    "img {content:url('https://i.ibb.co/FHqDjdX/IMG-20230404-110630-fotor-bg-remover-20230404111148.png'); height:70px;}",

  customfavIcon:
    "https://i.ibb.co/DfBt020/IMG-20230403-234455-removebg-preview.png",
  customSiteTitle: "api docs for devHive coders",
  customCssUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
};

module.exports = {
  swaggerServe: swaggerUI.serve,
  swaggerSetup: swaggerUI.setup(swaggerJSDocs, options),
};
