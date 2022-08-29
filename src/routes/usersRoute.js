//Require
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const logDBMiddleware = require("../middlewares/logDBMiddleware");
const usersRegValidatorMiddleware = require("../middlewares/usersRegValidatorMiddleware");
const userController = require("../controllers/userController");


/* RutaMulter Usuario */
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        let folder = path.join(__dirname,'..','..','public','images','users','profileImages');
    
        cb(null, folder)
    },
    filename: (req,file,cb) =>{
        let imageNewName= 'user-' + Date.now() + path.extname(file.originalname);
        cb(null,imageNewName);
    }
});
const upload = multer({storage});

/* Vistas Usuario */ 
router.get('/', userController.vistaUser);
router.get('/login', userController.vistaLogin); 
router.get('/instructors', userController.vistaInstructors);
router.get('/list', userController.vistaLista);
router.get('/detail/:idUser',userController.vistaDetail);

/* Buscar Usuario */
router.get('/search',userController.search);

/* Editar Usuario */
router.get('/edit/:idUser',userController.edit);
router.put('/edit/:idUser', function(req, res){
    res.send("fui por PUT");
});
/* Eliminar Usuario */
router.delete('/delete/:idUser',function(req, res){
    res.send("fui por DELETE");
});

/* Crear Usuario */
router.get('/register', userController.vistaRegister); 
router.post('/register', upload.single('imagenUsuario'), usersRegValidatorMiddleware, userController.create);

module.exports = router;