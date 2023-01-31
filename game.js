// in order for this game to work we will need functions for
// game start, game end, fighting points(randomized), enemy abilities, and power ups


let fighterName = window.prompt("What is the name of your fighter?")

let fighterHealth = 100;

// below will check to see if the fighter has died
if(fighterHealth > 0) {
    console.log('Your Player is still alive');
}

let fighterAttack = 10;

//log for above variables
console.log(fighterAttack, fighterHealth, fighterName);


// below contains variables for enemy
let oppName = "Oppenheimer";

let oppHealth = 50;

let oppAttack = 12;


let fight = function () {
    window.alert("Welcome to Robo-Glads! The Ultimate Fighter Game!")


    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    oppHealth = oppHealth - fighterAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(fighterName + 'Attacked' + oppName + ". " + oppName + 'now has ' + oppHealth + ' health remaining.');

    // this will check the opps health 
    if (oppHealth <= 0) {
        window.alert(oppName + ' has fallen to the underworld')
    } else {
        window.alert(oppName + ' still has' + oppHealth + 'health left.');
    }


    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    fighterHealth = fighterHealth - oppAttack;

    // Log a resulting message to the console so we know that it worked.
    console.log(oppName + "attacked " + fighterName + '. ' + fighterName + "now has " + fighterHealth + " health remaining.")

    if(fighterHealth <= 0) {
        window.alert(figtherName + ' has died.')
    } else {
        window.alert(fighterName + ' still has ' + fighterHealth + ' health left.')
    }


}



//callback/execution function
fight(); 