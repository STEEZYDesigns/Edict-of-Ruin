'use strict'

/*
YOLO game. No save files, different outcomes depending on your choices
Can pick up any item. Some may be necessary, most are trash. Almost everything can be placed in the deck as a weapon / shield / effect
Shooting for ambition rather than reality, see how far i can push this.
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

This timing aspect is actually part of the second game, but i will be trying to implement it to change the game up a bit and make myself practice
using time intervals -- keeping track, adding up, setting delays and activating different JS funcions to animate the DOM
*/


//General Base Objects, all items that can be carried as "cards" can be found here

function BASECARD() {
    this.name = "";
    this.id = 0;
    this.description = "sample text, " + this.attack + " atk \n" + this.defend + " def \n" + this.itemStored + 
    " itemstored \n" + this.rankItem + " rankItem.";
    this.Effect = "none";

    //itemStored is a property that will allow for collecting of cards.
    //when false, this means it is a card that has just "spawned" as a reward, through battle or through a quest
    //if through battle, we have the option of taking it, where itemStored then becomes true
    //if through a quest, it will automatically be accepted, and itemStored then becomes true
    this.itemStored = false;
    this.rankItem = 0;
};

//Consumables. Key Consumable rank is === 99, special rank. Single Use and cannot be chained nor placed in the deck.
//Battle Consumables. rank will be === 89, special rank. Multi Use, stay in the deck. cannot be chained.
function ItemCard() {
    BASECARD.call(this);
    description: "Item Card: sample text \n these item cards are consumable";
    this.rankItem = 89;
}
ItemCard.prototype = Object.create(BASECARD.prototype);
Object.defineProperty(ItemCard.prototype, 'constructor', {
    value: ItemCard,
    enumerable: false,
    writable: true,
    
})







//Some battle base class cards. Attack, Defense, Escape Categories. 


//Attack Base cards. need a true "attack" attribute to be one. rank 1 - 9
function AttackCard() {
    BASECARD.call(this);
    
    this.attackRange = 0; //attR multiplies damage output based on Player stat
    this.Effect = "attack"; //need a true value to allow it to be an attack card
    this.description = "Attack Card: sample text \n these attack cards are reusable in battle.";
    this.rankItem = 1; //all attacks are between rank 1 and 9
}
AttackCard.prototype = Object.create(BASECARD.prototype);
Object.defineProperty(AttackCard.prototype, 'constructor', {
    value:AttackCard,
    enumerable: false,
    writable: true
})

//Defense Cards Base Class. Defense rank is === 10, special rank.
function DefenseCard() {
    BASECARD.call(this);

    this.defenseRange = 0; //defR is a solid check against damage Enemy does. Threshold must be passed.
    this.Effect = "defense"; //need a true value to allow it to be a defense card
    this.description = "Defense Card: sample text \n these defense cards are reusable in battle.";
    this.rankItem = 20; // special rank 10. above attacks. kind of like html status codes
}
DefenseCard.prototype = Object.create(BASECARD.prototype);
Object.defineProperty(DefenseCard.prototype, 'constructor', {
    value: DefenseCard,
    enumerable: false,
    writable: true
})

function EscapeCard() {
    BASECARD.call(this);

    this.name = "Escahpey";
    this.description = "Activate this card to try to escape the battle. Your and your enemy's SPEED affects the probability of success.";
    this.rankItem = 99; //Special return rank. Nothing should be above this card.
    this.escape = true; //Special value. Does not apply to any other object.
    this.id = 999;
    this.Effect = "Escape";
}
EscapeCard.prototype = Object.create(BASECARD.prototype);
Object.defineProperty(EscapeCard.prototype, 'constructor', {
    value: EscapeCard,
    enumerable: false,
    writable: true
})

/* Special Attack ---
    Combo'd after at least one strong attack.
    thus have rank 4 and above, Baten Kaitos had a meter that
    you would have to fill before having enough "power" to unleash
    special attacks. I will not do that as of now.
*/
function SpecialAttack() {
    AttackCard.call(this);
    this.name = "SpecialAttack";
    this.Effect = "attack";
    this.attackRange = 2.25;
    this.rankItem = 4;
    this.description = "Special Attack, in BK, first one we had was 'Blue Storm'.";
    this.id = 6;
}
SpecialAttack.prototype = Object.create(AttackCard.prototype);
Object.defineProperty(SpecialAttack, 'constructor', {
    value: SpecialAttack,
    enumerable: true,
    writable: false //for now i will only make 1 special attack...
});









/* ItemCard {}  Items . . . . . . . . . . . . . . .  . . . . . . . . . . . . .*/

//Consumables base classes here

//keyConsumable, most are single use, some are multi use for "quests",
//try my best to replicate this maybe just 1,2 ? Not like client has to know :)
function keyConsumable1() { //single use
    ItemCard.call(this);
    this.MultiUse = false; 
    this.description = "key1, which means this is a single use item. Unusable in battle.";
}
keyConsumable1.prototype = Object.create(keyConsumable1.prototype);
Object.defineProperty(keyConsumable1.prototype, 'constructor', {
    value: keyConsumable1,
    enumerable: false,
    writable: true
})

function keyConsumable2() {//multi use, generally wont have more than one copy of a "multiuse" item
    ItemCard.call(this);
    this.MultiUse = true;
    this.description = "key2, which means this is a multi-use item. Unusable in battle.";
}
keyConsumable2.prototype = Object.create(keyConsumable2.prototype);
Object.defineProperty(keyConsumable2.prototype, 'constructor', {
    value: keyConsumable2,
    enumerable: false,
    writable: true
})

