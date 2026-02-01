let y = 0;
let height = 50;
let screen = document.getElementById('screen');
let pic = document.getElementById('pic');
let current = document.getElementById('current');
let minimap = document.getElementById('minimap');
let mask = document.getElementById('mask');
let aspectRatio = pic.naturalWidth/pic.naturalHeight;
let revealed = [];

screen.style.width = pic.naturalWidth + "px";
screen.style.transform = `translate(-50%, -50%) scale(${window.innerWidth/pic.naturalWidth * 0.9}, 50)`;

minimap.style.height = pic.naturalHeight + "px";
minimap.style.width = pic.naturalWidth + "px";
minimap.style.transform = `translate(-50%, -75%) scale(${100/pic.naturalHeight})`;

current.style.height = pic.naturalHeight/100 + "px"

function move(x) {
    if(y+x <= 0 && y+x > -pic.naturalHeight) {
        y += x;
        pic.style.objectPosition = `0px ${y}px`;
    }
}

function scale(factor) {
    if(height + factor > 0 && height + factor <= window.innerHeight) {
        screen.style.transform = `translate(-50%, -50%) scale(${window.innerWidth/pic.naturalWidth * 0.9}, ${height+factor})`;
        height += factor;
    }
}

addEventListener('keydown', (e) => {
    if(e.key === "ArrowUp") {
        move(1);
        reveal(-y);
    } else if(e.key === "ArrowDown") {
        move(-1);
        reveal(-y);
    } else if(e.key === "PageUp") {
        scale(1);
    } else if(e.key === "PageDown") {
        scale(-1);
    }
});

addEventListener('wheel', (e) => {
    move(-e.deltaY/2);
    reveal(-y, true);
});

addEventListener('resize', () => {
    screen.style.transform = `translate(-50%, -50%) scale(${window.innerWidth/pic.naturalWidth * 0.9}, ${height})`;
});

function reveal(pixle, scroll=false) {
    let r = -1;
    current.style.top = pixle + "px";
    for(let i=0; i<revealed.length; i++) { //Checks if the coord has already been revelaed or borders one that has been
        if(pixle >= revealed[i][0] && pixle <= revealed[i][1]) {
            return;
        } else if(pixle == revealed[i][0] - 1) {
            console.log(`U-${pixle} | ${revealed.length}`);
            revealed[i][0] = pixle;
            r = i;
            break;
        } else if(pixle == revealed[i][1] || pixle == revealed[i][1] + 1) {
            if(revealed[i+1] && pixle == revealed[i+1][0] - 1) {
                console.log("MERGE");
                revealed[i][1] = revealed[i+1][1];
                revealed.splice(i + 1, 1);
                mask.removeChild(mask.children[i+1]);
            } else {
                console.log(`D-${pixle} | ${revealed.length}`);
                revealed[i][1] = pixle;
            }
            r = i;
            break;
        }
    }
    let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    if(r >= 0) {
        mask.replaceChild(polygon, mask.children[r]);
    } else {
        mask.appendChild(polygon);
        r = revealed.length;
        revealed.push([pixle, pixle+1]);
        revealed.sort((a, b) => {return a[0] - b[0]});
    }
    for (p of [[0, revealed[r][0]], [pic.naturalWidth, revealed[r][0]], [pic.naturalWidth, revealed[r][1]], [0, revealed[r][1]]]) {
        let point = document.getElementById("svg").createSVGPoint();
        point.x = p[0];
        point.y = p[1];
        polygon.points.appendItem(point);
    }
}

//form validation
document.getElementById('upload').addEventListener('change', (e) => {
    if(!(/(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i.exec(e.target.value))) {
        document.getElementById('error').innerText = "File type not supported";
        e.target.value = '';
    }
});