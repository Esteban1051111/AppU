function startQRReader() {
    let html5QrcodeScanner = new Html5QrcodeScanner(
       "reader", // élément HTML où la vidéo sera insérée.
       { fps: 10, qrbox: 250 } // configuration de la lecture du QR.
    );
   
    // Permet de vérifier si le scanner est prêt.
    html5QrcodeScanner.render(false);
   
    html5QrcodeScanner.onDetected((decodedText) => {
       // Faire quelque chose avec le contenu décodé du QR.
       console.log(`QR code detected: ${decodedText}`);
   
       // Arrêter le scanner.
       html5QrcodeScanner.clear();
       // Si vous voulez continuer à scanner des QR, ne faites pas apparaître ceci.
    });
   }