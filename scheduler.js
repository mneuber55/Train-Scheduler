$(document).ready(function () {
     // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCG4HrqeDM6OGDVXQOYUSraVr2l56VTLzU",
    authDomain: "train-scheduler-72795.firebaseapp.com",
    databaseURL: "https://train-scheduler-72795.firebaseio.com",
    projectId: "train-scheduler-72795",
    storageBucket: "train-scheduler-72795.appspot.com",
    messagingSenderId: "428903000210"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Capture Button Click
    $("#submit-button").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        });
    })

    database.ref().on("child_added", function (snapshot) {
        newRow = $("<tr>")
        newRow.append($("<td>").text(snapshot.val().trainName));
        newRow.append($("<td>").text(snapshot.val().destination));
        newRow.append($("<td>").text(snapshot.val().frequency));

    // First Time (pushed back 1 year to make sure it comes before current time), Current Time
    var firstTimeConverted = moment(snapshot.val().trainTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % snapshot.val().frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = snapshot.val().frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        newRow.append($("<td>").text(nextTrain));
        newRow.append($("<td>").text(tMinutesTillTrain));

        $("#train-table").append(newRow);
    })
    //Clear database
    $("#clear-button").on("click", function (event) {
        database.ref().remove();
    });
})