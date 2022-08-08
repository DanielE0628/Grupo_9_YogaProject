//Require
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userController = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        let folder = path.join(__dirname,'../public/images/users/profileImages');
        callback(null,folder);
    },
    filename: (req,file,callback) =>{
        let imageNewName= 'user-' + Date.now() + path.extname(file.originalname);
        callback(null,imageNewName);
    }
});
const upload = multer({storage});

//let logDBMiddleware = require('../middlewares/logDBmiddlewares');

/* GET user page. */ 
router.get('/', userController.vistaUser);
router.get('/login', userController.vistaLogin); 
router.get('/register', userController.vistaRegister); 
router.get('/instructors', userController.vistaInstructors);
router.get('/list', userController.vistaLista);
router.get('/search',userController.search);


router.get('/edit/:idUser',userController.edit);
router.put('/edit/:idUser',userController.edit);

router.delete('/delete/:idUser',function(req, res){
    res.send("SOY DELETE!");
});

/* Procesamiento del Form */
router.post('/register', upload.single('imagenUsuario'), userController.create);

module.exports = router;