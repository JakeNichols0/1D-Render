let y = 0;
let height = 50;

function move(x) {
    let pic = document.getElementById('pic');
    if(y+x <= 0 && y+x > -pic.naturalHeight * (pic.width/pic.naturalWidth)+1) {
        pic.style.objectPosition = `0px ${y+x}px`;
        y += x;
    }
}

function scale(factor) {
    let screen = document.getElementById('screen');
    if(Math.abs(height + factor) <= window.innerHeight) {
        screen.style.transform = `translate(-50%, -50%) scaleY(${height+factor})`;
        height += factor;
    }
}

addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp") {
        move(1);
    } else if(e.key === "ArrowDown") {
        move(-1);
    } else if(e.key === "PageUp") {
        scale(1);
    } else if(e.key === "PageDown") {
        scale(-1);
    }
});

addEventListener('wheel', (e) => {
    move(-e.deltaY/2);
});