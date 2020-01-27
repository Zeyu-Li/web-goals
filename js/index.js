'use strict';

var goals = localStorage.goals;
var fgoals = localStorage.fgoals;

// data for info
function get_data() {
    let color;
    goals = goals.split(',');

    var split_goal = [];
    console.log(goals);
    for (var goal of goals) {
        split_goal.push(goal.split(';').reverse());
    }
    split_goal = split_goal.sort().reverse();
    $('.goals').empty();
    let i = 0;
    for (var to_print_goal of split_goal) {

        if (to_print_goal[0] =="") {
            break;
        }

        let date = to_print_goal[0];
        let dob = new Date(date);
        if (dob.getTime() <= $.now()) {
            color = "background-color:rgba(255, 243, 112,0.3)";
        }
        let dobArr = dob.toDateString().split(' ');
        let dobFormat = dobArr[1] + ' ' + dobArr[2]  + ' ' + dobArr[3];
        $('.goals').prepend(
            `<div class="ind_goal" id="goal_number_`+i+`" style="`+color+`">
                <div class="check_box"><input class="main_box goal_`+i+`" type="checkbox" name="goal`+i+`" value="goal`+i+`" style="float: left;"></div>
                <div class="txt">
                    <p>` + to_print_goal[1] + `<br><br>
                    <b>DUE: `+dobFormat+`</b></p>
                </div>
                <script>
                    $('.goal_`+i+`').click(function() {
                        // check box
                        $('#goal_number_`+ i +`').css('background-color', 'green');
                        delete_goals("`+to_print_goal[1]+`","`+to_print_goal[0]+`");
                    });
                </script>
            </div>`
        );
        i++;
    }
}

function find_goals(goals, to_delete) {
    let j = 0;
    for (var goal of goals) {
        if (goal == to_delete) {
            return j;
        };
        j++;
    }
}

function finished() {
    fgoals = fgoals.split(',');

    var split_f_goal = [];
    console.log(fgoals);
    for (let f_goal of fgoals) {
        split_f_goal.push(f_goal.split(';').reverse());
    }
    split_f_goal = split_f_goal.sort().reverse();
    $('.finished_goals').empty();
    let i = 0;
    for (let to_f_goal of split_f_goal) {

        if (to_f_goal[0] =="") {
            break;
        }

        let date = to_f_goal[0];
        let ddob = new Date(date);
        let dobArr = ddob.toDateString().split(' ');
        let dobFormat = dobArr[1] + ' ' + dobArr[2]  + ' ' + dobArr[3];
        $('.finished_goals').prepend(
            `<div class="ind_goal" id="goal_number_`+i+`">
                <div class="txt">
                    <p>` + to_f_goal[1] + `<br><br>
                    <b>DUE: `+dobFormat+`</b></p>
                </div>
            </div>`
        );
        i++;
    }

}

function delete_goals(message, datetime) {
    // add goals to screen and storage
    var to_delete = [message+';'+datetime];
    var index = find_goals(goals, to_delete);
    let to_done = goals.pop(index);
    localStorage.goals = goals;
    goals = localStorage.goals;
    get_data();
    add_f_goals(to_done);
}

function add_f_goals(to_done) {
    // add goals to screen and storage
    fgoals.push([to_done]);
    localStorage.fgoals = fgoals;
    fgoals = localStorage.fgoals;
    finished();
}

function add_goals(message, datetime) {
    // add goals to screen and storage
    goals.push([message+';'+datetime]);
    localStorage.goals = goals;
    goals = localStorage.goals;
    get_data();
}

// from data in json, copy to textarea
function addToTextArea(data) {
    $('#editor textarea').val(data);
}

// from data in json, copy to textarea
$.get('../markdown/TODO.md', function (data) {
    addToTextArea(data);
}, 'text');

/* Start of buttons */

// events

$('.add_event').click(function() {
    add_goals($('#message-text').val(), $('#datetimepicker').val());
});

// end of events

// add event
$('#first button').click(function() {
    // TODO: trigger prompt
    $('#datetimepicker').datetimepicker();
});

$('.d_goals button').click(function() {
    // download markdown file
    var data = new Blob([localStorage.goals + "`" + localStorage.fgoals], {type: 'text/plain;charset=utf-8'});
    let textFile = URL.createObjectURL(data);
    $('.d_goals a').attr('href', textFile);
});

$('#second button').click(function() {
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

// expand finished goals
$('#finished_goals > p').click(function() {
    $('.finished_goals').slideToggle();
});

/* End of buttons */

// popup event
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    // Button that triggered the modal
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('Event');
});

// back to top
$(".backtotop").click(function() {
    return $("html, body").animate({
        scrollTop: 0
    }, 300), !1;
});

// get completed and goals that need to be done
$(document).ready(function () {
    get_data();
    finished();
});
