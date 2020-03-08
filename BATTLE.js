//'use strict' //unable to use due to addEL, removeEL in the same function 
//initializer, as in, happens once when the game begins. as in the setup
// to actually battle. objects/entities must be generated and then give the player the opportunity to actually click on html blocks that will then start "playing"


window.onload = function() {
    
    console.log("Game has begun.");
    this.Startgame();

    //When the game begins. we want a few things

    // 1st. Player Object, PLAYER ~~~ 2nd. Enemy Object(s), WHINTERSNEK ~~~ COMPLETE. These objects exist,
    
    // 3rd. Timer to keep track of how long it takes to win (losing means the time is irrelevant) //setTimeout(), setInterval(), clearTimeOut(), clearInterval

    // 4th. Player's Hand to generate. ~~~ complete.
    
    
    
}

function Startgame() {
    var modal = document.getElementById("StartGameModal");
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        this.game();
        }
    } 
}

function game() {

    let sec = 0;
    let min = 0;

    function Timer() {
        let time = min + ":" + sec; //string
        let BT = document.getElementById("Timer");
        sec += 1;
        BT.textContent = time;
        
        if (sec == 60) {
            min += 1;
            sec = 0;
        }
        
    }
    
    this.setInterval(Timer, 1000);


    let PLAYER = new Player();
    //number of enemies atm: 1. Maybe have an array when I make multiple enemies?
    let WHINTERSNEK = new WhinterSnek();

    PLAYER.PlayerDeck.defaultDeck();
    PLAYER.PlayerDeck.DeckShuffle();
    PLAYER.PlayerDeck.dealHand();

    let clearFlag = false;
    HandDivFill(WHINTERSNEK, PLAYER);

    // 5th. Player's Hand to be available for onclick event handlers
    //let us grab the Player Hand and assign each of the array to a div that will have a eventlistener
    addCardEffect(WHINTERSNEK, PLAYER);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Snek: Ssssstart an interval ssssso I can attackk.
    //EnemyAttackCycle(WHINTERSNEK); //~~for as many enemies there are, we pass each one created, and give a cycle to each.
    // do while?
}








//Card Text Filler. 
function HandDivFill(WHINTERSNEK, PLAYER) {
    let Hand = PLAYER.PlayerDeck.Hand; //holds an itemCard;
    
    //x = document.createElement("div"),
    //y = document.createElement("div"),
    //z = document.createElement("div"),
    
    //console.log(Hand[0]); //testing

    //check if hand is empty
    if (Hand === undefined || Hand.length === 0) {
        // array empty or does not exist
        console.log("Deal a Hand before Div Filling");
        PLAYER.PlayerDeck.dealHand();
    }

    else {
        //there are some number of cards.
        let inHand = PLAYER.PlayerDeck.Hand.length;
        console.log("HandDivFill, there are " + inHand + " cards");

        if (inHand === 3) {} //do nothing, full hand
        else { //we must refreshHand();
            PLAYER.PlayerDeck.refreshHand();
        }
    }



    //clear all Card divs
    let clearDivs = document.getElementsByClassName("Card");
    //console.log(clearDivs);
    Array.from(clearDivs).forEach((element) => {
        element.innerHTML = "";
    });

    //give each div a new card that is in the hand
    for (let i = 0; i < Hand.length; i++) {
        let x = document.createElement("span");
        let text;
        //console.log(i);
        if (Hand[i].rankItem === 1 || Hand[i].rankItem === 4) {
            text = document.createTextNode(Hand[i].name + ' : \n' + Hand[i].description + '\n' + Hand[i].attackRange + " Atk Multiplier");
        }
        else if (Hand[i].rankItem === 2) {
            text = document.createTextNode(Hand[i].name + ' : \n' + Hand[i].description + '\n' + Hand[i].defenseRange + " defense");
        }
        else if (Hand[i].rankItem === 89) {
            text = document.createTextNode(Hand[i].name + ' : \n' + Hand[i].description + '\n' + Hand[i].StatBuff + " \n Consumable: HPRes, ATKx, DEFx, etc");
        }
        else {
            text = document.createTextNode(Hand[i].name + ' : \n' + Hand[i].description);
        }
        //console.log(text);
        x.appendChild(text);
        
        
        document.getElementsByClassName("Card")[i].appendChild(x);
    }
}






