'use strict'
 {
    var selected = null;
    var selecterRed = document.getElementById('selecterRed');
    var selecterBlue = document.getElementById('selecterBlue');
    var selecterGreen = document.getElementById('selecterGreen');
    var selecterYellow = document.getElementById('selecterYellow');

    selecterRed.addEventListener('click', () => {
        selected = selecterRed;
    })

    selecterBlue.addEventListener('click', () => {
        selected = selecterBlue;
    })

    selecterGreen.addEventListener('click', () => {
        selected = selecterGreen;
    })

    selecterYellow.addEventListener('click', () => {
        selected = selecterYellow;
    })

    document.getElementById('send').addEventListener('click',() =>{
        console.log(selected.parentNode.textContent);
    })
}