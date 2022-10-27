$(function(){
    //Variables
        var mode = 0;//App mode
        var timeCounter = 0;//time counter
        var lapCounter = 0;//lap counter
        var action;//variable for setInterval
        var lapNumber = 0;//Number of Laps
        //minutes,seconds,centiseconds for time and lap
        var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;

    //on App load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    //Click on startButton
    $("#startButton").click(function(){
        //Mode on
        mode = 1;
        //SHow stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    })
    
    //click on stopbutton
    $("#stopButton").click(function(){
        hideshowButtons('#resumeButton','#resetButton');
        stopAction();
    })
            

    //click on resumeButton
    $("#resumeButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#stopButton","#lapButton");
        //start action
        startAction();
    })

    //Click on resetButton
    $("#resetButton").click(function(){
         //reload the page
        reloadPage();
    })
    
    //click on lapButton
    $("#lapButton").click(function(){
        //If mode is on
        if(mode){
            //stop action
            stopAction();
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
            
   })
       




//Functions
    //Hide show Buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    //start the counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            lapCounter++;
            updateTime();
        },10);
    }
    //
    function stopAction(){
        clearInterval(action);
    }

    //UpdateTime: converts counters to min,sec,centisec
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec=100entiseconds
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = Math.floor(timeCounter%6000)%100;

        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentiseconds").text(format(timeCentiseconds));

        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100entiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = Math.floor(lapCounter%6000)%100;

        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }

    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }

    //Reset Page
    function reloadPage(){
        location.reload() 
    }

    //Print lap details into the lap Box
    function addLap(){
        lapNumber++;
        var myLapDetails = 
        '<div class="lap">' +
            '<div class="laptimetitle">'+
                'Lap'+ lapNumber +
            '</div>'+
            '<div class="lapTime">'+
                '<span>'+ format(lapMinutes)+'</span>'+
                ':<span>'+ format(lapSeconds)+'</span>'+
                ':<span>'+ format(lapCentiseconds)+'</span>'+
            '</div>'+
        '</div>';
        $(myLapDetails).prependTo("#laps");
    };


})