const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const closeCameraModal = document.getElementById('closeCameraModal');

cameraBtn.onclick = function () {
    cameraModal.style.display = "block";
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error("Erro ao acessar a câmera: ", err);
        });
}

document.getElementById('closeCameraModal').onclick = function() {
    document.getElementById('cameraModal').style.display = "none";
    const video = document.getElementById('video');
    if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        video.srcObject = null;
    }
};

document.getElementById('detect').onclick = function() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Define o tamanho do canvas para corresponder ao tamanho do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenha o frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Oculta o vídeo e exibe o canvas
    video.style.display = 'none';
    canvas.style.display = 'block';
};

// Ler código de barras da imagem
const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
const code = jsQR(imageData.data, canvas.width, canvas.height);

if (code) {
    codigoResultado.textContent = `Código detectado: ${code.data}`;
} else {
    codigoResultado.textContent = "Nenhum código detectado.";
}