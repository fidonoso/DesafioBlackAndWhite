const http = require('http')
const url = require('url')
const fs = require('fs')
const Jimp = require('jimp')
//ejecutar 'node yargs.js acceso --key=123'

// https://vgezone.com/wp-content/uploads/2020/01/quees-ultrainstinto.jpg
// https://i.pinimg.com/564x/59/0e/37/590e3709dfc145781c26699983338425.jpg

let miservidor= http.createServer((req, res)=>{
    // console.clear()
    let params = url.parse(req.url, true).query;
    if(req.url.includes('/imagen')){
        console.log(params.imagen)

        Jimp.read(`${params.imagen}`, (err, imagen) => {
            console.log('procesando imagen...')
            imagen
            .resize(350, Jimp.AUTO)
            .quality(60)
            .greyscale()
            .writeAsync('newImg.jpg')
            .then(() => {
                fs.readFile('newImg.jpg', (err, Imagen) => {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                res.end(Imagen)           
                console.log('Procesamiento asincrono de imagen: listo !')
                })
            })
        })
    }
    if(req.url.includes('/estilos')){
        res.writeHead(200, {'Content-Type': 'text/css'})
        console.log('dentro de la ruta estilos')
        fs.readFile('estilos.css', 'utf-8', (err,css)=>{ 
            console.log('Estilos css cargados')
            res.end(css)
        })
    }
    if(req.url =='/'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        console.log('ruta directorio raiz')
        fs.readFile('index.html', 'utf-8', (err,inicio)=>{ 
            console.log('pagina de inicio renderizada')
            res.end(inicio)
        })
    }

})
module.exports={miservidor}