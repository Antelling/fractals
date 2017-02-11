$(function () {
    can = document.getElementById('can');
    ct = can.getContext('2d');

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        can.width = window.innerWidth;
        can.height = window.innerHeight;
        ratio = window.innerWidth / window.innerHeight;
        render();
    }

    resizeCanvas();
});

if(fractal == "mandelbrot") {
    escape = 4;
}
if(fractal == "burningship") {
    escape = 8;
}

viewportMinX = -2.5;
viewportMaxX = 2.5;
viewportWidth = viewportMaxX - viewportMinX;
viewportMinY = -2;
//now we want to find the max y
//but we want our measurements to be square
//so we need the ratio between the width and the height of the screen
ratio = window.innerWidth / window.innerHeight;
//so now viewportWidth/viewportHeight = ratio
//so vW = vH*R so vH = vW/R
viewportHeight = viewportWidth / ratio;
viewportMaxY = viewportMinY + viewportHeight;

maxIterNumb = 4000;


function render() {
    //we loop over every pixel and color it

    for (var y = 0; y <= window.innerHeight; y++) {
        for (var x = 0; x < window.innerWidth; x++) {
            //now we have a pixel point (x, y)
            //we need to convert this pixel to a point on the complex plane
            var viewX = viewportMinX + (x / window.innerWidth) * (viewportWidth);
            var viewY = viewportMinY + (y / window.innerHeight) * (viewportHeight);

            //now we find how many iterations it takes for this point to escape
            var iter = calcIter(viewX, viewY, 0, 0, 0);

            fillPoint(x, y, pickColor(iter));
        }
    }
    ct.fill();
}

function calcIter(x, y) {
    var z = 0;
    var zi = 0;
    var iterations = 0;
    var escaped = false;
    for (; iterations < maxIterNumb; iterations++) {
        if (fractal == "mandelbrot") {
            var newZ = (z * z) - (zi * zi) + x;
            var newZI = 2 * z * zi + y;
        }
        if (fractal == "burningship") {
            newZ = (Math.abs(z) * Math.abs(z)) - (Math.abs(zi) * Math.abs(zi)) + x;
            newZI = 2 * Math.abs(z) * Math.abs(zi) + y;
        }
        if ((z * z) + (zi * zi) > escape) {
            //we have escaped
            escaped = true;
            break;
        } else {
            z = newZ;
            zi = newZI;
        }
    }
    if (escaped) {
        return iterations;
    } else {
        return false;
    }
}

function fillPoint(x, y, color) {
    ct.fillStyle = color;
    ct.fillRect(x, y, 1, 1);
}

function pickColor(iter) {
    if (iter === false) {
        return "white"
    } else {
        //return grayscale(iter);
        return rainbow(iter);
    }
}


function rainbow(n) {
    n = n * 2400 / 255;
    return 'hsl(' + n + ',100%,50%)';
}

function grayscale(iter) {
    var value = iter / maxIterNumb * 100;
    return 'hsl(0,0%,' + value + '%)';
}
