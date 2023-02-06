// need a function to generate a random value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    //below will return a value..
    return value
}

// need function to handle response validity for continuous fighting

var fightOrNotFight = function () {

    var promptFight = window.prompt('Would you like to Fight or Skip the battle? enter "FIGHT" or "SKIP" to continue!');

    // recursive conditional call below
    if (promptFight === "" || promptFight === null) {
        window.alert('You must enter a valid response...try again!');
        return fightOrNotFight();
    }

    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
        var confirmSkip = window.confirm('Are you sure you want to leave?')

        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip fighting...pretty soft! Adios!!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            return true;
        }

    }
    return false;
}


// fight function (now with parameter for enemy's name)
var fight = function (enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if (fightOrNotFight()) {
                // if true, leave fight by breaking loop
                break;
            }

            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name +
                " attacked " +
                enemy.name +
                ". " +
                enemy.name +
                " now has " +
                enemy.health +
                " health remaining."
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
            // player gets attacked first
        } else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name +
                " attacked " +
                playerInfo.name +
                ". " +
                playerInfo.name +
                " now has " +
                playerInfo.health +
                " health remaining."
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};


// below we need to wrap the for loop in a startGame() function

var startGame = function () {

    // will reset the players stats
    playerInfo.reset();

    // fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
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
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
var endGame = function () {
    window.alert("The Game has ended. Let's check and see how you did!");

    // below will check the local storage
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if playaer has more money than high score, set new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem('highscore', playerInfo.money);
        localStorage.setItem('name', playerInfo.name);

        alert(playerInfo.name + ' now has a score of ' + playerInfo.money + '!');
    } else {
        alert(playerInfo.name + " did not beat the score " + highScore + " test your luck again! ");

    }

    var playAgain = window.confirm('Want to play again?');

    if (playAgain) {
        startGame()
    } else {
        window.alert('Thanks for playing! Try again some other time!!!')
    }

};

//shop function to buy upgrades and edit player ability
var shop = function () {
    // ask player if they want to shop or not
    var shopOptions = window.prompt(
        "Welcome to the shop! You can REFILL, UPGRADE, or EXIT...the choics is yours. Enter one 1 for a REFILL, 2 for an UPGRADE, or 3 to EXIT"
    )

    shopOptions = parseInt(shopOptions);

    // this switch case will carry out our action
    switch (shopOptions) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert('leaving the store');
            break;
        default:
            window.alert("You need to pick a valid option, please try again!")
            // call shop to make player pick an option
            shop();
            break;

    }
}

// function needed to handle player name input

var getPlayerName = function () {
    var name = "";

    // need loop with prompt and condition below
    while (name === '' || name === null) {
        name = prompt('What is the name of your fighter?');
    }


    console.log("Your fighters name is" + name);
    return name;

}





var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        // "this" refers to an object
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 10) {
            window.alert('Refilling health will give you 20 points for 10 dollars!');
            this.health += 20;
            this.money -= 10;
        }

    },
    upgradeAttack: function () {
        if (this.money >= 5) {
            window.alert('Upgrading attack will cost you 5 dollars')
            this.attack += 8;
            this.money -= 5;
        }
        else {
            window.alert('You do not have enough money!')
        }
    }
};

var enemyInfo = [
    {
        name: 'Oppenheimer',
        attack: randomNumber(10, 14)
    },
    {
        name: 'Oppy The Opp',
        attack: randomNumber(8, 16)
    },
    {
        name: '300 Block Opp',
        attack: randomNumber(12, 18)
    }
]

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);


startGame()





