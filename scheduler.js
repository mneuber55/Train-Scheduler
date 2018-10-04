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
        newRow.append($("<td>").text(snapshot.val().trainTime));
        newRow.append($("<td>").text(snapshot.val().frequency));
        $("#train-table").append(newRow);
    })
})