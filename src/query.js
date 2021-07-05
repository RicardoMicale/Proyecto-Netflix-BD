const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:jack123@localhost:5432/netflix';
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.set('port', process.env.PORT || 4000);
app.get('/', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    client.query(`
    SELECT contenido.nombre, contenido.año_lanzamiento, AVG(v.calificacion) from contenido
    JOIN pelicula p on contenido.id = p.id
    JOIN tiene t on contenido.id = t.id_contenido
    JOIN visualiza v on p.id_pelicula = v.id_pelicula
    WHERE mins_duracion > 150
    AND t.id_genero = 3
    AND p.ganadora_premios = true
    GROUP BY v.id_pelicula,
    contenido.nombre, contenido.año_lanzamiento
    HAVING AVG(v.calificacion) > 3
    ORDER BY contenido.año_lanzamiento;
    
    SELECT usuario.nombre_usuario, c.nombre, p.nombre, COUNT(v.id_episodio) FROM usuario
    JOIN pais p on p.id_pais = usuario.id_pais
    JOIN ciudad c on c.id_ciudad = usuario.id_ciudad
    JOIN visualiza v on usuario.id_usuario = v.id_usuario
    JOIN episodio e on v.id_episodio = e.id_episodio
    JOIN temporada t on t.id_temporada = e.id_temporada
    JOIN serie s on s.id_serie = t.id_serie
    JOIN contenido c2 on c2.id = s.id
    WHERE c2.es_contenido_original = true
    AND v.id_pelicula = 0
    GROUP BY nombre_usuario, c.nombre, usuario.nombre_usuario,
    p.nombre
    ORDER BY COUNT(v.id_episodio) DESC
    LIMIT 1;

    SELECT COUNT(v.id_usuario), usuario.nombre_usuario FROM usuario
    JOIN visualiza v on usuario.id_usuario = v.id_usuario
    JOIN recomendada r on usuario.id_usuario = r.id_usuario
    WHERE r.id_pelicula = v.id_pelicula
    GROUP BY usuario.nombre_usuario
    ORDER BY COUNT(v.id_usuario) DESC
    LIMIT 5 ;

    SELECT pais.nombre FROM pais
    JOIN usuario u on pais.id_pais = u.id_pais
    JOIN visualiza v on u.id_usuario = v.id_usuario
    JOIN episodio e on v.id_episodio = e.id_episodio
    JOIN temporada t on e.id_temporada = t.id_temporada
    JOIN serie s on t.id_serie = s.id_serie
    JOIN contenido c on c.id = s.id
    WHERE s.id_Serie in (SELECT s.id_serie FROM serie as s
    JOIN temporada t on s.id_serie = t.id_serie
    JOIN episodio e on t.id_temporada = e.id_temporada
    GROUP BY s.id_serie
    HAVING COUNT(s.id_serie) > 10)
    AND v.id_pelicula = 0
    GROUP BY pais.nombre;

    SELECT contenido.nombre, AVG(v.calificacion) FROM contenido
    JOIN serie s On contenido.id = s.id
    JOIN temporada t ON t.id_serie = s.id_serie
    JOIN episodio e ON e.id_temporada = t.id_temporada
    JOIN visualiza v ON v.id_episodio = e.id_episodio
    WHERE v.id_pelicula = 0
    GROUP BY contenido.nombre
    ORDER BY AVG(v.calificacion) DESC
    LIMIT 3;

    SELECT nombre, AVG(v.calificacion) FROM contenido
    JOIN pelicula p on contenido.id = p.id
    JOIN actua a on contenido.id = a.id
    JOIN visualiza v on p.id_pelicula = v.id_pelicula
    WHERE a.id_actor IN (
    SELECT id_actor FROM actor
    WHERE actor.nombre = 'Daniel Brühl')
    GROUP BY contenido.nombre
    HAVING AVG(v.calificacion) > (SELECT AVG(visualiza.calificacion) FROM visualiza WHERE visualiza.id_episodio = 0);
    
    SELECT usuario.nombre_usuario, usuario.nombre, usuario.apellido, usuario.edad, usuario.sexo, usuario.email FROM usuario
    JOIN contrata c on usuario.id_usuario = c.id_usuario
    JOIN visualiza v on usuario.id_usuario = v.id_usuario
    JOIN pelicula p on p.id_pelicula = v.id_pelicula
    JOIN contenido c2 on c2.id = p.id
    JOIN requiere r on c2.id = r.id_contenido
    WHERE usuario.sexo = 'F'
    AND usuario.nombre_usuario LIKE '%aDRi%'
    AND c.fecha_inicio is not null
    AND c.fecha_fin is null
    GROUP BY usuario.nombre_usuario, usuario.nombre, usuario.apellido, usuario.edad, usuario.sexo, usuario.email
    HAVING count(r.id_contenido) > 1;

    SELECT AVG(visualiza.calificacion) FROM visualiza WHERE visualiza.id_episodio = 0;

    SELECT * FROM ACTOR ORDER BY nombre;
    SELECT * FROM CONTENIDO ORDER BY nombre;
    SELECT * from serie
    join contenido c on serie.id = c.id
    ORDER BY nombre;
    SELECT * FROM temporada
    join serie s on s.id_serie = temporada.id_serie
    JOIN contenido c on c.id = s.id
    ORDER BY nombre;
    SELECT * FROM GENERO ORDER BY nombre;
    SELECT * FROM PAIS ORDER BY nombre;
    SELECT * FROM CIUDAD ORDER BY nombre;
    SELECT * FROM USUARIO ORDER BY nombre;
    SELECT * FROM SUSCRIPCION;
    SELECT * FROM CONTRATA ORDER BY fecha_inicio;
    SELECT * FROM PERFIL;
    SELECT * FROM pelicula
    join contenido c on pelicula.id = c.id
    ORDER BY c.nombre;
    SELECT * FROM episodio;
    `, function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        let queryA = result[0].rows 
        let queryB = result[1].rows
        let queryC = result[2].rows 
        let queryD = result[3].rows
        let queryE = result[4].rows 
        let queryF = result[5].rows
        let queryG = result[6].rows
        let promedio = result[7].rows
        let actores = result[8].rows
        let contenidos = result[9].rows
        let series = result[10].rows
        let temporadas = result[11].rows
        let generos = result[12].rows
        let paises = result[13].rows
        let ciudades = result[14].rows
        let usuarios = result[15].rows
        let sus = result[16].rows
        let contratos = result[17].rows
        let perfiles = result[18].rows
        let peliculas = result[19].rows
        let episodios = result[20].rows
        res.status(200).send([queryA, queryB, queryC, queryD, queryE, queryF, queryG, promedio, actores, contenidos, series, temporadas, generos, paises, ciudades, usuarios, sus, contratos, perfiles, peliculas, episodios]);
    });
});
app.listen(4000, function () {
    console.log('Corriendo Queries');
});