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

$(".button").on("click", function () {
  name = $(".input").val()
  if (name != '') {
  $(".boxHome").addClass("hide");
  $(".boxBoard").removeClass("hide");
  $(".hi").append(name)

    } else if (name == '') {
      $(".validation").removeClass("hide");
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
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)
  }
})

$(".medium").on("click", function () {
  if (name != '') {
    medium = true;
    cantIntents = 12;
    difficulty = "Intermedio";
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)
  }
})

$(".expert").on("click", function () {
  if (name != '') {
    expert = true;
    cantIntents = 9;
    difficulty = "Experto";
    $(".atempts").append(cantIntents)
    $(".difficulty").append(difficulty)
  }
})

// <------------------------------------------------------------------------
// <---Setting + pushing ranking -------------------------------------------

function ranking (){

  var winner = {
      who: name,
      level: difficulty,
      howManyIntents: intents,
  }
  var data = localStorage.getItem('winners')

  if (data == null){
      data = [];
    } else {

    data = JSON.parse(data)
  }

  data.push(winner)
      
  localStorage.setItem('winners',JSON.stringify(data))

  function rankPush(params) {
    if (won === true) {
      for (let i = 0; i <= data.length-1; i++) {
        $(".rankAppend").append(
          `<div class="rank">
            <span>${data[i].who}</span>
            <span>${data[i].level}</span>
            <span>${data[i].howManyIntents}</span>
          </div>`)
      }
    }
  }

  rankPush()
 
}

// <------------------------------------------------------------------------
// <---If you won - lost----------------------------------------------------

function winning() {
  $(".boxBoard").addClass("opacity")
  $(".boxRank").removeClass("hide")
  $(".atemptsWon").append(intents)
  ranking()  
}

// <------------------------------------------------------------------------
// <---Won - lost-----------------------------------------------------------

function wonLost(){
  if ((easy === true) && (intents<=18) && (coincidences === 6)) {
    won = true;
    winning();
  }  else if ((easy === true) && (intents===18) && (coincidences =! 6)) {
    won = false;
  }  else if ((medium === true) && (intents<=12) && (coincidences === 6)) {
    won = true;
    winning();
  } else if ((medium === true) && (intents===12) && (coincidences =! 6)) {
    won = false;
  } else if ((expert === true) && (intents<=9) && (coincidences === 6)) {
    won = true;
    wwinning();
  } else if ((expert === true) && (intents===9) && (coincidences =! 6)) {
    won = false;
  } else {
  }
}
// <------------------------------------------------------------------------
// <---Appending cards + coincidences---------------------------------------

$("img").on("click", clickImg)

function clickImg() {
  for (i = 0; i < cardsArray.length; i++) {
    if (($(this).attr('id') == cardsArray[i].id) && (clicks <= 1)) {
      $(this).attr('src',`${cardsArray[i].src}`)
      $(this).addClass("back")
      var card = cardsArray[i]
      turnedCards.push(card)
      clicks++
    }  
    if (clicks > 2) {
      $(this).attr('src','img/tapada.jpg')
    } 
  }

  // if ($(this).attr('src','img/tapada.jpg')) {
  //   $(this).addClass("animated")
  //   $(this).addClass("flipInY")
  // }

   if (clicks == 2) {
    if(turnedCards[0].src === turnedCards[1].src){
      same = true;
      }

     if (same === true) {
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
      clicks = 0;
      turnedCards.splice(0,turnedCards.length)
      same = false;
      }, 1500)}
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


})

// <------------------------------------------------------------------------