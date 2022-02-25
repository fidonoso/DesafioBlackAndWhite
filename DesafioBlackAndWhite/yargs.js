const yargs = require('yargs')
const {miservidor}=require('./index.js')
//ejecutar 'node yargs.js acceso --key=123'

const pass = 123
const argv = yargs
.command('acceso', 'Comando para levantar el servidor',
{
    key: {
    describe: 'Contraseña',
    demand: true,
    alias: 'k',
    },
},
(args) => {
    if(args.key ==pass){
        console.log('clave aceptada')
        miservidor.listen(3000,()=>{ console.log(`Servidor escuchando en el puerto 3000 con PID ${process.pid}`)})
    }else{
        console.log('acceso denegadoo. Credenciales incorrectas')
    }
}
)
.help().argv