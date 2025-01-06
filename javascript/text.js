const video = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('capturedImage');

// Solicitar permissão e acessar a webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error('Erro ao acessar a câmera: ', error);
    });

// Capturar a imagem ao clicar no botão
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL('image/png');
    capturedImage.src = imageDataURL;
    capturedImage.style.display = 'block';
});


const video2 = document.getElementById('video');
        const recordButton = document.getElementById('recordButton');
        const downloadButton = document.getElementById('downloadButton');
        let mediaRecorder;
        let recordedChunks = [];

        // Solicitar permissão e acessar a webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                mediaRecorder = new MediaRecorder(stream);

                mediaRecorder.ondataavailable = function(event) {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };

                mediaRecorder.onstop = function() {
                    const blob = new Blob(recordedChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'video.webm';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    recordedChunks = [];
                };
            })
            .catch(error => {
                console.error('Erro ao acessar a câmera: ', error);
            });

        // Iniciar e parar gravação ao clicar no botão
        recordButton.addEventListener('click', () => {
            if (mediaRecorder.state === 'inactive') {
                mediaRecorder.start();
                recordButton.textContent = 'Parar Gravação';
            } else {
                mediaRecorder.stop();
                recordButton.textContent = 'Iniciar Gravação';
                downloadButton.style.display = 'inline-block';
            }
        });

        // Baixar o vídeo gravado ao clicar no botão de download
        downloadButton.addEventListener('click', () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'video.webm';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });