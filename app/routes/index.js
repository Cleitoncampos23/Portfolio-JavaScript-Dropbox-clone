var express = require('express');
var router = express.Router();
var formidable = require('formidable');
// o formidable é um modulo pra tratar arquivos do tipo file, ou seja, arquivos de fotos.
// formidable é voltado para arquivos.
// o formidable serve tanto para dados de formularios quanto para upload
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {

    let form = new formidable.IncomingForm({

        uploadDir: './upload',
        keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {

        res.json({
            files
        });

    });

});

module.exports = router;