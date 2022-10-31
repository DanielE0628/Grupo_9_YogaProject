const path = require('path');
const { body } = require('express-validator');


//Validaciones
const registerValidation = [
	body("nombre")
		.notEmpty().withMessage("Por favor complete solo con su primer nombre").bail()
		.isAlpha().withMessage("Por favor complete solo con letras, sin espacios o caracteres especiales").bail()
		.isLength({ min: 3 }).withMessage("El Nombre debe tener al menos 3 caracteres").bail()
		.isLength({ max: 30 }).withMessage("El Nombre debe tener máximo 30 caracteres, sino use un disminutuvo de su nombre")
	,

	body("email")
		.notEmpty().withMessage("Por favor complete con su email").bail()
		.isEmail().withMessage("Por favor ingrese un email válido")
	,

	body("fecha_de_nacimiento")
		.notEmpty().withMessage("Por favor complete con una fecha").bail()
		.isDate({ min: 1920 - 01 - 01 }).withMessage("Por favor ingrese una fecha mayor a 01/01/1920").bail()
		.isDate({ max: 2003 - 06 - 27 }).withMessage("Por favor ingrese una fecha menor a 27/06/2003")
	,

	body("password")
		.notEmpty().withMessage("Por favor complete con una contraseña").bail()
		.isLength({ min: 3 }).withMessage("La contraseña debe tener al menos 3 caracteres").bail()
		.isLength({ max: 15 }).withMessage("La contraseña debe tener máximo 15 caracteres")
	// .isStrongPassword().withMessage("La contraseña debe contener un caracter especial")
	,

	body("comfirmPassword")
	    .notEmpty().withMessage("Ingrese nuevamente la contraseña")
	,


	body('imagenUsuario')
		.custom((value, { req }) => {
			let file = req.file;
			console.log(file);
			let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

			if (!file) {
				return true
			} else {
				let fileExtension = path.extname(file.originalname);
				if (!acceptedExtensions.includes(fileExtension)) {
					throw new Error('Las extensiones de archivos permitidas son: ' + `${ acceptedExtensions.join( ', ' ) }`);
				}
				return true;
			}
		})
];

module.exports = registerValidation;