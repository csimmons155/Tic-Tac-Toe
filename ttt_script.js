var notOver = 0;

var brush = {
player: "x",
ai: "o"
},
game = {
isOver: false,
state: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
        ],
turn: "player",
default: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
          ],
    //when game is over ...
endGame: function(winner) {
    game.isOver = true;
    $("#gamebox").fadeOut(function() {
                          //maybe change uppercase
                          $("#play-again h1").text(winner === "draw" ? "It was a Draw!" : winner.toUpperCase() + " wins!");
                          $("#play-again").fadeIn();
                          });
},
    //called when user clicks on box
updateState: function() {
    //NOTE: may need to add "button" after div
    $("#gamebox div").each(function(i) {
                           var newVal = "";
                           var row = 0;
                           var col = 0;
                           //$(this).children("button").hasClass("o")
                           if ($(this).hasClass("oo")) {
                           newVal = "o";
                           //no else b/c div could have neither
                           //$(this).children("button").hasClass("x")
                           } else if ($(this).hasClass("xx")) {
                           newVal = "x";
                           }
                           
                           switch (true) {
                           case i < 3:
                           row = 0;
                           col = i;
                           break;
                           case i < 6:
                           row = 1;
                           col = i - 3;
                           break;
                           case i < 9:
                           row = 2;
                           col = i - 6;
                           break;
                           default:
                           throw new Error("Invalid Input");
                           }
                           game.state[row][col] = newVal;
                           
                           });
    
    var markCount = 0;
    //if x wins...
    if (game.state[0].isEqualTo(["x", "x", "x"]) || game.state[1].isEqualTo(["x", "x", "x"]) || game.state[2].isEqualTo(["x", "x", "x"]) || game.state[0][0] === "x" && game.state[1][0] === "x" && game.state[2][0] === "x" ||
        game.state[0][1] === "x" && game.state[1][1] === "x" && game.state[2][1] === "x" ||
        game.state[0][2] === "x" && game.state[1][2] === "x" && game.state[2][2] === "x" ||
        game.state[0][0] === "x" && game.state[1][1] === "x" && game.state[2][2] === "x" ||
        game.state[0][2] === "x" && game.state[1][1] === "x" && game.state[2][0] === "x") {
        
        game.endGame("x");
        
    } else if (game.state[0].isEqualTo(["o", "o", "o"]) || game.state[1].isEqualTo(["o", "o", "o"]) ||
               game.state[2].isEqualTo(["o", "o", "o"]) ||
               game.state[0][0] === "o" && game.state[1][0] === "o" && game.state[2][0] === "o" ||
               game.state[0][1] === "o" && game.state[1][1] === "o" && game.state[2][1] === "o" ||
               game.state[0][2] === "o" && game.state[1][2] === "o" && game.state[2][2] === "o" ||
               game.state[0][0] === "o" && game.state[1][1] === "o" && game.state[2][2] === "o" ||
               game.state[0][2] === "o" && game.state[1][1] === "o" && game.state[2][0] === "o") {
        
        game.endGame("o");
        
    } else {
        $("#gamebox div").each(function() {
                               if ($(this).children().length > 0) {
                               markCount++;
                               }
                               });
        if (markCount === 9) {
            game.endGame("draw");
        }
    }
    
}
    
},
ai = {
goal: [],
play: function() {
    if (game.isOver === false) {
        notOver++;
        if (notOver > 100) {
            throw new Error("Loop Error");
        }
        game.turn = "ai";
        var move = Math.floor((Math.random() * 9) + 1);
        $target = $("#gamebox div:nth-child(" + move + ")");
        if ($target.children().length > 0) { //|| $target.hasClass("o")){
            console.log("Invalid move, try again");
            ai.play();
        } else {
            //Note: may need to change this...
            $target.addClass(brush.ai + brush.ai);
            //$target.css("background-color","blue");
            $target.append("<button class =\"choice mdl-button mdl-js-button mdl-js-ripple-effect\"" + brush.ai + "><span id = \"butt\" style = \"font-size:45px\">" + brush.ai + "</span></button>");
            game.updateState();
        }
    }
}
}

Array.prototype.isEqualTo = function(array) {
    if (this.length !== array.length)
        return false;
    for (var i = this.length; i--;) {
        if (this[i] !== array[i])
            return false
            }
    
    return true;
}

function main() {
    $(".mdl-shadow--2dp").mouseover(function() {
                                    $(this).addClass("mdl-shadow--8dp");
                                    }).mouseleave(function() {
                                                  $(this).removeClass("mdl-shadow--8dp");
                                                  });
    
    //when user chooses x or o
    $(".choice").click(function() {
                       if ($(this).hasClass("o")) {
                       brush.player = "o";
                       brush.ai = "x";
                       }
                       //fade in the 3x3 grid
                       $("#choices").fadeOut(400, function() {
                                             $("#gamebox").fadeIn(function() {
                                                                  if (brush.player === "o") {
                                                                  game.turn = "ai";
                                                                  ai.play();
                                                                  }
                                                                  });
                                             })
                       })
    
    $("#gamebox div").click(function() {
                            if ($(this).children().length > 0) {
                            
                            } else {
                            //$(this).css("background-color","blue");
                            $(this).addClass(brush.player + brush.player);
                            $(this).append("<button class =\"choice mdl-button mdl-js-button mdl-js-ripple-effect\"" + brush.player + "><span id = \"butt\" style = \"font-size:45px\">" + brush.player + "</span></button>");
                            game.updateState();
                            ai.play();
                            }
                            });
    
    $("#play-again button").click(function() {
                                  game.state = game.default;
                                  $("#gamebox div").each(function() {
                                                         $(this).empty();
                                                         $(this).removeClass("oo").removeClass("xx");
                                                         })
                                  brush.player = "x";
                                  brush.ai = "o";
                                  notOver = 0;
                                  game.turn = "player";
                                  game.isOver = false;
                                  $("#play-again").fadeOut(400, function() {
                                                           $("#choices").fadeIn();
                                                           })
                                  
                                  });
    
}

$(document).ready(main());
