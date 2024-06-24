const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// // Solicitar permissão para acessar a câmera
// navigator.mediaDevices.getUserMedia({ video: true })
//     .then((stream) => {
//         video.srcObject = stream;
//         video.play();
//     })
//     .catch((err) => {
//         console.error("Erro ao acessar a câmera: ", err);
//     });

const cameraBtn = document.getElementById('cameraBtn');
const cameraModal = document.getElementById('cameraModal');
const closeCameraModal = document.getElementById('closeCameraModal');

cameraBtn.onclick = function () {
    cameraModal.style.display = "block";
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error("Erro ao acessar a câmera: ", err);
        });
    //     const html5QrCode = new Html5Qrcode("reader");
    //     html5QrCode.start(
    //         { facingMode: "environment" },
    //         {
    //             fps: 10,
    //             qrbox: 250
    //         },
    //         qrCodeMessage => {
    //             alert(`QR Code detected: ${qrCodeMessage}`);
    //             html5QrCode.stop().then(ignore => {
    //                 cameraModal.style.display = "none";
    //             }).catch(err => {
    //                 console.log(err);
    //             });
    //         },
    //         errorMessage => {
    //             console.log(errorMessage);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // Solicitar permissão para acessar a câmera

}

closeCameraModal.onclick = function () {
    cameraModal.style.display = "none";
    //     Html5Qrcode.getCameras().then(cameras => {
    //         if (cameras.length) {
    //             const html5QrCode = new Html5Qrcode("reader");
    //             html5QrCode.stop();
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
}

// window.onclick = function (event) {
//     if (event.target == cameraModal) {
//         cameraModal.style.display = "none";
//         Html5Qrcode.getCameras().then(cameras => {
//             if (cameras.length) {
//                 const html5QrCode = new Html5Qrcode("reader");
//                 html5QrCode.stop();
//             }
//         }).catch(err => {
//             console.log(err);
//         });
//     }
// }

