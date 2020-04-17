const epxress = require('express');
const Users = require('./models/Users');
var cors = require('cors')
const app = epxress();

app.use(epxress.json());

// lock access
// https://www.youtube.com/watch?v=gOuJE6d_l-U&list=PLmY5AEiqDWwBHJ3i_8MDSszXXRTcFdkSu&index=24
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());

    //continue proccess
    next();
});

// get list of the records
app.get('/', function (req, res) {
    Users.findAll({ raw: true }).then(function (pgto) {
        return res.json(pgto);
    });
});

// insert
app.post('/user', function (req, res) {
    Users.create({
        nome: req.body.nome,
        email: req.body.email
    }).then(function () {
        return res.json({
            success: true,
            message: "Sucesso!",
        });
    }).catch(function (err) {
        return res.json({
            success: false,
            message: "Erro: " + err,
        });
    });
});

// first or default
app.get('/user/:id', function (req, res) {
    Users.findOne({ where: { id: req.params.id } })
        .catch(function (err) {
            return res.json({
                success: false,
                message: "Erro: " + err,
            });
        });

    return res.json({
        success: true,
        message: "Sucesso!",
    });
});

// update
app.put('/user/:id', function (req, res) {
    Users.update(
        {
            nome: req.body.nome,
            email: req.body.email
        },
        { where: { id: req.params.id } }
    ).catch(function (err) {
        return res.json({
            success: false,
            message: "Erro: " + err,
        });
    });

    return res.json({
        success: true,
        message: "Sucesso!",
    });
});

// delete
app.delete('/user/:id', function (req, res) {
    Users.destroy({
        where: { 'id': req.params.id }
    }).then(function () {
        return res.json({
            success: true,
            message: "Sucesso!",
        });
    }).catch(function (erro) {
        return res.json({
            success: false,
            message: "Erro: " + err,
        });
    })
});

// start server
app.listen(8080, () => {
    console.log('Sevidor iniciado na porta 8080');
});