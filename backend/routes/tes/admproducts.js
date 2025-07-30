/*
    Productos Routes
    /api/admin/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../../tes/helpers/isDate');
const { validarCampos } = require('../../tes/middlewares/validar-campos');
const { validarJWT } = require('../../tes/middlewares/validar-jwt');
const { getProducts, updateProduct, createProduct } = require('../../controllers/tes/admproducts');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener Productoss
router.get('/', getProducts );

// Actualizar Productos
router.put(
    '/', 
    updateProduct 
);

// crear Productos
router.post(
    '/', 
    createProduct 
);




module.exports = router;