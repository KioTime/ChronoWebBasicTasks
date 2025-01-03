function convertImage() {
    const inputFile = document.getElementById('inputFile').files[0];
    const formatSelect = document.getElementById('formatSelect').value;
    const downloadButton = document.getElementById('downloadButton');
    const formatText = document.getElementById('formatText');
    const downloadContainer = document.getElementById('downloadContainer');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const iconInput = document.getElementById('iconInput'); // Input de .ico

    if (!inputFile && formatSelect !== "image/x-icon") {
        alert('Por favor selecciona una imagen.');
        return;
    }

    // Si se seleccionó la opción .ico, mostrar el input de imagen para cargar
    if (formatSelect === "image/x-icon") {
        iconInput.click(); // Abre el diálogo de carga de imagen para .ico
    } else {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            
            img.onload = function() {
                // Ajustar el tamaño del canvas al de la imagen
                canvas.width = img.width;
                canvas.height = img.height;

                // Dibujar la imagen en el canvas
                ctx.drawImage(img, 0, 0);

                // Obtener la imagen convertida en el formato seleccionado
                const convertedDataUrl = canvas.toDataURL(formatSelect);

                // Mostrar el contenedor de descarga
                downloadContainer.style.display = 'inline-block';

                // Establecer el enlace de descarga
                downloadButton.href = convertedDataUrl;
                downloadButton.download = `imagen_convertida.${formatSelect.split('/')[1]}`;

                // Actualizar el texto con el formato de la imagen
                const format = formatSelect.split('/')[1].toUpperCase();
                formatText.textContent = `Formato: ${format}`;
            };
        };

        reader.readAsDataURL(inputFile);
    }
}

// Función para manejar la carga y conversión a .ico
document.getElementById('iconInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const iconDataUrl = e.target.result;
            const a = document.createElement('a');
            a.href = iconDataUrl;
            a.download = 'favicon.ico';  // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        reader.readAsDataURL(file);
    }
});
