import express from "express";
const usuariosRouter = express.Router();
import sql from '../../config/database.js';


usuariosRouter.route('/').get(async (req, res) => {
    const usuarios = await sql`
select 
nombre,
documento,
direccion,
telefono,
correo,
usuario,
contrasena,
qr,
rol,
from personal_u`
    res.render('usuarios/usuarios', { usuario });
});

usuariosRouter.route('/crear').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await crear(body);
        console.log('Usuario creado');
        res.redirect('/registro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
    }
});

  export async function crear(body) {
    const usuarios= await sql`
    insert into personal_u ${sql(body,
        'nombre',
        'documento',
        'direccion',
        'telefono',
        'correo',
        'usuario',
        'contrasena',
        'rol')};`;
    console.log("usuario ingresado");
    return usuarios;
   
}
export async function getUser(username) {
    const usuarios= await sql`
      SELECT *
      FROM personal_u
      WHERE usuario = ${username};`;
  
    return usuarios[0] || null;
  }

  export async function checkUserPassword(username, password) {
    try {
        const usuario= await getUser(username);

        if (usuario) {
            const passwordMatch = (usuario.contrasena === password);

            return passwordMatch;
        } else {
            return false; // El usuario no existe
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al verificar la contraseña del usuario');
    }
}

usuariosRouter.route('/dashboard').get((req, res) => {
    // Verificar manualmente si el usuario está autenticado
    if (req.session.user) {
        console.log(req.session.user);
        const user = req.session.user;  // Aquí puedes acceder a la información del usuario

        // Lógica de redirección basada en el tipo de usuario
        switch (user.rol) {
            case 'estudiante':
                console.log("Redirigiendo estudiante a /registro");
                res.redirect('/estudiante');
                break;
            case 'profesor':
                console.log("Redirigiendo profesor a /dashboard-profesor");
                res.redirect('/profesor');
                break;
            case 'administrador':
                console.log("Redirigiendo administrador a /rcontrasena");
                res.redirect('/administrador');
                break;
            default:
                console.log("Redirigiendo a /login por defecto");
                // Redirigir a una página por defecto en caso de un rol no reconocido
                res.redirect('/login');
        }
    } else {
        // Redirigir al usuario no autenticado a una página de inicio de sesión
        res.redirect('/login');
    }
});

  usuariosRouter.route('/login').post(async (req, res) => {
    const { username, password } = req.body;

    try {
        const passwordMatch = await checkUserPassword(username, password);
        if (passwordMatch) {
            const usuario = await getUser(username);
            req.session.user = { username, rol: usuario.rol };
            res.redirect('/usuarios/dashboard');
             } else {
            // Credenciales incorrectas
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al autenticar al usuario');
    }
});



usuariosRouter.route('/logout').get((req, res) => {
    // Cerrar sesión
    req.session.destroy();
    res.redirect('/');
});


  
    
export default usuariosRouter;