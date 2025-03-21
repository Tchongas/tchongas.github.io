const pet = document.getElementById('pet');
const body = document.getElementById('body');
let mouseX = 0;
let mouseY = 0;

let moveindex = 0;

let x = window.innerWidth / 2; 
let y = window.innerHeight / 2;
const speed = 0.6;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// --- Update Position Function (Chase Logic) ---
function updatePosition() {
    // --- Calculate distance to mouse ---
    let dx = mouseX - x;
    let dy = mouseY - y;


    // Normalize the distance vector
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 1) { // Add a small dead zone to prevent jitter 
        dx /= distance;
        dy /= distance;
    }

    if (distance == 0 ) {
        body.style.cursor = 'url(../images/catcursor.png), auto';
        pet.style.visibility = 'hidden';
        pet.style.left = (0) + 'px';
        pet.style.top = (0) + 'px';
       
    }

    // Determine direction (and sprite) *before* updating position
    let direction = "";
    let spriteX = 0; // X offset for the sprite sheet
    let spriteY
    if (distance !== 0) {
        if (Math.abs(dx) > Math.abs(dy)) { // More horizontal movement
            if (dx > 0) {
                direction = "East";
                spriteX = -30; // Example: East sprite at 60px offset
                spriteY = 0; // Example: East sprite at 180px offset
            } else {
                direction = "West";
                spriteX = 120;  // Example: West sprite at 30px offset
                spriteY = 105; // Example: West sprite at 180px offset
            }
        } else { // More vertical movement (or equal)
            if (dy > 0) {
                direction = "South";
                spriteX = -30;   // Example: South sprite at 0px offset
                spriteY = -90;  // Example: South sprite at 90px offset
            } else {
                direction = "North";
                spriteX = -30;  // Example: North sprite at 90px offset
                spriteY = -40;   // Example: North sprite at 0px offset
            }
        }

        // Handle diagonal movement (optional, but good for completeness)
        if (Math.abs(dx) > 0.5 && Math.abs(dy) > 0.5) { // Adjust threshold as needed
            if (dx > 0 && dy > 0) {
            direction = "SouthEast";
            spriteX = 120;
            spriteY = 0;
            }
            else if(dx < 0 && dy > 0){
            direction = "SouthWest";
            spriteX = -30;
            spriteY = 105;
            }
            else if (dx > 0 && dy < 0) {
            direction = "NorthEast";
            spriteX = 120;
            spriteY = 0;
            } else {
            direction = "NorthWest";
            spriteX = -30;
            spriteY = 105;
            }
        }

        // --- Move the pet towards the mouse ---
        x += dx * speed;
        y += dy * speed;


        // --- Apply the new position AND background position (sprite) ---
        pet.style.left = (x - 10) + 'px';
        pet.style.top = (y - 10) + 'px';
        pet.style.backgroundPosition = `${spriteX}px ${spriteY}px`; // Use the calculated spriteX
    }


}

// --- Animation Loop ---
async function animate() {
    if (moveindex < 800) {
        updatePosition();
        requestAnimationFrame(animate);
        moveindex++;
    }
    else {
        pet.style.backgroundPosition = `320px -10px`;
        await sleep(Math.floor(Math.random() * 10000));
        moveindex = Math.floor(Math.random() * 100);
        updatePosition();
        requestAnimationFrame(animate);
    }

}


function mouseClick() {
    if (pet.style.visibility == 'hidden') {
        pet.style.visibility = 'visible';
        body.style.cursor = 'auto';
        x = mouseX ;
        y = mouseY;
        moveindex = 800;
        pet.style.left = (x - 10) + 'px';
        pet.style.top = (y - 10) + 'px';
    }
}

document.addEventListener("click", function(event) {
    mouseClick();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// --- Start the animation ---
animate();