const { body } = require ( 'express-validator' );


//Validaciones
const registerValidation = [
	body("nombre_y_apellido")
		.notEmpty().withMessage("Por favor complete con su nombre").bail()
		.isLength( {min: 3} ).withMessage("El Nombre debe tener al menos 3 caracteres").bail()
		.isLength( {max: 15} ).withMessage("El Nombre debe tener máximo 15 caracteres")
    ,
	
	body("email")
		.notEmpty().withMessage("Por favor complete con su email").bail()
		.isEmail().withMessage("Por favor ingrese un email válido")
    ,
    
    body("fecha_de_nacimiento")
        .notEmpty().withMessage("Por favor complete con una fecha").bail()
        .isDate({min: 1920-01-01}).withMessage("Por favor ingrese una fecha mayor a 01/01/1920").bail()
        .isDate({max: 2003-06-27}).withMessage("Por favor ingrese una fecha menor a 27/06/2003")
    ,

	body("pasword")
		.notEmpty().withMessage("Por favor complete con una contraseña").bail()
		.isLength( {min: 5} ).withMessage("La contraseña debe tener al menos 5 caracteres").bail()
		.isLength( {max: 15} ).withMessage("La contraseña debe tener máximo 15 caracteres")
        //.isStrongPassword().withMessage("La contraseña debe contener un caracter especial").bail()
    ,

	body("comfirmPasword")
        .notEmpty().withMessage("Ingrese nuevamente la contraseña")
        // .equals(body.pasword).withMessage("Las contraseñas no coinciden")
        ,
        
	
    body('imagenUsuario')
		.custom((value, {req}) => {
			let file = req.file;
			let acceptedExtensions = [ '.jpg', '.png', '.gif', ".jpng" ];
			//hacer console.log(req.file) para saber el peso de las imagenes
			if ( !file ) {
				throw new Error ('tienes que subir una imagen');
			} else {
				//fileExtencion ejemplo.jpg  dejando solo ".jpg" y comparando con acceptedExtensions
				let fileExtension = path.extname ( file.originalname );
				if ( !acceptedExtensions.includes( fileExtension ) ) {
				    throw new Error ('Las extensiones de archivos permitidas son ${ acceptedExtensions.join ( ', ' ) }' );
				}
			return true;
            }
		})//acceptedExtensions
];

module.exports = registerValidation;