//default class of a battle consumable i.e. small health potion. 
function BattleConsumable() {
    ItemCard.call(this);
    //this.MultiUse = true;  //by default all battle cards are actually reusable. i.e. Special Attacks.

    //default effect of none, like drinking water in the game, which i wont code. just an example.
    this.Statbuff = "none"; // descriptor of buff it gives. HP, MP, HP Restore, Attack, Defense, etc etc
    this.rankItem = 89; //special rank. a higher rank than attack, defense, special attacks, 
                         // rank is the same as Escape, though escape is not treated as a BattleConsumable 
                         //and will instead try to flee from battle.
    this.description = "Battle Consumable. Will stay in deck, reusable.";
}
BattleConsumable.prototype = Object.create(ItemCard.prototype);
Object.defineProperty(BattleConsumable.prototype, 'constructor', {
    value: BattleConsumable,
    enumerable: true,
    writable: true
})




//A random card that can be almost any battle-usable card. Some exceptions apply.
//Basically these cards will have a function that will "copy" one card exactly 
//from a set of pre-determined cards, default 
//later i will add in the ability for the player to alter what cards can be "copied"
 
let WildCard = () => {
    let rand = Math.floor(Math.random() * 3);

    let attackcard = new Shortsword();
    let defensecard = new LeatherShield();
    let consumablecard = new SmallHealthPotion();

    let choices = [attackcard, defensecard, consumablecard];
    
    //when WildCard function runs, it should return a "random" object to be assigned to the deck slot.

    switch(rand) {
        case 0:
            return attackcard;
            break;
        case 1:
            return defensecard;
            break;
        case 2:
            return consumablecard;
            break;
    }
}
WildCard.prototype = Object.create(ItemCard.prototype);
Object.defineProperty(WildCard.prototype, 'constructor', {
    value: WildCard,
    enumerable: true,
    writable: false
});






/* HOW DO I CONSTRUCT A 'DECK' THAT WILL HOLD OBJECTS UNTIL THEY RUN OUT AS THE USER
USES THEM, THEN REFILL ITSELF */

//let us try a deck f(x) / object, passing in parameter 'n', where 'n' will be the available size of the deck
//Baten Kaitos started with a limit of like 15 or 20, and a "hand" of 3 cards
function Deck(n) {
    this.name = "Deck";
    this.hold = true; //unsure what i can do with a variable like this. does not hurt to have.
    this.empty = 0; //a 0 is false, anything else is true. If true, then must do default deck
    this.size = n;

    //array of objects? predetermined sizes for now.
    this.__deck__ = [];
    
    //Deck hold hand? or hand holds deck????
    
    /*
    this.dealt_cards = [3];
    this.dealt_cards = new PlayerHand(); 
    */

    //default deck that a player starts the game with. Can be customized later.
    //testing different ways of loading the deck... 
    this.defaultDeck = function() {
        for (let i=0; i<=10; i++) {
            //we want to give 3 of each basic attack.
            if (i < 3)
            this.__deck__[i] = new Dagger();
            else if (i >=3 && i < 6) 
            this.__deck__[i] = new Shortsword();
            else if (i >= 6 && i < 9) 
            this.__deck__[i] = new Longsword();
            else if (i === 9) //one Special Attack. 
            this.__deck__[i] = new SpecialAttack();
            else if (i === 10) //one HealthPotion
            this.__deck__[i] = new SmallHealthPotion();
        }

        for (let i=11; i<15; i++) {
            switch (i) {
                case 11:
                    this.__deck__ [i] = new LeatherShield();
                    break;
                case 12:
                    this.__deck__[i] = new EscapeCard();
                    break;
                case 13:
                    this.__deck__[i] = WildCard();
                    break;
                case 14: 
                    this.__deck__[i] = WildCard();
                    break;
            }
        }  
    }

    this.DeckShuffle = function() {
        
        let current_index = this.__deck__.length-1;
        
        let temp_val;
        let rand_index;
        while (current_index != 0) {
            
            //console.log("CI" + current_index);
            let rand_index = Math.floor(Math.random() * current_index);
            //console.log("RI" + rand_index);
            current_index -= 1;
            //console.log("Start");

            //console.log(this.__deck__[current_index]);
            //console.log(this.__deck__[rand_index]);


            temp_val = this.__deck__[current_index];
            //console.log(temp_val);

            this.__deck__[current_index] = this.__deck__[rand_index];
            this.__deck__[rand_index] = temp_val;

            /*
            console.log("new current then rand.");
            console.log(this.__deck__[current_index]);
            console.log(this.__deck__[rand_index]);
            */
           if (current_index === 0) {
                
            }
        }
    }

    
    this.Hand = [];
    this.dealHand = function() {
        console.log("dealing hand")
        for (let i = 0; i < 3; i++) { //3 is how many the player can CURRENTLY use, BK had a system of leveling up your hand
            let dealt_card = this.__deck__.shift();
            this.Hand.push(dealt_card);
        }
    }

}
Object.defineProperty(Deck.prototype, 'constructor', {
    value: Deck,
    enumerable: true,
    writable: false
});
/*
function PlayerHand(handSize) {
    this.name = "Hand";
    this.hold = true;
    this.empty = 0; //a 0 is false, anything else is true. If true, then must do default deck
    this.size = handSize;
}
PlayerHand.prototype = Object.create(Deck.prototype);
Object.defineProperty(PlayerHand.prototype, 'constructor', {
    value: PlayerHand,
    enumerable: true,
    writable: false
});
*/