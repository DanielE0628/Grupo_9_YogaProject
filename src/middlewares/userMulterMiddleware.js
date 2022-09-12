const path = require ('path');
const multer = require('multer');

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
    const uploadFile = multer({storage});

    module.exports = uploadFile;
