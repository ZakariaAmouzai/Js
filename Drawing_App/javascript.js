$(function(){
    $('#slider').slider({
        min:3,
        max:30,
        slide: function(event, ui){
           $('#circle').height(ui.value);
           $('#circle').width(ui.value);
        }
    });

    //Declare variables
        var paint = false;//painting-erasing or not
        var paint_erase = "paint";//painting or erasing
        var canvas = document.getElementById("paint");//get the canvas 
        var ctx = canvas.getContext("2d");//and context
        var container = $("#container");//get the canvas container
        var mouse = {x:0 ,y: 0}//mouse position

    //onload load saved work from lacalStorage
    if(localStorage.getItem("imgCanvas")!= null){   
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0,0);
        }  
        img.src = localStorage.getItem("imgCanvas")
    };

    //Set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //Click inside container
    container.mousedown(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x =  e.pageX - this.offsetLeft;
        mouse.y =  e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y)
    });

    //Move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x =  e.pageX - this.offsetLeft;
        mouse.y =  e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    //Mouse up-> we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    });

    //If we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
        paint = false;
    });

    //click on reset button  
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button  
    $('#save').click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        }else{
            window.alert("Your browser does not support local storage");
        }
    })
    //click on erase button  
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase"
        }else{
            paint_erase == "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    //change color input 
    $('#paintColor').change(function(){
        $("#circle").css("background-color",
        $(this).val());
    })

    //change lineWidth using slider
    $('#slider').slider({
        min:3,
        max:30,
        slide: function(event, ui){
           $('#circle').height(ui.value);
           $('#circle').width(ui.value);
           ctx.lineWidth = ui.value;
        }
    });

    //Functions  
});