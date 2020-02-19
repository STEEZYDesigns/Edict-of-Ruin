'use strict'

function BASE_ENTITY() {
    this.name = "Entity"; //this way we know if data has not been changed.
    this.description = "This is the base class for players and enemies. Since both are of the same functionability, \
        namely that both are based on the concept of HP and they battle. "
    
}
Object.defineProperty(BASE_ENTITY.prototype, 'constructor', {
    value: BASE_ENTITY,
    enumerable: true,
    writable: false
});


function Player() {
    BASE_ENTITY.call(this);
    this.PlayerDeck = new Deck(15);
}
Player.prototype = Object.create(BASE_ENTITY.prototype);
Object.defineProperty(Player.prototype, 'constructor', {
    value: Player,
    enumerable: false,
    writable: false,
    name: "Kalas", //protagonist name. can be changed through the very first interaction with my page.
    //Battle stats, HTML should change according to these values.
    Stats: {
        health: 25,
        attack: 3,
        defense: 1,
    },

    restTime:  0//restTime is how long before next move can be initiated.
                    //may have to go somewhere else. perhaps a js for the battle screen itself
});


//Enemies will generally have only a a few attacks and MAYBE one or two specials.
// So we can say something like WeakAttack, MediumAttack, StrongAttack, SpecialAttack, and just one of each object
// we can then have a function randomly roll chances of chaining attacks, and 

function Enemy() {
    BASE_ENTITY.call(this);

    //restTime in seconds
    //restTime is how long before next move can be initiated.
}
Enemy.prototype = Object.create(BASE_ENTITY.prototype);
Object.defineProperty(Enemy.prototype, 'constructor', {
    value: Enemy,
    enumerable: false,
    writable: false,
    name: "ENEMY", //default enemy name, will know i have to give value if says "ENEMY"
    restTime: 5,
    Stats: {
        health: 15,
        attack: 4,
        defense: 3,
    }
});


function WhinterSnek() {
    Enemy.call(this);
    this.name = "Whinter Snek"
}
WhinterSnek.prototype = Object.create(Enemy.prototype);
Object.defineProperty(WhinterSnek.prototype, 'constructor', {
    value: Enemy,
    enumerable: false,
    writable: false,
    name: "ENEMY", //default enemy name, will know i have to give value if says "ENEMY"
    restTime: 5,
    Stats: {
        health: 15,
        attack: 4,
        defense: 3,
    }
});





// This is literally the player, and since I have no concept of how to organize such concepts of 
// character definition here is where it will exist.
let PLAYER = new Player();
PLAYER.PlayerDeck.defaultDeck();

let WHINTERSNEK = new WhinterSnek();




