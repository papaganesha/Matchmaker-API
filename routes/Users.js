const router = require('express').Router();
const apiUrl = process.env.API_URL
const {getUsers, getUserById, getUserAgeById, SignUp, SignIn, getUserInterests, updateUser, deleteUser, addInterests} = require('../controllers/Users')

router.get(`${apiUrl}/`, (req, res)=>{
    res.send('ola')
})

router.get(`${apiUrl}/users`, getUsers)

router.get(`${apiUrl}/users/:id`, getUserById)

router.get(`${apiUrl}/users/age/:id`, getUserAgeById)

router.get(`${apiUrl}/interests/:id`, getUserInterests)


router.post(`${apiUrl}/signup`, SignUp)


router.post(`${apiUrl}/signin`, SignIn)

router.post(`${apiUrl}/interests/:id`, addInterests)


router.put(`${apiUrl}/userupdate/:id`, updateUser)

router.delete(`${apiUrl}/userdelete/:id`, deleteUser)



module.exports = router