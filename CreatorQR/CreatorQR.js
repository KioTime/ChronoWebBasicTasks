function generateQR() {
    const url = document.getElementById('url-input').value;
    const qrcodeContainer = document.getElementById('qrcode');

    if (url) {
        // Limpiar el contenedor antes de agregar un nuevo QR
        qrcodeContainer.innerHTML = '';

        // Crear el QR
        new QRCode(qrcodeContainer, {
            text: url,
            width: 200, // Mantiene el tamaño del QR
            height: 200
        });
    } else {
        alert('Por favor ingresa una URL.');
    }
}

function downloadQR() {
    const qrCanvas = document.querySelector('#qrcode canvas');
    if (qrCanvas) {
        const qrImage = qrCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = qrImage;
        link.download = 'qr-code.png';
        link.click();
    } else {
        alert('Por favor genera un código QR antes de descargarlo.');
    }
}
