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

$('form').submit(function(event) {
  event.preventDefault();
  
  let newTrain = {
    name: $('#in-train-name').val().trim(),
    dest: $('#in-destination').val().trim(),
    first: $('#in-first-train').val().trim(),
    freq: $('#in-frequency').val().trim()}
  console.log(newTrain);

  alert(validateTrain(newTrain) || 'success');



  name = $("#inputName").val().trim();
  role = $("#inputrole").val().trim();
  date = $("#inputDate").val().trim();
  rate = parseInt($("#inputRate").val().trim());
  console.log(name, role, date, rate);
  if (name != "" && role != "" && /^\d{2}\/\d{2}\/\d{4}$/.test(date) && !Number.isNaN(rate)) {
    monthWork = Math.floor(moment(new Date()).diff(moment(date), 'months', true));
    console.log(monthWork);
    totalBill = monthWork * rate;


    database.ref().push({
      name,
      role,
      date,
      rate,
      monthWork,
      totalBill
    });
  } else {
    alert("Data input incorrect");
  }
});

database.ref().on(
  "child_added",
  function (snapshot) {
    console.log('Snap: ', snapshot.val())

    var newDiv = $("<div>")
    newDiv.addClass("row")
    newDiv.addClass("trainInfoRow")
    var nameDiv = $("<div>")
    nameDiv.text(snapshot.val().name);
    nameDiv.addClass("col-md-2")
    newDiv.append(nameDiv)
    var roleDiv = $("<div>")
    roleDiv.text(snapshot.val().role);
    roleDiv.addClass("col-md-2")
    newDiv.append(roleDiv)
    var dateDiv = $("<div>")
    dateDiv.text(snapshot.val().date);
    dateDiv.addClass("col-md-2")
    newDiv.append(dateDiv)
    var monthDiv = $("<div>")
    monthDiv.text(snapshot.val().monthWork)
    monthDiv.addClass("col-md-2")
    newDiv.append(monthDiv)
    var rateDiv = $("<div>")
    rateDiv.text(snapshot.val().rate);
    rateDiv.addClass("col-md-2")
    newDiv.append(rateDiv)
    var totalDiv = $("<div>")
    totalDiv.text(snapshot.val().totalBill);
    totalDiv.addClass("col-md-2")
    newDiv.append(totalDiv)
    $("#trainDisplay").append(newDiv)
  }
);

function validateTrain(train) {
  if (train.name === '')
    return 'Enter Train Name';
  if (train.dest === "")
    return 'Enter Train Destination';
  if (!(parseInt(train.freq) > 0))
    return 'Enter valid Frequency';
  if (!/^\d{2}\:d{2}$/.test(train.first))
    return 'Enter time in HH:MM format'
}