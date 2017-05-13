const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
var routes = require('./routes/routes');
var app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

var hbs = exphbs.create({
      defaultLayout:'layout'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use('/', routes);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});