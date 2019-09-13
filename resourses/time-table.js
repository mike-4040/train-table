var firebaseConfig = {
  apiKey: "AIzaSyARAKGFQsTjG7EjQwC8VZy5zsWj9Dwy9iA",
  authDomain: "mk-time-table.firebaseapp.com",
  databaseURL: "https://mk-time-table.firebaseio.com",
  projectId: "mk-time-table",
  storageBucket: "",
  messagingSenderId: "779882149461",
  appId: "1:779882149461:web:f3c7bdbd743de3e64986dc"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$('form').submit(function (event) {
  event.preventDefault();

  let newTrain = {
    name: $('#in-train-name').val().trim(),
    dest: $('#in-destination').val().trim(),
    first: $('#in-first-train').val().trim(),
    freq: $('#in-frequency').val().trim()
  }
  console.log(newTrain);
  database.ref().push(newTrain);
});

database.ref().on(
  "child_added",
  function (snapshot) {
    let train = {}
    Object.assign(train, snapshot.val());
    console.log('Snap: ', train);
    train.next = '99:88';
    train.away = 11;


  //   var empStartPretty = moment
  //   .unix(empStart)
  //   .format("MM/DD/YYYY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(
  //   moment(empStart, "X"),
  //   "months"
  // );


    let newRow = $('<tr>');
    newRow
      .append($('<td>').text(train.name))
      .append($('<td>').text(train.dest))
      .append($('<td>').text(train.freq))
      .append($('<td>').text(train.next))
      .append($('<td>').text(train.away))
    $('tbody').append(newRow);
  }
);