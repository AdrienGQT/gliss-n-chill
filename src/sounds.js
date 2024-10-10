
//La partie sound

let ambiance01 = document.getElementById('ambiance01');

ambiance01.volume = 1;

// le son pour notre background de BG
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

//un pti nœud de gain (pour contrôler le volume)
var gainNode = audioContext.createGain();
gainNode.gain.value = 0.09; // Valeur de gain (volume) entre 0 et 1, ici 50%

// Taille du buffer
var bufferSize = 4096;

// Génération du bruit brun
var brownNoise = (function() {
    var lastOut = 0.0;
    var node = audioContext.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            var white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // (approximation pour compenser le gain)
        }
    };
    return node;
})();

//Pour Connecter le bruit brun au nœud de gain, puis à la sortie audio
brownNoise.connect(gainNode);
gainNode.connect(audioContext.destination);

function playMusic() {
    // Récupère l'élément audio par son ID
    var music = document.getElementById("myMusic");
    
    // Joue la musique
    music.play();
}
