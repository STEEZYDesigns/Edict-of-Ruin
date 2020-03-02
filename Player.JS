'use strict'

// This will be the library of entities that players can interact and battle with. some entities are NPCs and some are combatants,
// Those that are supposed to be both (i.e. someone who you talk with normally, through some story progression perhaps, become hostile)
// will need two different objects, one for battling and one for simply being an entity that you can interact with.

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



// This is literally the player, and since I have no concept of how to organize such concepts of 
// character definition here is where it will exist.
function Player() {
    BASE_ENTITY.call(this);
    this.PlayerDeck = new Deck(15); 
    this.description = name + " is the lead character of Baten Kaitos: Eternal Wings and the Lost Ocean, \
    the main male protagonist, and the story's protagonist for the majority of the game. ";
    this.name = "Kalas"; //protagonist name. can be changed through the very first interaction with my page.
    //Battle stats, HTML should change according to these values.
    this.Stats = {
        maxhealth: 25,
        health: 25,
        attack: 3,
        defense: 1,
    };

    this.restTime = 0;//restTime is how long before next move can be initiated.
        //may have to go somewhere else. perhaps a js for the battle screen itself
    this.handSize = 3;
    this.AttackBuffed = false;
    this.DefenseBuffed = false;
    this.HealthBuffed = false;
}
Player.prototype = Object.create(BASE_ENTITY.prototype);
Object.defineProperty(Player.prototype, 'constructor', {
    value: Player,
    enumerable: false,
    writable: false,
});

let getPlayerHealth = () => {
    return PLAYER.Stats.health;
}
let setPlayerHealth = healthAffect => {
    PLAYER.Stats.health += healthAffect;
}
let getPlayerDefense = () => {
    return PLAYER.Stats.defense;
}
let setPlayerDefense = defenseAffect => {
    PLAYER.Stats.defense += defenseAffect;
}
let getPlayerAttack = () => {
    return PLAYER.Stats.attack;
}
let setPlayerAttack = attackAffect => {
    PlayerAttack *= attackAffect;
}

//Enemies will generally have only a a few attacks and MAYBE one or two specials.
// So we can say something like WeakAttack, MediumAttack, StrongAttack, SpecialAttack, and just one of each object
// we can then have a function randomly roll chances of chaining attacks, and 

//Predetermined attack patterns. i.e. will always do one of the 'following' attack patterns.


function Enemy() {
    BASE_ENTITY.call(this);
    
    this.restTime = 0;
    this.name = "ENEMY"; //default enemy name, will know i have to give value if says "ENEMY"
    
    this.Stats = {
        maxhealth: 0,
        health: 0,
        attack: 0,
        defense: 0,
    };
    //restTime in seconds
    //restTime is how long before next move can be initiated.

        //Basically each of these will simply, reach into the PLAYER object, take their HP stats, 
    //correlate some PLAYER Defense, and will subtract some result from PLAYER HP.
    //dont want arrays of object, unnecessary. So how can i say "affect PLAYER"
    //since we dont have animations really. A single attack that does total damage, and
    // perhaps an alertbox that can be turned off by default, or console.log the effects.


    this.weakpredetermined = () => {
        let enemyattack = Math.floor(this.Stats.attack*1.3);
        return PLAYER.Stats.health = PLAYER.Stats.health - enemyattack;
    }

    this.mediumpredetermined = () => {
        let enemyattack = Math.floor(this.Stats.attack*1.6);
        return PLAYER.Stats.health = PLAYER.Stats.health - enemyattack;
    }

    this.strongpredetermined = () => {
        let enemyattack = Math.floor(this.Stats.attack*1.9);
        return PLAYER.Stats.health = PLAYER.Stats.health - enemyattack;
    }
    
    this.critical = () => {
        let enemyattack = Math.floor(this.Stats.attack*4);
        return PLAYER.Stats.health = PLAYER.Stats.health - enemyattack;
    }
}
Enemy.prototype = Object.create(BASE_ENTITY.prototype);
Object.defineProperty(Enemy.prototype, 'constructor', {
    value: Enemy,
    enumerable: false,
    writable: false,
    
});


function WhinterSnek() {
    Enemy.call(this);
    this.name = "Whinter Snek";
    this.description = "The Whinter Snek likes winter, it has evolved to be extremely resistant to cold, and has developed \
    a white sheen that is great for hunting in the snowy terrains.";
    this.name = "Whinter Snek"; //default enemy name, will know i have to give value if says "ENEMY"
    this.restTime = 5000; //milliseconds
    this.Stats = {
        maxhealth: 35,
        health: 35,
        attack: 4,
        defense: 3,
    };
    this.AttackBuffed = false;
    this.DefenseBuffed = false;
    this.HealthBuffed = false;

}
WhinterSnek.prototype = Object.create(Enemy.prototype);
Object.defineProperty(WhinterSnek.prototype, 'constructor', {
    value: WhinterSnek,
    enumerable: false,
    writable: false,
    
});

