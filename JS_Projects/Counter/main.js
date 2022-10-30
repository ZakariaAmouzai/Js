let count = 0;
const number = document.querySelector('.number')

function increase(){
    count++;
    number.innerHTML = count
}
function decrease(){
    count--;
    number.innerHTML = count
    
}
function reset(){
    count = 0;
    number.innerHTML = count;
}