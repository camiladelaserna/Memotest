// <---Variables------------------------------------------------------------

var name = "";
var same = false;
var clicks = 0;
var turnedCards = [];
var winnersArray = [];
var coincidences = 0;
var easy = false;
var medium = false;
var expert = false;
var difficulty = "";
var intents = 0;
var cantIntents = 0;
var won = null;

// <------------------------------------------------------------------------
// <---login + name validation ---------------------------------------------

$('body').ready('load', function () {
$('.homeAudio').trigger('play');
$('.wooshSound').trigger('play');
});

$(".button").on("click", function () {
  name = $(".input").val()
  if (name != '') {
    setTimeout(function() {
      $(".boxHome").addClass("hide");
      $(".boxBoard").removeClass("hide");
      $(".hi").append(name)
      $('.homeAudio').trigger('pause');
    }, 500)

    } else if (name == '') {
      $(".validation").removeClass("hide");
      $('.errorSound').trigger('play');
 }
})

// <------------------------------------------------------------------------
// <---input decoration on click--------------------------------------------

$("input").on('click', function () {
  $("input").addClass("inputClick")
})

// <------------------------------------------------------------------------
// <---cards array----------------------------------------------------------

var cardsArray = [
  img1 = {
    src:"img/zapas.jpg",
    id:"1",
  },

  img1a = {
    src:"img/zapas.jpg",
    id:"2",
  },

  img2 = {
    src:"img/unichancho.jpg",
    id:"3",
  },

  img2a = {
    src:"img/unichancho.jpg",
    id:"4",
  },

  img3 = {
    src:"img/peces.jpg",
    id:"5",
  },

  img3a = {
    src:"img/peces.jpg",
    id:"6",
  },

  img4 = {
    src:"img/nena.jpg",
    id:"7",
  },

  img4a = {
    src:"img/nena.jpg",
    id:"8",
  },

  img5 = {
    src:"img/epelante.jpg",
    id:"9",
  },

  img5a = {
    src:"img/epelante.jpg",
    id:"10",
  },

  img6 = {
    src:"img/alce.jpg",
    id:"11",
  },

  img6a = {
    src:"img/alce.jpg",
    id:"12",
  },
]

// <------------------------------------------------------------------------
// <---random appending + cards---------------------------------------------

function shuffle(cardsArray) {
  var j
  var x
  var i
  for (i = cardsArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = cardsArray[i].id;
      cardsArray[i].id = cardsArray[j].id;
      cardsArray[j].id = x;
  }
  return cardsArray;
}

shuffle(cardsArray); 

// <------------------------------------------------------------------------
// <---Difficulty-----------------------------------------------------------

$(".easy").on("click", function () {
  if (name != '') {
    easy = true;
    cantIntents = 18;
    difficulty = "Fácil";
    $('.buttonSound').trigger('play');
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)
  } else if (name == '') {
    $('.errorSound').trigger('play');
  }
})

$(".medium").on("click", function () {
  if (name != '') {
    medium = true;
    cantIntents = 12;
    difficulty = "Intermedio";
    $('.buttonSound').trigger('play');
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)
  }
})

$(".expert").on("click", function () {
  if (name != '') {
    expert = true;
    cantIntents = 9;
    difficulty = "Experto";
    $('.buttonSound').trigger('play');
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)}
});

// <------------------------------------------------------------------------
// <---Setting + pushing ranking -------------------------------------------

function ranking (){

  var winner = {
      who: name,
      level: difficulty,
      howManyIntents: intents,
  }
  var dataEasy = localStorage.getItem('winnersEasy')
  var dataMedium = localStorage.getItem('winnersMedium')
  var dataExpert = localStorage.getItem('winnersExpert')


if (dataEasy == null){
    dataEasy = [];
} else if (dataEasy != null) {
  dataEasy = JSON.parse(dataEasy)
}

if (dataMedium == null){
  dataMedium = [];
} else if (dataMedium != null) {
dataMedium = JSON.parse(dataMedium)
}

if (dataExpert == null){
  dataExpert = [];
} else if (dataExpert != null) {
dataExpert = JSON.parse(dataExpert)
}
   
if (winner.level == "Fácil") {
  dataEasy.push(winner)
}

if (winner.level == "Intermedio") {
  dataEasy.push(winner)
}

if (winner.level == "Experto") {
  dataEasy.push(winner)
}

dataEasy.sort(function(winnerA,winnerB){
   return winnerA.howManyIntents - winnerB.howManyIntents;
})
dataEasy.slice(0,3);

dataMedium.sort(function(winnerA,winnerB){
  return winnerA.howManyIntents - winnerB.howManyIntents;
})
dataMedium.slice(0,3);

dataExpert.sort(function(winnerA,winnerB){
  return winnerA.howManyIntents - winnerB.howManyIntents;
})
dataExpert.slice(0,3);
      
  localStorage.setItem('winnersEasy',JSON.stringify(dataEasy))
  localStorage.setItem('winnersMedium',JSON.stringify(dataMedium))
  localStorage.setItem('winnersExpert',JSON.stringify(dataExpert))

function rankAppendEasy() {
  if ((won === true) && (winner.level == "Fácil")) {
    for (var i = 0; i <= dataEasy.length -1  ; i++) {
      $(".rankAppendEasy").append(
        `<div class="rank">
           <div class="centerSpan"><span>${dataEasy[i].who}</span></div>
           <div class="centerSpan"><span>${dataEasy[i].level}</span></div>
           <div class="centerSpan"><span>${dataEasy[i].howManyIntents}</span></div>
        </div>`)
    }
  }
};

function rankAppendMedium() {
  if ((won === true) && (winner.level == "Intermedio")) {
    for (var i = 0; i <= dataMedium.length -1  ; i++) {
      $(".rankAppendMedium").append(
        `<div class="rank">
           <div class="centerSpan"><span>${dataMedium[i].who}</span></div>
           <div class="centerSpan"><span>${dataMedium[i].level}</span></div>
           <div class="centerSpan"><span>${dataMedium[i].howManyIntents}</span></div>
        </div>`)
    }
  }
};

function rankAppendExpert() {
  if ((won === true) && (winner.level == "Experto")) {
    for (var i = 0; i <= dataExpert.length -1  ; i++) {
      $(".rankAppendExpert").append(
        `<div class="rank">
           <div class="centerSpan"><span>${dataExpert[i].who}</span></div>
           <div class="centerSpan"><span>${dataExpert[i].level}</span></div>
           <div class="centerSpan"><span>${dataExpert[i].howManyIntents}</span></div>
        </div>`)
    }
  }
};

rankAppendEasy()
rankAppendMedium()
rankAppendExpert()
 
}

