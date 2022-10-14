const router = require('express').Router();
const isAuth = require('../middlewares/AuthenticationHandler')
const apiUrl = process.env.API_URL
const {getUsers, getUserById, getUserAge, SignUp, SignIn, getUserInterests, updateUser, updateUserInfo, deleteUser, addInterests, deleteInterest, addLike} = require('../controllers/Users')

router.get(`${apiUrl}/`, (req, res)=>{
    res.send('ola')
})

router.get(`${apiUrl}/users`, isAuth, getUsers)

router.get(`${apiUrl}/user`, isAuth, getUserById)

router.get(`${apiUrl}/user/age`, isAuth, getUserAge)

router.get(`${apiUrl}/interests`, isAuth, getUserInterests)


router.post(`${apiUrl}/signup`, SignUp)


router.post(`${apiUrl}/signin`, SignIn)

router.post(`${apiUrl}/interests`, isAuth, addInterests)

router.post(`${apiUrl}/like`, isAuth, addLike)


router.put(`${apiUrl}/userupdate/:id`, isAuth, updateUser)

router.put(`${apiUrl}/user`, isAuth, updateUserInfo)



router.delete(`${apiUrl}/userdelete/:id`, deleteUser)

router.delete(`${apiUrl}/interest`, isAuth, deleteInterest)



module.exports = router