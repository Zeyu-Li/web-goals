'use strict';

// inits if empty
if (localStorage.todo == undefined) {
    localStorage.todo = [];
} else if (localStorage.goals == undefined) {
    localStorage.goals = [];
} else if (localStorage.fgoals == undefined) {
    localStorage.fgoals = [];
} else if (localStorage.isLocal == undefined) {
    localStorage.isLocal == false;
}

// global inits
var goals = localStorage.goals;
var fgoals = localStorage.fgoals;
var todo = localStorage.todo;
let isLocal = localStorage.isLocal != 'false';
// adds to markdown editor
if (isLocal) {
    $.get('../markdown/TODO.md', function (data) {
        // from data in json, copy to textarea
        addToTextArea(data);
    }, 'text');
} else {
    addToTextArea(todo);
}


// functions
function remove(phase) {
    // find if var to delete is found in goals array
    let splitGoals = goals.toString().split(",");
    let tmp = localStorage.goals;
    let length = phase.length
    // TODO: fix easing a goal
    console.log("Erase:", tmp.slice(0,tmp.indexOf(phase)) + tmp.slice(tmp.indexOf(phase)+length))
}

function delete_goals(phase) {
    // delete goal from screen and storage
    let to_done = remove(phase);
    goals = localStorage.goals;
    get_data();
    add_f_goals(phase);
}

function add_f_goals(to_done) {
    // add finished goals to finished screen and storage
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

function addToTextArea(data) {
    // from data in json, copy to textarea
    $('#editor textarea').val(data);
}

function clear() {
    // clears text area
    $(".form-group textarea").val('');
}

// data for info
function get_data() {
    // init var
    let color;

    // parse through goals
    goals = goals.split(',');
    let split_goal = [];
    for (let goal of goals) {
        split_goal.push(goal.split(';').reverse());
    }
    split_goal = split_goal.sort().reverse();

    // empties goals class to build new goals
    $('.goals').empty();

    // for each goal in formatted goal, 
    // if it is trivial, don't print anything, otherwise 
    // print the goals out
    let i = 0;
    for (let to_print_goal of split_goal) {
        if (to_print_goal[0] == "") {
            break;
        }

        // formats date
        let date = to_print_goal[0];
        let dob = new Date(date);
        if (dob.getTime() <= $.now()) {
            // if it is past due, color it yellow
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
                        $('#goal_number_`+ i +`').css('background-color', 'green');
                        delete_goals("`+to_print_goal[1]+`;`+date+`");
                    });
                </script>
            </div>`
        );
        i++;
    }
}

function finished() {
    // similar function to get_data
    fgoals = fgoals.split(',');

    let split_f_goal = [];
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

function save() {
    todo = $('#editor textarea').val();
    localStorage.todo = todo;
}
// end of functions

/* Start of buttons */

// add events
$('.add_event').click(function() {
    // call add event
    add_goals($('#message-text').val(), $('#datetimepicker').val());
    clear();
});
// end of add events

// add event
$('#first button').click(function() {
    // get datetime
    $('#datetimepicker').datetimepicker();

    // get time now and set it to default
    let dtnow = new Date();
    let time_now = dtnow.toLocaleDateString("en-US") + " " + dtnow.getHours()+":"+dtnow.getMinutes();
    $('#datetimepicker').val(time_now);
});

$('#second button').click(function() {
    // saves markdown file
    let data = new Blob([$('#editor textarea').val()], {type: 'text/plain;charset=utf-8'});
    let textFile = URL.createObjectURL(data);
    $('#second a').attr('href', textFile);
});

$('.d_goals button').click(function() {
    // download markdown file
    let data = new Blob([localStorage.goals], {type: 'text/plain;charset=utf-8'});
    let textFile = URL.createObjectURL(data);
    $('.d_goals a').attr('href', textFile);
});

$(".copy .copy_btn").click(function() {
    // when copy button is clicked, the text in textarea is copied to clipboard 
    $(".copy .copy_btn").addClass("btn-success");
    $(".copy .copy_btn").text("Copied");
    navigator.clipboard.writeText($('#editor textarea').val());
})

$(".copy .save").click(function() {
    // when copy button is clicked, the text in textarea is copied to clipboard 
    $(".copy .save").addClass("btn-success");
    $(".copy .save").text("Saved");
    save();
})
/* End of buttons */

$(".copy .deleter").click(function() {
    // when copy button is clicked, the text in textarea is copied to clipboard 
    $(".copy .deleter").addClass("btn-success");
    $(".copy .deleter").text("Deleted");
    fgoals = [];
    localStorage.fgoals = fgoals;
})
/* End of buttons */

// popup event
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    // Button that triggered the modal
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    let modal = $(this);
    modal.find('.modal-title').text('Event');
});

$(document).ready(function () {
    // toggle dark mode on load
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
    // get completed and goals that need to be done
    // on load
    get_data();
    finished();
    // return to top
    return $("html, body").animate({
        scrollTop: 0
    }, 300), !1;

    // save data every 100 minutes
    setInterval(function(){ save(); }, 6000000);
});

// expand/see finished goals
$('#finished_goals > p').click(function() {
    $('.finished_goals').slideToggle();
});

// back to top
$(".backtotop").click(function() {
    return $("html, body").animate({
        scrollTop: 0
    }, 300), !1;
});
