const { body } = require ( 'express-validator' );


//Validaciones
const createProductValidation = [
	body("name")
		.notEmpty().withMessage("Por favor complete con su nombre").bail()
		.isLength( {min: 5} ).withMessage("El Nombre debe tener al menos 5 caracteres")
    ,
	
	body("category_id")
		.notEmpty().withMessage("Por favor elija una categoria")
    ,
    
    body("price")
        .notEmpty().withMessage("Por favor ingrese el precio")
    ,

	body("description")
		.notEmpty().withMessage("Por favor complete la descripcion").bail()
		.isLength( {min: 20} ).withMessage("La descripcion debe tener al menos 20 caracteres").bail()
		.isLength( {max: 500} ).withMessage("La descripcion debe tener un maximo 500 caracteres")
        
    ,
	// body("talle_id")
	// .notEmpty().withMessage("Por favor elija un talle")
    ,
	body("marca_id")
	.notEmpty().withMessage("Por favor elija una marca")
    ,    
	body("stock")
		.notEmpty().withMessage("Por favor ingrese la cantidad de stock del producto")
];

module.exports = createProductValidation;