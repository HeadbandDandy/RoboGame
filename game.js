var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Oppehnheimer', 'Oppy The Opp', '300-Block Opp'];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = Math.max(0, enemyHealth - playerAttack);
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = Math.max(0, playerHealth - enemyAttack);
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  } // end of while loop
}; // end of fight function


// below we need to wrap the for loop in a startGame() function

var startGame = function() {

    // will reset the players stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // fight each enemy-robot by looping over them and fighting them one at a time
for (var i = 0; i < enemyNames.length; i++) {
    // if player is still alive, keep fighting
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];
  
      // reset enemyHealth before starting new fight
      enemyHealth = Math.floor(Math.randon() * 21) + 40;
  
      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;
  
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);

      // if not at the last enemy in the array
      // ensures that the shop is called for after every fight
      if (playerHealth > 0 && i < enemyNames.length - 1) {
          // ask if player wants to shop or not
          var shopConfirm = window.confirm("The fight is over, check out some abilities in the store before the next round!")
      } if (shopConfirm) {
          shop()
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
  // after the call stack above finishes player is either out of health or no more enemies.
  endGame()

}

// function to end the game will be placed here
var endGame = function() {
    if (playerHealth > 0 ) {
        window.alert("You did pretty well!! Here is your score " + playerMoney + '.')
    } else {
        window.alert('You lost your fighter in a great battle!!!')
    }

    var playAgain = window.confirm("would you like to play again?")

    if (playAgain) {
        //restarts the game
        startGame();
    } else {
        window.alert('Thank you for playing Robo-Glads! Hope you enjoyed!!!')
    }
    
}

//shop function to buy upgrades and edit player ability
var shop = function() {
    // ask player if they want to shop or not
    var shopOptions = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attacking power, or EXIT the store? Please enter one: 'REFILL', 'UPGRADE', OR 'EXIT' please make a choice!"
    )

    // this switch case will carry out our action
    switch (shopOptions) {
        case 'REFILL':
        case 'refill':
            //need conditional to ensure player has enough money
            if (playerMoney >= 10) {
                window.alert("Refilling will cost you 10 dollars");
            }
           

        // increase health and decrease player money
             playerHealth = playerHealth + 20;
             playerMoney = playerMoney - 10;
            break;
        case 'UPGRADE':
        case "upgrade":
            if (playerMoney >= 5) {
                window.alert('Upgrading your attack will cost you 5 dollars')
            }
            

            //increae player attack while decreasing the money
            playerAttack = playerAttack + 8;
            playerMoney = playerMoney - 5;
            break;
        case 'EXIT':
        case "exit":
            window.alert('leaving the store');
            break;
            default: 
                window.alert("You need to pick a valid option, please try again!")
                        // call shop to make player pick an option
                shop();
                break;
        

        
    }
}

// need a function to generate a random value
var randomNumber = function () {
    var value = Math.floor(Math.random() * 21) + 40;

    //below will return a value..
    return value
}

startGame()





