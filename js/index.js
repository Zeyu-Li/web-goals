'use strict';

function addToTextArea(data) {
    $('#editor textarea').val(data);
}

$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');

$('#customSwitch1').click(function() {
    $('link[href="editor.md/css/editormd.min.css"').attr('href','https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js');
});