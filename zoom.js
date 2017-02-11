$(function () {
    //when the user clicks, we want to zoom in
    //when the user right clicks, we want to zoom out\
    $("#can").click(function(e){
        var point = getCursorPosition(can, e);
        var x = point[0], y = point[1];

        //now we want to convert mouse positions to viewport positions
        var viewX = viewportMinX + (x / window.innerWidth) * (viewportWidth);
        var viewY = viewportMinY + (y / window.innerHeight) * (viewportHeight);

        //now we divide the current width by 2 and center it on the position
        viewportWidth = viewportWidth / 2;
        viewportHeight = viewportWidth / ratio;
        viewportMinX = viewX - viewportWidth/2;
        viewportMinY = viewY - viewportHeight/2;
        viewportMaxX = viewX + viewportWidth/2;
        viewportMaxY = viewY + viewportHeight/2;
        render();
    })
});

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return [x, y];
}