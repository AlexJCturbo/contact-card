const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(express.static('../client/'));
app.use(express.static('../client/dist/'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Research the end of this line of code
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function () {
  console.log(`Now listening on port: ${PORT}`)
});
