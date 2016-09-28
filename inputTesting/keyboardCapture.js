// code adapted from https://github.com/cwilso/Audio-Input-Effects/blob/master/js/effects.js

function keyPress(key) {
    // console.log(key.keyCode);
    switch (key.keyCode) {
        case (49):
            console.log('1');
            break;
        case (50):
            console.log('2');
            break;
        case (51):
            console.log('3');
            break;
        case (52):
            console.log('4');
            break;
        case (53):
            console.log('5');
            break;
        case (54):
            console.log('6');
            break;
        case (55):
            console.log('7');
            break;
        case (56):
            console.log('8');
            break;
        case (57):
            console.log('9');
            break;
        case (48):
            console.log('0');
            break;
            // 49 - 57 1 - 9; 48 = 0
    };
}

window.addEventListener('keydown', keyPress);

// end of effects.js code