// const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');

// const cameraBtn = document.getElementById('cameraBtn');
// const cameraModal = document.getElementById('cameraModal');
// const closeCameraModal = document.getElementById('closeCameraModal');
// const codigoResultado = document.getElementById('valor');

// let scanner;

// cameraBtn.onclick = function () {
//     cameraModal.style.display = "block";
//     navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
//         .then((stream) => {
//             video.srcObject = stream;
//             video.play();
//             video.style.display = 'block';
//             canvas.style.display = 'none';
//         })
//         .catch((err) => {
//             console.error("Erro ao acessar a câmera: ", err);
//         });

//     scanner = new Instascan.Scanner({ video: video });

//     Instascan.Camera.getCameras().then(cameras => {
//         if (cameras.length > 0) {
//             scanner.start(cameras[0]); // Usa a primeira câmera encontrada
//         } else {
//             console.error('Não foi possível encontrar câmeras.');
//         }
//     }).catch(err => {
//         console.error('Erro ao acessar câmeras:', err);
//     });
// }

// document.getElementById('closeCameraModal').onclick = function () {
//     document.getElementById('cameraModal').style.display = "none";
//     const video = document.getElementById('video');
//     if (video.srcObject) {
//         const stream = video.srcObject;
//         const tracks = stream.getTracks();

//         tracks.forEach(function (track) {
//             track.stop();
//         });

//         video.srcObject = null;
//     }
// };

// document.getElementById('detect').onclick = function () {
//     const video = document.getElementById('video');
//     const canvas = document.getElementById('canvas');
//     const context = canvas.getContext('2d');

//     // Define o tamanho do canvas para corresponder ao tamanho do vídeo
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // Desenha o frame atual do vídeo no canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Oculta o vídeo e exibe o canvas
//     video.style.display = 'none';
//     canvas.style.display = 'block';

//     // Ler QR code da imagem
//     scanner.scan().then(result => {
//         codigoResultado.textContent = `Código detectado: ${result}`;
//         stopScan();
//     }).catch(err => {
//         console.error("Erro ao ler o QR code: ", err);
//         codigoResultado.textContent = "Nenhum código detectado.";
//     });
// };


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const closeCameraModal = document.getElementById('closeCameraModal');
const codigoResultado = document.getElementById('codigoResultado');

let scanner;

cameraBtn.onclick = function () {
    cameraModal.style.display = "block";
    scanner = new Instascan.Scanner({ video: video });

    Instascan.Camera.getCameras().then(cameras => {
        if (cameras.length > 0) {
            scanner.start(cameras[0]); // Usa a primeira câmera encontrada
        } else {
            console.error('Não foi possível encontrar câmeras.');
        }
    }).catch(err => {
        console.error('Erro ao acessar câmeras:', err);
    });
};

closeCameraModal.onclick = function() {
    cameraModal.style.display = "none";
    stopScan();
};

document.getElementById('detect').onclick = function() {
    // Captura a imagem do vídeo no canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Oculta o vídeo e exibe o canvas
    video.style.display = 'none';
    canvas.style.display = 'block';

    // Ler QR code da imagem
    scanner.scan().then(result => {
        codigoResultado.textContent = `Código detectado: ${result}`;
        stopScan();
    }).catch(err => {
        console.error("Erro ao ler o QR code: ", err);
        codigoResultado.textContent = "Nenhum código detectado.";
    });
};

function stopScan() {
    if (scanner) {
        scanner.stop();
    }
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
}
