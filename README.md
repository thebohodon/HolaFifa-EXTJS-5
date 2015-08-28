HolaFifa-ExtJS5
==========

HolaFifa es una pequeña aplicación web desarrollada por mí con el framework ExtJS5. Dicho programa ha sido desarrollado como apoyo
a mi Trabajo de Fin de Grado. Servirá a sus lectores como una aplicación de prueba.

El ejercicio consiste en lo siguiente:

- Un cliente desarrollado con ExtJS5
- Un servidor NodeJS, con Express4

Las funcionalidades del cliente son las siguientes:

- Una pantalla en la que se muestra un buscador de jugadores y una tabla con distintas columnas en las que se representan
característacas de un jugador. La tabla se rellenará con los datos presentes en un fichero json
que el servidor se encarga de proporcionar. La petición que realiza el buscador incluye los filtros que el usuario introduce,
pero el fichero recibido siempre será el mismo, ya que el servidor que es el encargado de realizar la consulta expecífica con
los datos recibidos, no la realiza. Esto es debido a que esta aplicación es para probar realmente el framework del front,
por lo que en el servidor simplemente se han realizado las consultas básicas.
- Otra pantalla a la que se accede al pulsar doble click sobre un jugador representado en la tabla descrita anteriormente o
seleccionando un futbolista y tocando al botón editar. En esta vista se mostraran los distintos campos que detallan al jugador
siendo algunos editables. Si se pulsa al botón nuevo, también se accederá a la misma pantalla, pero en este caso, todos
los campos aparecerán vacios. Algunos deben de estar rellenos para poder dar de alta a un nuevo futbolista.

En la carpeta font-awesome-4.4.0 se encuentran los css para dar los estilos de los iconos presentes en la aplicación.
Si se visita la web https://fortawesome.github.io/Font-Awesome/ se podran observar todos los iconos que están disponibles.

Como la aplicación no ha sido desarrollada con "sencha cmd", no se han podido dar diferentes estilos mediante sass. En su lugar
se ha incluido el fichero FifaStyle.css en el cual se pueden modificar la forma de visualizar los distintos elementos como
se hace tradicionalmente.

Para las consultas, disponemos de unos servicios REST cuyas especificaciones son las siguientes:
- GET /services/clubs Se encarga de devolver el listado completo de equipos.
- GET /services/clubs/{Id} Devuelve el equipo con el id que case con el parámetro de url id.
- GET /services/futbolistas Devuelve la lista de jugadores que han sido previamente añadidos.
- POST /services/futbolistas Añade un nuevo futbolista, partiendo de los datos introducidos en la pantalla de detalle.
    El servidor se encarga de asignale el id siguiente al último jugador creado.
- GET /services/futbolistas/{Id} Devuelve el jugador con el id que case con el parámetro de url id.
- DELETE /services/futbolistas/{Id} Elimina el futbolista con el id que case con el parámetro de url id de mi colección.
- PUT/services/futbolistas/{Id}  Actualiza los datos del jugador con el id que case con el parámetro de url id

Los datos que se manejan se extraen de dos ficheros de texto:
- /server/data/clubs.json para los diferentes equipos a los cuales un jugador puede pertenecer
- /server/data/futbolistas.json para la colección de jugadores que se han añadido previamente

Cada operación CRUD será persistida en su fichero JSON correspondiente.

Para arrancar el servidor, es necesario tener instalado node 0.10.0 o superior en la máquina.
Si no lo tienes instalado, visita la página http://nodejs.org/ y descárgalo.

A continuación, es necesario instalar las dependencias de nuestro servidor (indicadas en el archivo /server/package.json).
Para ello, es necesario situarse en esta ruta mediante la consola de comandos y ejecutar el comando "npm install".
Esto descargará las dependencias necesarias para correr la aplicación. Una vez este hecho esto, dentro del directorio server
se debe ejecutar el comando "node server.js" y ya estará arrancada la aplicación, escuchando por defecto en el puerto 8080.
Si queréis cambiar el puerto, podéis editar el archivo server.js y cambiar el valor de la variable port por el puerto que se
quieras.

Toda la parte servidora ha sido realizada rápidamente gracias al magnifico trabajo de Manuel de la Vega, ya que desarrollar el
servidor lo he aprendido del proyecto que él subio a su gitHub: https://github.com/madelavega/KataExtJS5

