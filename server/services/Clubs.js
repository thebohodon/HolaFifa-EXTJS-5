/**
 * Están dados de alta los siguientes servicios:
 * GET /services/MarvelComics devuelve la lista de cómis de marvel. Admite el parametro
 *                            userId (en nuestra aplicación con cualquier valor) para recibir
 *                            los cómics que aún no han sido añadidos a mi colección
 */
exports.Clubs = (function () {
    'use strict';

    var readMyCollection, clubs = require("./../data/clubs.json"),
        fs = require('fs'),
        Q = require('q');

    readMyCollection = function () {
        var d = Q.defer();

        //leemos del sistema de ficheros
        fs.readFile('./server/data/clubs.json', 'utf8', function (err, data) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(JSON.parse(data));
            }
        });

        return d.promise;
    };

    return function (router) {
        router.route('/clubs')
            .get(function (req, res) {
                //Devolvemos todos
                res.json(clubs);
            });
        router.route('/clubs/:id')
            .get(function (req, res) {
                var id = parseInt(req.params.id), equipo;
                // buscamos el equipo por el id
                clubs.forEach(function (equipo) {
                    // si el id coincide, lo devolvemos
                    console.log(equipo.id+'=='+' rec:'+id);
                    if (equipo.id === id) {
                        console.log('entra');
                        //se debe enviar dentro de un array para mandarlo como json
                        res.json([equipo]);
                    }
                });
            })
    }
}());