// <------------------------------------------------------------------------
// <---If you won - lost----------------------------------------------------

function winning() {

setTimeout(function() {
  $('img').addClass('spin3')
  $('img').removeClass('bYn')
  $('.wonSound').trigger('play');
}, 1200)

    setTimeout(function() {
      $(".boxBoard").addClass("opacity")
      $(".boxRank").removeClass("hide")
      $('.wonSound').trigger('pause');
      $('.homeAudio').trigger('play');
      $(".atemptsWon").append(intents)
      ranking() 
      }, 5200)
}; 

function loosing (){
  $(".boxBoard").addClass("opacity")
  $(".boxLost").removeClass("hide")
  $('.homeAudio').trigger('play');
  $(".atemptsWon").append(intents)
}

// <------------------------------------------------------------------------
// <---Won - lost-----------------------------------------------------------

function wonLost(){
  if ((easy === true) && (intents<=18) && (coincidences === 6)) {
    won = true;
    winning();
  }  else if ((easy === true) && (intents>18) && (coincidences != 6)) {
    won = false;
    loosing();
  }  else if ((medium === true) && (intents<=12) && (coincidences === 6)) {
    won = true;
    winning();
  } else if ((medium === true) && (intents>12) && (coincidences != 6)) {
    won = false;
    loosing();
  } else if ((expert === true) && (intents<=9) && (coincidences === 6)) {
    won = true;
    winning();
  } else if ((expert === true) && (intents>9) && (coincidences != 6)) {
    won = false;
    loosing();
  } 
}
// <------------------------------------------------------------------------
// <---Appending cards + coincidences---------------------------------------

$("img").on("click", clickImg)

function clickImg() {
  $('.flipSound').trigger('play');
  $(this).addClass('spin1');
  for (i = 0; i < cardsArray.length; i++) {
    if (($(this).attr('id') == cardsArray[i].id) && (clicks <= 1)) {
      $(this).attr('src',`${cardsArray[i].src}`)
      var card = cardsArray[i]
      turnedCards.push(card)
      clicks++
    }  
    if (clicks > 2) {
      $(this).attr('src','img/tapada.jpg')
    } 
  }

   if (clicks == 2) {
    if(turnedCards[0].src === turnedCards[1].src){
      same = true;
      }

     if (same === true) {
      $(this).addClass('spin2');
      $("#" + turnedCards[0].id).addClass('spin2');
      $(this).addClass('bYn');
      $("#" + turnedCards[0].id).addClass('bYn');
      $('.spinSound').trigger('play');
      coincidences++;
      intents++;
      clicks = 0;
      turnedCards.splice(0,turnedCards.length)
      same = false;
      } else if (same == false) {
      var that = this;
      intents++
      setTimeout(function() {
      $(that).attr('src','img/tapada.jpg')
      $("#" + turnedCards[0].id).attr('src','img/tapada.jpg')
      $(that).addClass('spin1b');
      $("#" + turnedCards[0].id).addClass('spin1b');
      $('.flipSound').trigger('play');
      clicks = 0;
      turnedCards.splice(0,turnedCards.length)
      same = false;
      }, 1200)}
  }
      wonLost()
     $(".intents").html(intents);
}

// <------------------------------------------------------------------------
// <---Same or not----------------------------------------------------------

for (i = 0; i < cardsArray.length; i++) {
  if ($(this).attr('id') == cardsArray[i].id) {
     $(this).attr('src',`${cardsArray[i].src}`)
  } 
}

// <------------------------------------------------------------------------
// <---Replay---------------------------------------------------------------
$('.replay').click(function() {
  location.reload();
});

// <------------------------------------------------------------------------
// <---Animations-----------------------------------------------------------

$(".button").on("click", function () {
 $(this).addClass("animated")
 $(this).addClass("pulse")
 $(this).addClass("faster")
});

// <------------------------------------------------------------------------