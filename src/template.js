
module.exports = templateData => {
  const { htmlWebpackPlugin } = templateData;
  const { entry } = htmlWebpackPlugin.options;

  return (
    require("./ejs/header.ejs")(templateData) +
    require(`./${entry}/body.ejs`)(templateData) +
    require("./ejs/footer.ejs")(templateData)
  );
}