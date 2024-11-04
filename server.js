const { app, port } = require("./index.js");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
