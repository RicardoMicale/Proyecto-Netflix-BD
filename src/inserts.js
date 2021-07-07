const express = require('express');
const {
  Client
} = require('pg');
const connectionString = 'postgres://postgres:ricardo123@localhost:5432/Netflix';
const client = new Client({
  connectionString: connectionString
});
client.connect();
var app = express();
app.set('port', process.env.PORT || 4080);
app.get('/', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  switch (req.query.case) {
    case "actor":
      client.query(
        `insert into public.actor (nombre, años_exp, edad, sexo)
                values  ('${req.query.nombre}', '${req.query.exp}', '${req.query.edad}', '${req.query.sexo}')`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "actua":
      console.log(req.query.cont, parseInt(req.query.cont))
      console.log(req.query.actor, parseInt(req.query.actor))
      console.log(req.query.prot, req.query.premios)
      client.query(
        `insert into public.actua (id, id_actor, es_protagonista, premios)
                values  ('${parseInt(req.query.cont)}', '${parseInt(req.query.actor)}', '${req.query.prot}', '${req.query.premios}')`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "pelicula":
      client.query(
        `insert into public.contenido (nombre, año_lanzamiento, es_contenido_original) values ('${req.query.nombre}', '${parseInt(req.query.ano)}', '${req.query.original}');
            insert into public.pelicula (mins_duracion, ganadora_premios, sinopsis, id) values ('${parseInt(req.query.duracion)}', '${req.query.ganadora}', '${req.query.sinopsis}', '${parseInt(req.query.id)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "serie":
      client.query(
        `insert into public.contenido (nombre, año_lanzamiento, es_contenido_original) values ('${req.query.nombre}', '${parseInt(req.query.ano)}', '${req.query.original}');
            insert into public.serie (descripcion, id) values ('${req.query.serieDes}', '${parseInt(req.query.id)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "temporada":
      client.query(
        `insert into public.temporada (id_serie, numero, descripción) values ('${req.query.serie}', '${parseInt(req.query.numeroTemp)}', '${req.query.capitulos} capitulos');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "episodio":
      client.query(
        `insert into public.episodio (id_temporada, nombre, número, descripción) values ('${req.query.temporada}', '${req.query.nombreEp}', '${parseInt(req.query.numberEp)}','${req.query.descEp}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "genero":
      client.query(
        `insert into public.tiene (id_contenido, id_genero) values ('${parseInt(req.query.contenidoId)}', '${parseInt(req.query.genero)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "pais":
      client.query(
        `insert into public.pais (nombre, descripción) values ('${req.query.nombrePais}', '${req.query.descPais}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "ciudad":
      client.query(
        `insert into public.ciudad (id_pais, nombre, descripción) values ('${parseInt(req.query.idPais)}','${req.query.nombreCiu}', '${req.query.poblacion}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "usuario":
      client.query(
        `insert into public.usuario (id_pais, id_ciudad, nombre_usuario, email, contraseña, nombre, apellido, edad, sexo)
        values ('${parseInt(req.query.idPais)}','${parseInt(req.query.idCiudad)}', '${req.query.usuario}', '${req.query.email}', '${req.query.password}', '${req.query.nombreUser}', '${req.query.apellidoUser}', '${parseInt(req.query.edad)}', '${req.query.sexo}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "perfil":
      client.query(
        `insert into public.perfil (id_usuario, nombre)
        values ('${parseInt(req.query.idUsuario)}','${req.query.perfil}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "contrata":
      client.query(
        `insert into public.contrata (id_usuario, id_suscripcion, fecha_inicio, fecha_fin)
        values ('${parseInt(req.query.idUsuario)}','${parseInt(req.query.idSus)}', '${req.query.fechaInicio}', null);`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "termina":
      client.query(
        `UPDATE contrata
        SET fecha_fin = '${req.query.fechaFin}'
        WHERE id_usuario = '${req.query.idUsuarioFin}'`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "recomendar":
      client.query(
        `insert into public.recomendada (id_usuario, id_perfil, id_pelicula)
        values ('${parseInt(req.query.idUsuarioRec)}','${parseInt(req.query.idPerfilRec)}', '${parseInt(req.query.idPeliculaRec)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "requiere":
      client.query(
        `insert into public.requiere (id_contenido, id_suscripcion)
        values ('${parseInt(req.query.contenidoIdReq)}','${parseInt(req.query.idSusReq)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    case "visualiza":
      client.query(
        `insert into public.visualiza (id_usuario, id_perfil, id_pelicula, id_episodio, calificacion)
        values ('${parseInt(req.query.idUsuarioVis)}','${parseInt(req.query.idPerfilVis)}','${parseInt(req.query.idPeliculaVis)}','${parseInt(req.query.episodioId)}','${parseInt(req.query.calificacion)}');`,
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.status(200).send();
        });
      break;
    default:
      console.log("no entro")
  }

});
app.listen(4080, function () {
  console.log('Corriendo Inserts');
});