function addCardEffect(WHINTERSNEK, PLAYER) {
    //console.log(Cards);
    let Cards = PLAYER.PlayerDeck.Hand;
    let CardDivsArray = Array.from(document.getElementsByClassName("Card"));
    let CardDivs = [];
    //console.log(typeof(CardDivs));
    let counter = 0;

    /*
    console.log(Cards);
    console.log(Cards[0]);
    */
    //console.log(Cards[counter]);
    

    CardDivsArray.forEach(Divelement => {
        //console.log(Cards[counter]); //console.log(Cards);
        let x = Cards[counter];
        //console.log(x);
        CardDivs.push({
            Divelement, 
            x,
            addEffect() { 
                this.removeEventListener("click", arguments.callee);
                removeCardContent(Divelement);
                PlayerAttack(WHINTERSNEK, PLAYER, x);
                PlayerDefense(WHINTERSNEK, PLAYER, x);
                PlayerEscape(x);
                PlayerConsumable(PLAYER, x);
                CardDivs.forEach(Obj => {
                    //console.log("test" + Obj.x.Effect);
                    //console.log(x.Effect);
                    if (Obj.x.Effect !== x.Effect) {
                        //console.log("test2");
                        Obj.Divelement.removeEventListener("click", Obj.addEffect);
                    }
                });
            } //addeffect to each div
        }) 
        
        counter += 1;
        
    });

    //console.log(EffectedCards);
    counter = 0;
    CardDivs.forEach(ClickObject => {
        //console.log(ClickObject.counter);
        //console.log(ClickObject.x);
        ClickObject.Divelement.addEventListener("click", ClickObject.addEffect);

        //console.log(Card);
        counter += 1;
    });
}


function removeCardContent(SingleRemove) {
    //SingleRemove parameter is the single card I should be able to remove. And in this function I will only remove the DivContent of the Div passed.
    //console.log("remove Card: "); console.log(SingleRemove);
    SingleRemove.textContent = " . . . ";
}

/*
                    console.log("should remove all non attack");
                    Array.from(CardDivs).forEach(element => {
                        //console.log(element.Effect);
                        let DivSplit = element.textContent;
                        DivSplit = DivSplit.split(" ");
                        console.log("DS " + DivSplit[0]);
                        if (DivSplit[0] === "Dagger" || DivSplit[0] ===  "Shortsword" || DivSplit[0] === "Longsword") {
                            //then I should be able to push all those i dont want in 
                            similarCards.push(DivSplit[0]);
                        }
                        else {
                            //push into an array that cannot be clicked on. as they are not similar cards
                            differentCards.push(DivSplit[0]);
                        }
                        console.log(similarCards);
                        console.log(differentCards);
                    });
 */






//how to make it so, I can only click on cards that also have an attack feature. 
    //1st disable the card selected. ~~~ I figure this should be done on the eventlistener, scroll up.
    //2nd disable all cards that should not be able to be selected, i.e. if the other cards are defense and buffs, disable them
                    //way too complicated atm. perhaps just wait the 5 initial seconds 
                    //then redo the hand.
                    //but how to stop myself from ever chaining attack/defense/buffs
    //3rd make the exception for special attack through rankItem.
    //4th 
    //should start a seperate timer here. that will end the turn / chaining when reaches 0
    //should reset the timer every time you add on a card? which means the chain continues.
    //5th 
    //shift every card you select into a "used" pile (that will then clear itself) 
    //if your deck is depleted, will reshuffle your deck and redeal hand (once deck is depleted)

    //6th
    //else if the deck is not depleted, shift up to 3 cards back into the hand.

    //7th 

const PlayerAttack = (WHINTERSNEK, PLAYER, Card) => { // I need an internal timer that allows "chaining" attacks, so that more new cards can be added to the hand.
    
    if (Card.Effect !== "attack") {
        return;
    }

    console.log("You have attacked! W/ " + Card.name);
    //console.log();

    //first --> decrease enemy health and health bar.
    let EnemyDmg = Card.attackRange * PLAYER.Stats.attack;
    //console.log(EnemyDmg); //WHINTERSNEK.Stats.health -= EnemyDmg;
    WHINTERSNEK.Stats.health -= EnemyDmg;
    console.log(Card.description);
    console.log("Whinter Snek's health: " + WHINTERSNEK.Stats.health);
    /*  width: 180px; div: Enemy, div class HPBar .......... PlayerHP is represented by numbers. So EnemyAttack just needs to 
    change numbers according to Player health*/
   
    let percent = WHINTERSNEK.Stats.health / WHINTERSNEK.Stats.maxhealth;
    let HPBar = document.getElementById("HPBar").offsetWidth;
    //console.log ("Make HP Bar: " + percent + "% of " + HPBar);
    percent *= 180;
    HPBar = percent;
    document.getElementById("HPBar").style.width = HPBar + "px";
    //console.log(HPBar);
    if (HPBar <= 150) {
        document.getElementById("HPBar").style.backgroundColor = "#ff0";
    }
}

