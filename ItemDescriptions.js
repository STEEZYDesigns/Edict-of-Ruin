'use strict'

//Baten Kaitos Origins did have a way to "upgrade" your gear, perhaps i wont do that, as the 
// 1st game didnt either, and i am making it based on the 1st one for many reasons of simplicity
// that the 1st one delivered. Like so.


//Defining some basic attacks, this is what players will "chain" during battle
//All basic attacks are rankItem 1, so they will not interfere with each other. 
//You can go from strongest attack you have to weakest, as per how Baten Kaitos was.

function Dagger() { //first inherited object. 
    AttackCard.call(this);
    this.name = "Dagger";
    this.attackRange = 1.3;
    this.rankItem = 1;
    this.description = "A small dagger, yo ***** is probably (not) bigger than this thing."
    this.id = 1;

} //Following code is necessary to set prototype and constructor of Child correctly 
Dagger.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(Dagger.prototype, 'constructor', {
    value: Dagger,
    enumerable: true,
    writable: false
});

function Shortsword() {
    AttackCard.call(this);
    this.name = "Shortsword";
    this.attackRange = 1.6;
    this.rankItem = 1;
    this.description = "Swing it, little girls might run away from your terror.";
    this.id = 2;
}
Shortsword.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(Shortsword.prototype, 'constructor', {
    value: Shortsword,
    enumerable: true,
    writable: false
});

function Longsword() {
    AttackCard.call(this);
    this.name = "Longsword";
    this.attackRange = 1.9;
    this.rankItem = 1;
    this.description = "Longsword? More like crap generic sword made of tinfoil. Who the heck made this, fire them.";
    this.id = 3;
}
Longsword.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(Longsword.prototype, 'constructor', {
    value: Longsword,
    enumerable: true,
    writable: false
});





//defense cards have a rankItem of 20 so they cannot be used between attacks. 
function LeatherShield() {
    DefenseCard.call(this);
    this.name = "LeatherShield";
    this.defenseRange = 2;
    this.id = 4;
    this.description = "some plywood and a skinned animal but hey would you rather use your bare arm";
    this.rankItem = 2;
}
LeatherShield.prototype = Object.create(DefenseCard.prototype);
Object.defineProperty(LeatherShield.prototype, 'constructor', {
    value: LeatherShield,
    enumerable: true,
    writable: true
})

//should i pass in the Player?
function SmallHealthPotion() {
    BattleConsumable.call(this);
    this.name = "Small HP"
    this.Effect = "HPRES"; // HP Restore
    this.description = "Made of the least potent Senzu Beans. That good trim!";
    this.id = 5;
    this.StatBuff = 20; //StatBuff simply refers to the base number this item will work off
    // statbuff will be according to what kind of item. i.e. atk statbuff will range from 1-3 multiplier
    // HP ranges up to the max health your player has.
}
SmallHealthPotion.prototype = Object.create(BattleConsumable.prototype);
Object.defineProperty(SmallHealthPotion.prototype, 'constructor', {
    value: SmallHealthPotion,
    enumerable: true,
    writable: true
})