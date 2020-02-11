class dropboxControllers {

    constructor() {

        this.btnSendFile = document.querySelector('#btn-send-file');
        this.inputFileEl = document.querySelector('#files');
        this.snacmodalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snacmodalEl.querySelector('.mc-progress-bar-fg');
        this.nameFileEl = this.snacmodalEl.querySelector('.filename');
        this.timeleft = this.snacmodalEl.querySelector('.timeleft');
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

            this.modalShow();
            //snacmodalEl exibe o modal oculto via css

            this.inputFileEl.value = '';
        });

    }

    modalShow(show = true){

        this.snacmodalEl.style.display = (show) ? 'block' : 'none';
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

                    this.modalShow(false);
                    try {
                        // resposta do nosso servidor que vai estar dentro de ajax
                        resolve(JSON.parse(ajax.responseText));

                    } catch (e) {

                        reject(e);
                    }

                }

                ajax.onerror = event => {

                    this.modalShow(false);
                    reject(event);
                }

                ajax.upload.onprogress = event =>{

                    this.uploadProgress(event, file);
                }

               
                let formData = new FormData(); // essa API FormData recebe chave e valor

                formData.append('input-file', file);

                this.startUploadTime = Date.now();
                //O método Date.now() 
                //retorna o número de milisegundos decorridos desde 1 de janeiro de 1970 00:00:00 UTC.
                ajax.send(formData);

            }));
        });
        //promise all é ele que vai verificar todo mundo.
        return Promise.all(promises);
    }

    uploadProgress(event, file){

        let timeSpent = Date.now() -  this.startUploadTime;
        let loaded = event.loaded;
        let total  = event.total;
        let porcent =  parseInt((loaded / total) * 100);
        let timeleft = ((100 - porcent) * timeSpent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;

        this.nameFileEl.innerHTML = file.name;
        this.timeleft.innerHTML = this.formaTimeToHuman(timeleft);

        //console.log( timeSpent,timeleft, porcent);

        // a variavel loaded guarda o atributo do event que é o load, ou seja, o carregamento
        // a variavel total guarda o total de bytes do event, ou seja, o total de bytes
        // a variavel porcent calcula a variavel de loaded com o total e divide por 100
        //já o atributo progressBarEl acessar a camada de estilo do elemento filho mc-progress-bar-fg
        // e a largura do elemento filho mc-progress-bar-fg e atribui o calculo da porcentagem convertendo
        // com o parseInt
        // esse método executa essa inteligência de calcular e mostrar a porcentagem na tela da barra de progresso
        // esse método é invocado dentro da função de calback ajax.upload.onprogress
    }

    formaTimeToHuman(duration){

        // Esse método serve para formatar os segundos
        // os minutos e hora.
        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 / 60)) % 60);
        let hours = parseInt((duration / (1000 / 60 * 60)) % 24);

        if(hours > 0){

            return `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }
        if(minutes > 0){

            return `${minutes} minutos e ${seconds} segundos`;
        }
        if(seconds > 0){

            return ` ${seconds} segundos`;
        }

        return '';
    }
}