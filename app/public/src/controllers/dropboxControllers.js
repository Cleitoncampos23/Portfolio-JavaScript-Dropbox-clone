class dropboxControllers {

    constructor() {

        this.btnSendFile = document.querySelector('#btn-send-file');
        this.inputFileEl = document.querySelector('#files');
        this.snacmodalEl = document.querySelector('#react-snackbar-root');
        this.iniEvents();
    }

    iniEvents() {

        this.btnSendFile.addEventListener('click', event => {

            // com esse método eu disparo o evento do click para
            //abrir a janela do windons
            //console.log(event.target.files);
            this.inputFileEl.click();


        });

        this.inputFileEl.addEventListener('change', event => {
            // esse método informa o processo de uopload do arquivo 
            this.uploadTask(event.target.files);
            this.snacmodalEl.style.display = 'block';
            //snacmodalEl exibe o modal oculto via css
        });

    }

    uploadTask(files) {

        let promises = []; // nesse array cada arquivo vai ter uma promessa
        // pra converter um array em uma coleção utiliza-se um oporador spreed com três pontinhos [...]
        [...files].forEach(file => {

            promises.push(new Promise((resolve, reject) => {

                let ajax = new XMLHttpRequest();

                ajax.open('POST', '/upload');
                // como a gente sabe que ele terminou de enviar o ajax
                // com ajax.onloads
                ajax.onload = event => {

                    try {
                        // resposta do nosso servidor que vai estar dentro de ajax
                        resolve(JSON.parse(ajax.responseText));

                    } catch (e) {

                        reject(e);
                    }

                }

                ajax.onerror = event => {

                    reject(event);
                }

                let formData = new FormData(); // essa API FormData recebe chave e valor

                formData.append('input-file', file);

                ajax.send(formData);

            }));
        });
        //promise all é ele que vai verificar todo mundo.
        return Promise.all(promises);
    }

}