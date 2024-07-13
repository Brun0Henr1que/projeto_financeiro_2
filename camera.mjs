import QRCodeDecoder from './decoder-qr-code.js';
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d', { willReadFrequently: true });
const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const closeCameraModal = document.getElementById('closeCameraModal');
const codigoResultado = document.getElementById('valor');
const decoder = new QRCodeDecoder();

let qrScannerInterval;

// Função para iniciar o scanner de QR code
function startQrScanner() {

    // Define o tamanho do canvas para corresponder ao tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Obtém contexto 2D do canvas e desenha o frame atual do vídeo
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Captura a imagem do canvas como um objeto ImageData
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Usa a biblioteca jsQR para tentar decodificar o QR code na imagem
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
    });

    // Se um QR code for encontrado, exibe seu conteúdo
    if (code) {
        stopQrScanner();
        decoder.resetData();
        // const response = decoder(code.data)
        const response = decoder.decode(code.data)
        codigoResultado.textContent = 'Valor: ' + response['Transaction Amount'];
        const addicionar_despesa = document.getElementById('add_despesa');
        const editarDespesa = document.getElementById('editarDespesa');
        const valorEdicao = document.getElementById('valorEdicaoDespesa');
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

// Função para parar o scanner de QR code
function stopQrScanner() {
    clearTimeout(qrScannerInterval);
    video.style.display = 'none';
    canvas.style.display = 'block';
}

// Evento do botão para abrir a câmera
cameraBtn.onclick = function () {
    cameraModal.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
            video.style.display = 'block';
            canvas.style.display = 'none';
            // setTimeout(startQrScanner(), 2000); // Inicia o scanner de QR code ao abrir a câmera
        })
        .catch((err) => {
            console.error('Erro ao acessar a câmera: ', err);
        });
};

// Evento para fechar o modal da câmera
closeCameraModal.onclick = function () {
    cameraModal.style.display = 'none';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    codigoResultado.value = 'Posicione o QRcode';
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        video.srcObject = null;
    }
    stopQrScanner()
};

document.getElementById('detect').onclick = function () {
    startQrScanner(); // Inicia o scanner de QR code manualmente ao clicar em "Câmera"
    video.style.display = 'none';
    canvas.style.display = 'block';
};
