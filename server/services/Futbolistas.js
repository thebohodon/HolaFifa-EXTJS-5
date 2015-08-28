/**
 * Están dados de alta los siguientes servicios:
 * GET /services/collection obtiene la lista de comics de mi colección
 * POST /services/collection añade un nuevo cómic a mi coleccion
 * PUT /services/collection/{id} modifica un cómic de mi colección (aunque de momento no se usa en la aplicación)
 * DELETE /eervices/collection/{id} Elimina el cómic con id 'id' de mi colección
 */
exports.Futbolistas = (function () {
    'use strict';

    var save, futbolistas = require('./../data/futbolistas.json'),
        clubs = require('./../data/clubs.json'),
        fs = require('fs'),
        Q = require('q');

    save = function () {
        var d = Q.defer();
        //persistimos en el sistema de ficheros
        fs.writeFile('./server/data/futbolistas.json', JSON.stringify(futbolistas, null, '\t'), function (err) {

            if (err) {
                console.log(err);
                d.reject(err);
            } else {
                d.resolve();
            }
        });

        return d.promise;
    };

    return function (router) {
        router.route('/futbolistas')
            .post(function (req, res) {
                var sortedIds, name;
                if (futbolistas.length) {
                    // Si ya hay registros, calculamos cuál será el próximo id, extrayendo
                    // todos los ids y ordenandolos
                    sortedIds = futbolistas.map(function (jugador) {
                        return jugador.id;
                    }).sort(function (val1, val2) {
                        return val1 > val2;
                    });

                    // incrementamos el id
                    req.body.id = sortedIds[sortedIds.length - 1] + 1;
                } else {
                    // ningún cómic aún, por lo que empezamos con el id 1
                    req.body.id = 1;
                }

                if (req.body['balonoro'] !== undefined) {
                    req.body['balonoro'] === 'Sí' ? req.body['balonoro'] = true : req.body['balonoro'] = false;
                }
                if (req.body['idequipo'] !== undefined) {
                    clubs.filter(function (equipo) {
                        if (equipo.idequipo == req.body['idequipo']) {
                            req.body.nombreequipo = equipo.nombre;
                        }
                    });
                }

                for (name in req.body) {
                    console.log(name + ': ' + req.body[name]);
                }

                futbolistas.push(req.body);

                //salvamos y devolvemos el registro creado
                save().then(function () {
                    res.json(req.body);
                });
            })
            .get(function (req, res) {
                // devolvemos la lista de mi colección
                res.json(futbolistas);
            });
        router.route('/futbolistas/:id')
            .put(function (req, res) {
                var id = parseInt(req.params.id), name;
                // sobreescribimos la colección
                futbolistas = futbolistas.map(function (jugador) {
                    // si el id coincide, sobreescribimos
                    if (jugador.id == id) {
                        for (name in req.body) {
                            if (name === 'balonoro') {
                                req.body[name] === 'Sí' ? req.body[name] = true : req.body[name] = false;
                            }
                            if (name === 'idequipo') {
                                console.log('dentro if');
                                clubs.filter(function (equipo) {
                                    if (equipo.idequipo == req.body[name]) {
                                        jugador.nombreequipo = equipo.nombre;
                                    }
                                });
                            }
                            jugador[name] = req.body[name];
                            console.log(name + ': ' + req.body[name]);
                        }
                    }
                    return jugador;
                });
                save().then(function () {
                    // respondemos a la peticion con los datos del cómic sobreescrito
                    res.json(futbolistas.filter(function (jugador) {
                        return jugador.id == id
                    })[0]);
                });
            })
            .get(function (req, res) {
                var id = req.params.id;
                // buscamos el futbolista por el id
                futbolistas.forEach(function (jugador) {
                    // si el id coincide, lo devolvemos
                    if (jugador.id == id) {
                        //se debe enviar dentro de un array para mandarlo como json
                        res.json([jugador]);
                    }
                });
            })
            .delete(function (req, res) {
                var id = parseInt(req.params.id);
                // Sobreescribimos el json de futbolistas con los datos antiguos excepto
                // los del jugador cuyo id coincida con el recogido como parámetro de url
                futbolistas = futbolistas.filter(function (jugador) {
                    return jugador.id !== id
                });
                save().then(function () {
                    //devolvemos la coleccion
                    res.json(futbolistas);
                });
            });
    }
}());