//The following types of actions a player can take are unchainable and thus must have
//a function that will clear the Div / eventListener . shift from hand to discard, deck to hand. fix sparse array in hand. 
// wait/disable all other cards for 5 seconds. add text and effects to divs again.

function BattleTimerSet() {
    //eventlistener cleared before this runs.
    let sec = 5;
    let hundsec = 0;
    let BT = document.getElementById("BattleTimer");
    //console.log(BT.textContent);
    BT.textContent = BT.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

    
    let BATTLETIMER = this.setInterval(BattleTimer, 10);

    function BattleTimer() {
        let time = sec + ":" + hundsec; //string
        let BT = document.getElementById("BattleTimer");
        //console.log(BT);
        
        if (hundsec === 0) {
            hundsec = 99;
            sec -=1;
        }
        else hundsec -= 1; //as in tenths, hundreths place in decimal.

        if (sec === 0 && hundsec === 0) {
            time = "5:00"
            BT.textContent = time;
            console.log("BT end");
            stopInterval();
            RefreshHand();
        }

        BT.textContent = time;
        
        
    }
    function stopInterval() {
        clearInterval(BATTLETIMER);

        //once interval stops all divs should clear eventlistener
        /*
        let Cards = document.getElementsByClassName("Card");
        for (let i = 0; i < Cards.length; i++) {
            Cards[i].removeEventListener("click", CardEffect(Cards, i));
        }
        */
    }


    
}







const PlayerDefense = (PLAYER, Card) => { // Defense works as follows -> PLAYER and Enemies have a "armor threshold", meaning, both the Player and the Enemy must 
    // 
    if (Card.Effect !== "defense") { 
        return;
    }
    let defbuff = Card.defenseRange;
    let PDEF = PLAYER.getPlayerDefense;
    //console.log(Card.defenseRange);
    console.log(Card.name + " will buff Player Defense (" + PDEF + ") by " + defbuff);
    //console.log(P_DEF);
    PLAYER.setPlayerDefense(defbuff);
    console.log("Player Defense is now " + PDEF);

}
const PlayerEscape = (Card) => { // Roll a random 80& chance to escape. some enemies cannot be escahpeyed from. Some enemies have a "trap" factor, which lowers
    // chance of escape, and some like (some) bosses have an intimidation factor that does not allow you to escahpey
    if (Card.Effect != "Escape") {
        return;
    }
    console.log(Card.name);
    //need to create a story and environment interface first
    let chance = Math.floor(Math.random() * 20);
    if (chance === 1 || chance === 6 || chance === 20) {
        console.log("escape successful");
        endGame("escape");
    }
}
const PlayerConsumable = (PLAYER, Card) => {
    if (Card.Effect !== "HPRES") {
        return;
    }
    console.log(Card.name + ". Effect is " + Card.Effect);
    let maxhealthy;
    let healthy;
    switch (Card.Effect) {
        case "HPRES":
            maxhealthy = PLAYER.Stats.maxhealth; 
            healthy = PLAYER.Stats.health;
            healthy += Card.StatBuff;
            if (healthy > maxhealth) 
                PLAYER.setPlayerHealth(maxhealth);
            else
                PLAYER.setPlayerHealth(healthy);
            break;
        case "ATKMultiplier": //unsure of how to make it for only one attack ... Set flags within Player and Enemy.
            let atk = PLAYER.Stats.attack;
            atk *= Card.StatBuff;
            PLAYER.AttackBuffed = true;
            break;
        case "DEFMultiplier": //unsure of how to make it for only one attack...
            let def = PLAYER.Stats.defense;
            def += Card.StatBuff;
            PLAYER.DefenseBuffed = true;
            break;
        case "Revive":
            maxhealthy = PLAYER.Stats.health;
            PLAYER.setPlayerHealth(maxhealth*.5);
            break;
    }
}
