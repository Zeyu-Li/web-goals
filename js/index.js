'use strict';

function addToTextArea(data) {
    $('#editor textarea').val(data);
}

$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');

// dark mode
if (localStorage.dark == "0") {
    $('#customSwitch1').trigger("click");
    $('body').css("background-color", "#e6e6e6");
}

$('#customSwitch1').click(function() {
    if (localStorage.dark == "1") {
        $('body').css("background-color", "#e6e6e6");
        localStorage.dark = 0;
    } else {
        $('body').css("background-color", "#222");
        localStorage.dark = 1;
        console.log(localStorage.dark = 1);
    }
});