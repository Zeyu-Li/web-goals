'use strict';

// from data in json, copy to textarea
function addToTextArea(data) {
    $('#editor textarea').val(data);
}

// from data in json, copy to textarea
$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');

/* Start of buttons */
// add event
$('#first button').click(function() {
    // TODO: trigger prompt
    $('#datetimepicker4').datetimepicker();
});

$('#second button').click(function(e) {
    // download markdown file
    var data = new Blob([$('#editor textarea').val()], {type: 'text/plain;charset=utf-8'});
    let textFile = URL.createObjectURL(data);
    $('#second a').attr('href', textFile);
});

// when copy button is clicked, the text in textarea is copied to clipboard 
$(".copy button").click(function() {
    $(".copy button").addClass("btn-success");
    $(".copy button").text("Copied");
    navigator.clipboard.writeText($('#editor textarea').val());
})

// toggle dark mode
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
    }
});
// end of toggle dark mode

/* End of buttons */

// popup event
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Event')
});
