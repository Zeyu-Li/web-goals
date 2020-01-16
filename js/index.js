'use strict';

function addToTextArea(data) {
    $('#editor textarea').val(data);
}

$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');
