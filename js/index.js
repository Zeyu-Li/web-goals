'use strict';

// from data in json, copy to textarea
function addToTextArea(data) {
    $('#editor textarea').val(data);
}

$(".copy button").click(function() {
    $(".copy button").addClass("btn-success");
    $(".copy button").text("Copied");
    navigator.clipboard.writeText($('#editor textarea').val());
})

// add event
$('#first button').click(function() {
    // TODO: trigger prompt
    let a;
});

$('#second button').click(function(e) {
    // TODO: download markdown file
    var data = new Blob([$('#editor textarea').val()], {type: 'text/plain;charset=utf-8'});
    let textFile = URL.createObjectURL(data);
    $('#second a').attr('href', textFile);
    console.log(textFile);
});

$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');

// dark mode
if (localStorage.dark == "0") {
    $('#customSwitch1').trigger("click");
    $('body').css("background-color", "#e6e6e6");
    $('body').css("color", "#222");
}

$('#customSwitch1').click(function() {
    if (localStorage.dark == "1") {
        $('body').css("background-color", "#e6e6e6");
        $('body').css("color", "#222");
        localStorage.dark = 0;
    } else {
        $('body').css("background-color", "#222");
        $('body').css("color", "#e6e6e6");
        localStorage.dark = 1;
        console.log(localStorage.dark = 1);
    }
});

// popup
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
});