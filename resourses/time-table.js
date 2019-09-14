const firebaseConfig = {
  apiKey: "AIzaSyARAKGFQsTjG7EjQwC8VZy5zsWj9Dwy9iA",
  authDomain: "mk-time-table.firebaseapp.com",
  databaseURL: "https://mk-time-table.firebaseio.com",
  projectId: "mk-time-table",
  storageBucket: "",
  messagingSenderId: "779882149461",
  appId: "1:779882149461:web:f3c7bdbd743de3e64986dc"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

$('form').submit(function (event) {
  event.preventDefault();

  let newTrain = {
    name: $('#in-train-name').val().trim(),
    dest: $('#in-destination').val().trim(),
    first: $('#in-first-train').val().trim(),
    freq: $('#in-frequency').val().trim()
  }
  database.ref().push(newTrain);
  $('form').trigger('reset');
});

database.ref().on(
  "child_added",
  function (snapshot) {
    const train = snapshot.val();
    let fistToday = moment(train.first, 'HH:mm');
    let now = moment();
    let passed = now.diff(fistToday, 'minutes');;

    if(passed >= 0) {
      away = train.freq - passed % train.freq;
      next = now.add(away, 'm');
    } else {
      next = fistToday;
      away = next.diff(now, 'minutes');
    }

    let newRow = $('<tr>');
    newRow
      .append($('<td>').text(train.name))
      .append($('<td>').text(train.dest))
      .append($('<td>').text(train.freq))
      .append($('<td>').text(next.format('HH:mm')))
      .append($('<td>').text(away))
    $('tbody').append(newRow);
  }
);