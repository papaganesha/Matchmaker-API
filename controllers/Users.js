const User = require('../models/Users')
const bcrypt = require('bcrypt')
const moment = require('moment')
var mongoose = require('mongoose');


const controller = {}


controller.SignUp = async (req, res) => {
    const {
        fName,
        sName,
        email,
        password,
        birthDate,
        city,
        gender,
        sexOrientation,
        summary,
    } = req.body

    if ((await User.find({
            email: email
        })).length > 0) {
        res.status(500).json({
            error: 'Email já cadastrado',
            success: false
        })
    } else {
        const user = new User({
            fName: fName,
            sName: sName,
            email: email,
            password: password,
            birthDate: birthDate,
            city: city,
            gender: gender,
            summary: summary,
            sexOrientation: sexOrientation
        })

        // SALVANDO USUARIO NO BD
        user.save()
            .then((createdUser) => {
                //console.log(createdUser)
                res.status(201).json({
                    message: `Cadastro realizado com sucesso`
                })
                //res.status(201).json(createdUser)
            })
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    res.status(500).json({
                        error: Object.values(err.errors).map(val => val.message)[0],
                        success: false
                    })

                } else {
                    res.status(500).json({
                        error: err.message,
                        success: false
                    })
                }
            })
    }
}

controller.SignIn = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    const user = new User({
        email: email,
        password: password
    })

    //PEGA USUARIO COM EMAIL
    const emailOk = await User.findOne({
        email: email
    })
    //SE O USUARIO NAO EXISTIR
    if (!emailOk) {
        res.status(500).json({
            error: 'Email não cadastrado',
            success: false
        })
        //CASO USUARIO EXISTA
    } else {
        //VERIFICA O PASSWORDHASH ENCONTRADO E COMPARA COM O PASSWORD INSERIDO 
        const isMatch = await bcrypt.compare(password, emailOk.password)

        //CASO COMPARAÇÃO DE INVALIDA
        if (!isMatch) {
            res.status(500).json({
                error: 'Senha inválida, digite novamente',
                success: false
            })
            //CASO COMPARAÇÃO PROCEDA
        } else {
            //console.log(emailOk)
            // CRIA JWT
            const token = user.generateToken(emailOk._id)
            // ENVIA REQUISIÇÃO COM JWT 
            console.log(emailOk._id)
            res.status(200).json({
                message: `${emailOk.fName} logado com sucesso`,
                user:{
                    id: emailOk._id,
                    email: emailOk.email
                },
                token: token,
                success: true
            })
        }
    }
}

controller.getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        data: users,
        success: true
    })
}

controller.updateUser = async (req, res) => {
    const {
        id
    } = req.params
    const {
        fName,
        sName,
        email,
        birthDate,
        city,
        gender,
        sexOrientation,
        summary
    } = req.body

    await User.findByIdAndUpdate(id, {
        $set: {
            fName: fName,
            sName: sName,
            email: email,
            birthDate: birthDate,
            city: city,
            gender: gender,
            sexOrientation: sexOrientation,
            summary: summary,
            lastUpdate: Date.now()
        }
    })

    const user = await User.findById(id)
    if (user) {
        res.status(200).json({
            data: user,
            success: true
        })

    }
}

controller.deleteUser = async (req, res) => {
    const {
        id
    } = req.params
    const result = await User.findByIdAndDelete(id)
    if (!result) {
        res.status(500).json({
            error: 'Erro ao deletar usuario',
            success: true
        })
    } else {
        res.status(200).json({
            message: 'Usuario deletado com sucesso',
            success: true
        })
    }
}

controller.getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        data: users,
        success: true
    })
}

controller.getUserById = async (req, res) => {
    var id = req.userId
    const user = await User.findById(id)
    if (!user) {
        res.status(500).json({
            error: 'Usuario não existente',
            success: true
        })
    } else {
        res.status(200).json({
            data: user,
            success: true
        })
    }
}

controller.getUserAge = async (req, res) => {
    var id = req.userId
    let {
        AgeFromDateString
    } = require('age-calculator')
    
    await User.findById(id).then(user =>{
        if (!user) {
            res.status(500).json({
                error: 'Usuario não existente',
                success: false
            })
        } else {
            var date = user.birthDate
            var EditedDob = moment(date, "DD-MM-YYYY").format('YYYY-MM-DD')
        
            let ageFromString = new AgeFromDateString(EditedDob).age;
    
            res.status(200).json({
                data: ageFromString,
                success: true
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err,
            success: false
        })
    })


}


controller.getUserInterests = async (req, res) => {
    var id = req.userId
    console.log(id, typeof(id)) 
    await User.findById(id)
    .then(user => {
        console.log(user)
        if (!user) {
            res.status(500).json({
                error: 'Email não cadastrado',
                success: false
            })
        } else {
            if (user.interests.length > 0) {
                res.status(201).json({
                    data: user.interests,
                    success: true
                })

            } else {
                res.status(500).json({
                    error: 'Usuário não possui interesses cadastrados',
                    success: false
                })
            }
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
            success: false
        })
    })
}

controller.addInterests = async (req, res) => {
    var id = req.userId
    console.log(id)
    const {
        interestsArray
    } = req.body

    let checkAdd = 0

    for (let i of interestsArray) {
        console.log(i.interestName)
        await User.findByIdAndUpdate(id, {
            $push: {
                interests: {
                    interestName: i.interestName
                }
            }
        }, { new: true }
        ).then(result => {
            console.log(result)
            console.log("++")
            checkAdd++
        }).catch(err => {
            console.log(err)
            console.log("--")
            checkAdd--
        })
    }

    if (checkAdd > interestsArray.length) {
        console.log('here')
        res.status(201).json({
            error: 'Erro durante cadastro de Interesses',
            success: false
        })
    } else {
        await User.findById(id).then(user => {
            console.log(user)
            res.status(201).json({
                message: 'Interesses adicionados',
                success: true
            })
        })
    }
}

//DELETAR INTERESSES


//VER LIKES PELO ID DO USER



//ALGORITMO DE MATCH
//VER MATCHS PELO ID DO USER
//EXCLUIR MATCH -- EXCLUSÃO EM AMBOS

module.exports = controller