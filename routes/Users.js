const router = require('express').Router();
const multer = require('multer');

const isAuth = require('../middlewares/AuthenticationHandler')
const apiUrl = process.env.API_URL
const { 
        getUsers, 
        getUserById, 
        SignUp, 
        SignIn, 
        getUserInterests, 
        updateUser, 
        updateUserInfo, 
        deleteUser, 
        addInterests, 
        deleteInterest, 
        addLike, 
        uploadMainPic, 
        uploadPictures, 
        getMatchs, 
        getConversationInitialized,
        updateConversationInitialized
} = require('../controllers/Users')


const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};

const uploads = multer({ storage, fileFilter });

router.get(`${apiUrl}/users`, isAuth, getUsers)

router.get(`${apiUrl}/user`, isAuth, getUserById)

router.get(`${apiUrl}/matchs`, isAuth, getMatchs)

router.get(`${apiUrl}/interests`, isAuth, getUserInterests)


router.post(`${apiUrl}/signup`, SignUp)


router.post(`${apiUrl}/signin`, SignIn)

router.post(`${apiUrl}/interests`, isAuth, addInterests)

router.post(`${apiUrl}/like`, isAuth, addLike)

router.post(`${apiUrl}/uploadAvatar`, isAuth, uploads.single('profile'), uploadMainPic)

router.post(`${apiUrl}/uploadpic`, isAuth, uploads.single('picture'), uploadPictures)

router.post(`${apiUrl}/conversationInitiliazed`, isAuth, getConversationInitialized)



router.put(`${apiUrl}/userupdate/:id`, isAuth, updateUser)

router.put(`${apiUrl}/user`, isAuth, updateUserInfo)

router.put(`${apiUrl}/conversationInitiliazed`, isAuth, updateConversationInitialized)


router.delete(`${apiUrl}/userdelete/:id`, deleteUser)

router.delete(`${apiUrl}/interest`, isAuth, deleteInterest)



module.exports = router