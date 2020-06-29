const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
};

exports.postLogin = (req, res, next) => {
    User.findById("5ef2b04ded36c514b0a2fab9")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
          console.log(err);
        res.redirect('/');
      });
    })
    .catch((err) => console.log(err));
    
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};

