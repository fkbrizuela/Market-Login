const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test2"
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Conectado a DB!");
})

app.get("/productos/", (req, res) => {
    db.query("SELECT * FROM producto", (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        res.json(results);
    });
});

app.get("/productos/:id", (req, res) => {
    const id = req.body.id;
    db.query("SELECT * FROM producto WHERE id=?", [id], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        res.json(results);
    });
});

app.put("/productos/", (req, res) => {
    const nombre = req.body.nombre;
    const stock = req.body.stock;
    const precio = req.body.precio;
    db.query("INSERT INTO producto(nombre, stock, precio) VALUES(?, ?, ?)", [nombre, stock, precio], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        if (results.affectedRows !== 0) {
            res.send("OK")
        } else {
            res.status(500).send("0 filas afectadas.")
        }
    });
});

app.post("/productos/", (req, res) => {
    const nombre = req.body.nombre;
    const stock = req.body.stock;
    const precio = req.body.precio;
    const id = req.body.id;
    db.query("UPDATE producto SET nombre=?, stock=?, precio=? WHERE id=?", [nombre, stock, precio, id], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        if (results.affectedRows !== 0) {
            res.send("OK")
        } else {
            res.status(500).send("0 filas afectadas.")
        }
    });
});

app.delete("/productos/", (req, res) => {
    const id = req.body.id;
    db.query("DELETE FROM producto WHERE id=?", [id], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        if (results.affectedRows !== 0) {
            res.send("OK")
        } else {
            res.status(500).send("0 filas afectadas.")
        }
    });
});

app.get("/carrito/", (req, res) => {
    const nombre = req.query.nombre

    db.query("SELECT id FROM usuario WHERE nombre=?", [nombre], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }

        if (results.length != 0) {//result es un array de objetos unico en este caso
            const usuarioid = results[0].id;

            db.query("SELECT * FROM carrito WHERE idusuario=?", [usuarioid], (error, results, fields) => {
                if (error) {
                    res.status(500).json(error); // Error en motor SQL
                    return;
                }

                res.json(results);
            });
        }
    });
});

app.post("/agregarcarrito/", (req, res) => {
    const nombre = req.body.nombre
    const producto = req.body.producto
    const cantidad = req.body.cantidad

    db.query("SELECT id FROM usuario WHERE nombre=?", [nombre], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }

        if (results.length != 0) {//result es un array de objetos unico en este caso
            const usuarioid = results[0].id;

            db.query('INSERT INTO carrito (idusuario, idproducto, cantidad) VALUES (?, ?, ?)',[usuarioid, producto, cantidad], (error, results, fields) => {
                if (error) {
                    res.status(500).json(error); // Error en motor SQL
                    return;
                }

                if (results.affectedRows !== 0) {
                    res.send("OK")
                } else {
                    res.status(500).send("0 filas afectadas.")
                }
            });
        } else {
            res.status(401).send("Error de autorización: Usuario o contraseña incorrectos.");
        }
    });
});

app.post("/nuevo_usuario", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
    const confirma_contraseña = req.body.confirma_contraseña;

    if (nombre === null || contraseña === null || confirma_contraseña === null) {
        res.status(400).send("Error de mala solicitud: nombre, contraseña o confirma_contraseña no están definidos.");
        return;
    }

    if (nombre.trim().length === 0 || contraseña.trim().length === 0) {
        res.status(400).send("Error de mala solicitud: nombre o contraseña vacíos.");
        return;
    }

    if (contraseña !== confirma_contraseña) {
        res.status(400).send("Error de mala solicitud: contraseña y confirma_contraseña no coinciden.")
        return;
    }

    db.query("INSERT INTO usuario (nombre, contraseña) VALUES (?, ?)", [nombre, contraseña], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }
        if (results.affectedRows !== 0) {
            res.send("OK")
        } else {
            res.status(500).send("Error del servidor: No se pudo agregar usuario a la DB.")//se puede quitar la validación
        }
    })
});

app.post("/autenticar", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;

    if (nombre === null || contraseña === null) {
        res.status(400).send("Error de mala solicitud: nombre o contraseña no están definidos.");
        return;
    }

    db.query("SELECT * FROM usuario WHERE nombre=? AND contraseña=?", [nombre, contraseña], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }//la base de datos devuele una lista de usuarios que coinciden con estos criterios
        if (results.length != 0) {//result es un array de objetos unico en este caso
            res.send("OK")
        } else {
            res.status(401).send("Error de autorización: Usuario o contraseña incorrectos.");
        }
    })
});

app.post("/cambio_contrasena", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña_actual = req.body.contraseña_actual;
    const contraseña_nueva = req.body.contraseña_nueva;
    const confirma_contraseña = req.body.confirma_contraseña;

    if (nombre === null || contraseña_actual === null || confirma_contraseña === null) {
        res.status(400).send("Error de mala solicitud: nombre, contraseña o confirma_contraseña no están definidos.");
        return;
    }

    if (nombre.trim().length === 0 || contraseña_actual.trim().length === 0) {
        res.status(400).send("Error de mala solicitud: nombre o contraseña vacíos.");
        return;
    }

    if (contraseña_nueva !== confirma_contraseña) {
        res.status(400).send("Error de mala solicitud: contraseña y confirma_contraseña no coinciden.");
        return;
    }
//query solicitar  
//hago una reautenticación para validar la contraseña actual 
    db.query('SELECT * FROM usuario WHERE nombre=? AND contraseña=?', [nombre, contraseña_actual], (error, results, fields) => {
        if (error) {
            res.status(500).json(error); // Error en motor SQL
            return;
        }

        if (results.length == 0) {
            res.status(401).send("Error de autorización: Usuario o contraseña incorrectos.");
            return;
        }

        db.query('UPDATE usuario SET contraseña=? WHERE nombre=?', [contraseña_nueva, nombre], (error, results, fields) => {
            if (error) {
                res.status(500).json(error); // Error en motor SQL lo combierte a un string en formato json
                return;
            }
            if (results.affectedRows !== 0) {
                res.send("OK")
            } else {
                res.status(500).send("0 filas afectadas.")
            }
        });
    });
});

app.listen(3001, ()=>{
    console.log("servidor corriendo en el puerto 3001")
})
