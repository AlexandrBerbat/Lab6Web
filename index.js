const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todosRoutes = require('./routes/todos')
//const multer = require("multer")

const PORT = process.env.PORT || 3000

const app = express()

//const upload = multer({dest:"uploads"});

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

//app.use(multer({dest:"uploads"}).single("filedata"));

app.use(todosRoutes)

/*app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});*/

async function start()
{
    try {
        await mongoose.connect('mongodb+srv://Alexandr:m7o9n6g5o9d3b5@cluster0-nigcz.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log('Server has been started...')
        })

    }catch(e){
        console.log(e)
    }

}


start()