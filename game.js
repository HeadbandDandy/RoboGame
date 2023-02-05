var playerInfo = {
    name: window.prompt("What is the name of your fighter?"),
    health: 100,
    attack: 10,
    money: 10
};

var enemyInfo = [
    {
        name: 'Oppenheimer',
        attack: 12
    },
    {
        name: 'Oppy The Opp',
        attack: 10
    },
    {
        name: '300 Block Opp',
        attack: 14
    }
]



// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    console.log(enemy)
  while (playerHealth > 0 && enemy.health > 0) {
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
    var damage = randomNumber(playerAttack - 3, playerAttack)
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerName + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(playerAttack - 3, playerAttack)
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemy.name + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
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
for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
      // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObject = enemyInfo[i];
  
      // reset enemy.health before starting new fight and assign random value
      pickedEnemyObject.health = randomNumber(40, 60);
  
      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;
  
      // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObject);

      // if not at the last enemy in the array
      // ensures that the shop is called for after every fight
      if (playerHealth > 0 && i < enemyInfo.length - 1) {
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
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    //below will return a value..
    return value
}

startGame()





