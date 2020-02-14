
/*
YOLO game. No save files, different outcomes depending on your choices
Can pick up any item. Some may be necessary, most are trash. Almost everything can be placed in the deck as a weapon / shield / effect
*/

/*
HOW TO PLAY

This game is inspired from another game named Baten Kaitos. I am taking the turn based aspect and hopefully 
can create something that chains attacks together. Perhaps I will attempt some of the same restrictions, such as 
being able to only follow a certain chain of attacks. This can be done by giving card a "ranking" order. where 
perhaps 1->2->3 but a card having a value of  "99" cannot be followed by anything else.

? When battling, the more attacks / actions you make, the longer you will take to recover and make your next move.
Some actions will make you take longer as a standard. This is one mechanism of Baten Kaitos. Where healing items for example are not 
able to be chained, but will take significantly longer than a basic attack. Or also a 

*/


//General Base Objects, all items that can be carried as "cards" can be found here

function BASECARD() {
    this.name = "";
    this.id = 0;
    this.description = "sample text, \n" + this.attack + " atk \n" + this.defend + " def \n" + this.itemStored + 
    " itemstored \n" + this.rankItem + " rankItem.";
    this.attack = false;
    this.defend = false;
    this.itemStored = false;
    this.rankItem = 0;

};

//Consumables. Consumable rank is === 99, special rank. Single Use and cannot be chained.
function ItemCard() {
    this.attackRange = 0;
    this.defense = 0;
    this.description = "Item Card: sample text \n these item cards are consumable";
    this.rankItem = 99;
}

//Attack Base cards. need a true "attack" attribute to be one. rank 1 - 9
function AttackCard() {
    BASECARD.call(this);
    
    this.attackRange = 0; //attR multiplies damage output based on Player stat
    this.attack = true; //need a true value to allow it to be an attack card
    this.description = "Attack Card: sample text \n these attack cards are reusable in battle.";
    this.rankItem = 1; //all attacks are between rank 1 and 9
}

//Defense Cards Base Class. Defense rank is === 10, special rank.
function DefenseCard() {
    this.defenseRange = 0; //defR is a solid check against damage Enemy does. Threshold must be passed.
    this.defense = true; //need a true value to allow it to be a defense card
    this.description = "Defense Card: sample text \n these defense cards are reusable in battle.";
    this.rankItem = 20; // special rank 10. above attacks. kind of like html status codes
}

function EscapeCard() {
    this.description = "Activate this card to try to escape the battle. Your and your enemy's SPEED affects the probability of success.";
    this.rankItem = 99; //Special return rank. Nothing should be above this card.
    this.escape = true; //Special value. Does not apply to any other object.
}






//Defining some basic attacks, this is what players will "chain" during battle

function WeakAttack() { //first inherited object. 
    AttackCard.call(this);
    this.attackRange = 1;
    this.rankItem = 1;

} //Following code is necessary to set prototype and constructor of Child correctly 
WeakAttack.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(WeakAttack.prototype, 'constructor', {
    value: WeakAttack,
    enumerable: false,
    writable: true
});

function MediumAttack() {
    AttackCard.call(this);
    this.attackRange = 2;
    this.rankItem = 2;
}
MediumAttack.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(MediumAttack.prototype, 'constructor', {
    value: MediumAttack,
    enumerable: false,
    writable: true
});

function StrongAttack() {
    AttackCard.call(this);
    this.attackRange = 3;
    this.rankItem = 3;
}
StrongAttack.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(StrongAttack.prototype, 'constructor', {
    value: StrongAttack,
    enumerable: false,
    writable:true
});

function SpecialAttack() {
    AttackCard.call(this);
    this.attackRange = 4;
    this.rankItem = 4;
}
SpecialAttack.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(SpecialAttack, 'constructor', {
    value: SpecialAttack,
    enumerable: false,
    writable: false
});

