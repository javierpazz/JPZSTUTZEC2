const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name, email, isAdmin, role ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name, email, isAdmin, role };

        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}



module.exports = {
    generarJWT,
}


