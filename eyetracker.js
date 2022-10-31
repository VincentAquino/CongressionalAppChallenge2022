var heatmapInstance;
// Checks to see if start button is clicked, then create heat map canvas
var checkInterval = setInterval(function(){
    if(startedTest == true){
        heatmapInstance = h337.create({
            container: document.querySelector("#imageContainer"),
            backgroundColor: 'rgba(0,0,0,.95)',
            gradient: {
                '.5': 'gray',
                '.9': 'lightgray',
                '.95': 'white'
              },
            radius: 70
        });
        clearInterval(checkInterval);
    }
}, 10)

// Ensures that data for users eyes are different each session
window.saveDataAcrossSessions = false;

//Keeps track of where user is looking
webgazer.setGazeListener((data, timestamp)=>{
    if (data == null) {
        return;
    }
    //x and y coordinate of where user is looking
    var xprediction = data.x; 
    var yprediction = data.y; 

    //when test started, draw heatmap object at x and y coordinate
    if(startedTest == true){
        images = document.getElementById("imageContainer");
        imgWidths = images.style.width;
		imgHeights = images.style.height;

        //checks if data is undefined
        if(xprediction == null){
            xprediction = 0;
        }
        if(yprediction == null){
            yprediction = 0;
        }

        //calculates the offset of where user is looking
        mapX = xprediction - images.getBoundingClientRect().left;
        mapY = yprediction - images.getBoundingClientRect().top;

        if(mapX == null){
            mapX = 0;
        }
        if(mapY == null){
            mapY = 0;
        }

        //adds heat map data onto screen
        heatmapInstance.addData({
            x: mapX,
            y: mapY,
            value: 0.1
        });
    }
}).begin()