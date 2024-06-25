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

// closeCameraModal.onclick = function () {
//     cameraModal.style.display = "none";
// }

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