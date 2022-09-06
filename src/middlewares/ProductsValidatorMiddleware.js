const { body } = require ( 'express-validator' );


//Validaciones
const registerValidation = [
	body("name")
		.notEmpty().withMessage("Por favor complete el nombre del producto").bail()
		.isLength( {min: 5} ).withMessage("El Nombre debe tener al menos 5 caracteres").bail()
		.isLength( {max: 100} ).withMessage("El Nombre debe tener máximo 100 caracteres")
    ,
	
	body("cartegory")
		.notEmpty().withMessage("Por favor elija la categoria").bail()
		
    ,
    
    body("price")
        .notEmpty().withMessage("Por favor complete con una fecha").bail()
        .isDate({min: 1920-01-01}).withMessage("Por favor ingrese una fecha mayor a 01/01/1920").bail()
        .isDate({max: 2003-06-27}).withMessage("Por favor ingrese una fecha menor a 27/06/2003")
    ,

	body("description")
		.notEmpty().withMessage("Por favor complete con una contraseña").bail()
	
    ,

	body("talle")
        .notEmpty().withMessage("Ingrese nuevamente la contraseña")
        ,
        
	body("stock")
        .notEmpty().withMessage("Ingrese nuevamente la contraseña")

        ,

];

module.exports = registerValidation;