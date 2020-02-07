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
            this.inputFileEl.click();
            console.log(event.target.files);

        });

        this.inputFileEl.addEventListener('change', event => {
            // esse método informa o processo de uopload do arquivo 
            this.snacmodalEl.style.display = 'block';
            //snacmodalEl exibe o modal oculto via css
        });
    }
}