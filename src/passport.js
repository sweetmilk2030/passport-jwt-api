const passport = require('passport');
const passportJWT = require("passport-jwt");
import models from './models';
import debug from 'debug';
var jwt = require('jsonwebtoken');
const config = require('./config/config');
var bcrypt = require('bcryptjs');
const dbg = debug('BE001:main');
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = models;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
},
    async function (email, password, done) {
        await User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) { return done(null, false); }
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) { return done(null, false); }
            return done(null, user);
        }).catch(err => {
            return done(null, false);
        });
    }
));

passport.use(new JWTStrategy ( {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : config.secret
},
async function (jwtPayload, done) {
    dbg(jwtPayload);
    await User.findOne({
        where: {
            email: jwtPayload.id
        }
    }).then(user => {
        dbg("user " +user);
        if (!user) { return done(null, false); }
        return done(null, user);
    }).catch(err => {
        dbg("err " +err);
        return done(null, false);
    });
    }
));