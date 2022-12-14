const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
var validate = require('mongoose-validator')

// VALIDANDO OS NOMES
var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Nome deve ter entre 3 e 50 carácteres'
  }),
  // validate({
  //   validator: 'isAlphanumeric',
  //   passIfEmpty: true,
  //   message: 'Nome deve conter apenas carácteres alfanuméricos'
  // })
]

// VALIDANDO TAMANHO E CARACTERES EM PASSWORD
var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 30],
    message: 'Senha deve ter entre 8 e 30 carácteres'
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Senha deve conter apenas carácteres alfanuméricos'
  })
]

// VALIDANDO EMAIL
var emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 30],
    message: 'Senha deve ter entre 8 e 30 carácteres'
  }),
  validate({
    validator: 'isEmail',
    passIfEmpty: true,
    message: 'Email invalido, digite novamente'
  })
]


// VALIDAND TAMANHO DO RESUMO
var summaryValidator = [
  validate({
    validator: 'isLength',
    arguments: [10, 400],
    message: 'Resumo deve ter no minimo 10 carácteres e no maximo 400 carácteres'
  }),
]



//GENDER - 0 MASC / 1 FEM / 2 Trans / 3 NAO BINARIO
//SEXUAL ORIENTATION - 0 HETERO/ 1 HOMO / 2 BI / 3 PAN
const UserSchema = new Schema({
  fName: { type: String, validate: nameValidator },
  sName: { type: String, validate: nameValidator },
  email: { type: String, required: true, validate: emailValidator },
  password: { type: String, required: true, select: true, validate: passwordValidator },
  birthDate: { type: Date },
  city: { type: String },
  gender: { type: Number },
  sexOrientation: { type: Number },
  summary: { type: String, validate: summaryValidator },
  interests: [
    {
      interestName: { type: String},
      iconName: { type: String},
    },
  ],
  createdAt: { type: Date, default: Date.now },
  lastUpdate: { type: Date },

  likes: [
    {
      matchId: { type: String },
      likedAt: { type: Date, default: Date.now }
    },
  ],
  matchs: [
    {
      matchId: { type: String },
      matchDate: { type: Date, default: Date.now },
      animatedDone: { type: Boolean, default: 0 },
      conversationInitiated: { type: Boolean, default: 0 },
    },
  ],
  mainPicture: String,
  firstLogin: { type: Boolean, default: true },
})

UserSchema.pre("save",
  async function hashPassword(next) {
    if (!this.isModified("password")) next();
    else {
      console.log("fazendo hash do password")
      this.password = await bcrypt.hash(this.password, 8);
    }
    next()
  })


UserSchema.methods = {
  compareHash(hash) {
    console.log(bcrypt.compare(hash, this.password))
    return bcrypt.compare(hash, this.password)
  },

  generateToken(id) {
    return jwt.sign({ id: id }, "secret", {
      expiresIn: 86400
    })
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User