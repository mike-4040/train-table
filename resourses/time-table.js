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
  database.ref().push(newTrain);
});

database.ref().on(
  "child_added",
  function (snapshot) {
    let train = {}
    Object.assign(train, snapshot.val());
    train.next = '99:88';
    train.away = 11;

    let fistTrain = moment(train.first, 'hh:mm');
    let now = moment();
  
    console.log('First Train', fistTrain);
    console.log('Now', now);
    let passed = 0;
    if(fistTrain.isBefore(now)) {
      console.log('before');
      passed = now.diff(fistTrain, 'minutes');
      train.away = train.freq - passed % train.freq;
      train.next = now.add(train.away, 'm').format('hh:mm');
    } else {
      console.log('after');
      train.next = train.first;
    }
    console.log('Passed', passed);


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