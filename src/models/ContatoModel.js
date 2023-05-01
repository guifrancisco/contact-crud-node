const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  creationdate: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato (body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
};

Contato.buscaPorId = async function (id) {
  if(typeof id !== 'string') return;
  const user = await ContatoModel.findById(id);
  return user;
}

Contato.prototype.register = async function(){
  this.valida();

  if(this.errors.length > 0) return;

  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function(){  
  this.cleanUp();


  //validation
  //the email needs to be valid
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid e-mail');
  if(!this.body.name) this.errors.push('Name is a mandatory field ');
  if(!this.body.email && !this.body.phone ){
    this.errors.push('At least one contact must be send: e-mail or phone');
  };


};

Contato.prototype.cleanUp = function(){
  for(const key in this.body){
    if (typeof this.body[key] !== 'string'){
      this.body[key] = '';
    };
  };

  this.body = {
    name: this.body.name,
    lastname: this.body.lastname,
    email: this.body.email,
    phone: this.body.phone,
  
  };
};


module.exports = Contato;
