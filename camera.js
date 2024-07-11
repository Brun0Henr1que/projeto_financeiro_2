const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const closeCameraModal = document.getElementById('closeCameraModal');
const codigoResultado = document.getElementById('valor');

let qrScannerInterval;

function startQrScanner() {

    // Define o tamanho do canvas para corresponder ao tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Obtém contexto 2D do canvas e desenha o frame atual do vídeo
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Captura a imagem do canvas como um objeto ImageData
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
    });

    // Se um QR code for encontrado, exibe seu conteúdo
    if (code) {
        stopQrScanner();
        const response = decoder(code.data)
        codigoResultado.textContent = 'Valor: ' + response['Transaction Amount'];
        const addicionar_despesa = document.getElementById('add_despesa');
        const editarDespesa = document.getElementById('editarDespesa');
        const valorEdicao = document.getElementById('valorEdicao');
        addicionar_despesa.addEventListener('click', ()=>{
            closeCameraModal.click()
            editarDespesa.click()
            valorEdicao.value = parseFloat(response['Transaction Amount']);
        })
    } else {
        // Se não encontrar, continua verificando em intervalos curtos
        qrScannerInterval = setTimeout(startQrScanner, 200);
        video.style.display = 'block';
        canvas.style.display = 'none';
    }
}

function stopQrScanner() {
    clearTimeout(qrScannerInterval);
    video.style.display = 'none';
    canvas.style.display = 'block';
}

cameraBtn.onclick = function () {
    cameraModal.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            // startQrScanner(); // Inicia o scanner de QR code ao abrir a câmera
        })
        .catch((err) => {
            console.error('Erro ao acessar a câmera: ', err);
        });
};

closeCameraModal.onclick = function () {
    cameraModal.style.display = 'none';
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        video.srcObject = null;
    }
};

document.getElementById('detect').onclick = function () {
    startQrScanner(); 
    video.style.display = 'none';
    canvas.style.display = 'block';
};
