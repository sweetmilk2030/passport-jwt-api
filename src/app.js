import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './services/swagger-specs';
import productsRoutes from './routes/products';
const jwt      = require('jsonwebtoken');
import categoriesRoutes from './routes/categories';
//import usersRoutes from './routes/users-2';
const config = require('./config/config');
import debug from 'debug';
const dbg = debug('BE001:main');
import usersRoutes from './routes/users';
import rolesRoutes from './routes/roles';
import userRolesRoutes from './routes/user_roles';
import someRoutes from './routes/some';
const passport = require('passport');

require('./passport');

const app = express();
app.use(passport.initialize());
// middlewares
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Welcome to API');
})
app.get('/login', function (req, res) {
  res.send('You have to login');
})
// register routes
//app.use('/users', passport.authenticate('jwt', {session: false}), usersRoutes);
//app.use('/users', passport.authenticate('local', { failureRedirect: '/' }, usersRoutes));
app.post('/login', passport.authenticate('local', {  failureRedirect: '/login' , session: false}),
  function(req, res) {
    //dbg(req.body);
    var payload = {
      id: req.body.email + ''
     };

     var signOptions = {
      subject:  req.body.email + '',
      expiresIn:  "12h"
     };
     var token = jwt.sign(payload, config.secret, signOptions);

		// var token = jwt.sign({ id: req.body.id }, config.secret, {
		//   expiresIn: 3600 // expires in 10 seconds
		// });
    res.status(200).send({ auth: true, accessToken: token });
  }
);
app.use('/some', passport.authenticate('jwt', {session: false}), someRoutes);
app.use('/products', productsRoutes);
app.use('/categories', categoriesRoutes);
//app.use('/users', usersRoutes);
app.use('/roles', rolesRoutes);
app.use('/userRoles', userRolesRoutes);

// api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'API not found',
  });
});

export default app;
