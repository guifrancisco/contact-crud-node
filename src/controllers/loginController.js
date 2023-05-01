const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    
    if(req.session.user) return res.render('logged-in')
    return res.render('login');
  };


exports.register = async (req, res) => {

  try {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length>0){
      req.flash('errors', login.errors);
      req.session.save( () => {
        return res.redirect('back');
      });
      return;
  }

  req.flash('success', 'Your user has been successfully created');
  req.session.save( () => {
    return res.redirect('back');
  });

  }catch(e){
    console.log(e);
    res.rend('404');
  } 
};


exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length>0){
      req.flash('errors', login.errors);
      
      req.session.save( () => {
        return res.redirect('back');
      });
      return;
  }

  req.flash('success', `Successful login`);
  req.session.user = login.user;
  req.session.save( () => {
    return res.redirect('back');
  });

  }catch(e){
    console.log(e);
    res.rend('404');
  } 
};


exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};



  