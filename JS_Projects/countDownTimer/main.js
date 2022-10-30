const newYear = '1 Jan 2023';
const daysChange = document.getElementById('days');
const hoursChange = document.getElementById('hours');
const minutesChange = document.getElementById('minutes');
const secondsChange = document.getElementById('seconds');

function countDown(){
    const newDate = new Date(newYear);  
    const currentDate = new Date();
    const seconds = Math.floor((newDate - currentDate) / 1000)
    const days =  Math.floor(seconds / 3600 / 24)
    const hours = Math.floor(seconds / 3600) % 24;
    const minutes = Math.floor(seconds / 60) % 60;
    const sec = Math.floor(seconds)%60
    console.log(days, hours, minutes, sec)

    daysChange.innerText = days
    hoursChange.innerText = hours
    minutesChange.innerText = minutes
    secondsChange.innerText = sec

}
countDown()
setInterval(countDown,1000)
