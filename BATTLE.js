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

    function BattleTimer() {
        let time = min + ":" + sec; //string
        let BT = document.getElementById("Timer");
        sec += 1;
        BT.textContent = time;
        
        if (sec == 60) {
            min += 1;
            sec = 0;
        }
        
    }
    
    this.setInterval(BattleTimer, 1000);


    let PLAYER = new Player();
    //number of enemies atm: 1. Maybe have an array when I make multiple enemies?
    let WHINTERSNEK = new WhinterSnek();

    PLAYER.PlayerDeck.defaultDeck();
    PLAYER.PlayerDeck.DeckShuffle();
    PLAYER.PlayerDeck.dealHand();
    
    //Snek: Ssssstart an interval ssssso I can attackk.
    //EnemyAttackCycle(WHINTERSNEK); //~~for as many enemies there are, we pass each one created, and give a cycle to each.
    
    HandDivFill(WHINTERSNEK, PLAYER);
    // 5th. Player's Hand to be available for onclick event handlers
    //let us grab the Player Hand and assign each of the array to a div that will have a eventlistener
    // 
    
    //document.getElementsByClassName("Hand").appendChild(x);
    


}














function HandDivFill(WHINTERSNEK, PLAYER) {
    let textnode = PLAYER.PlayerDeck.Hand; //holds an itemCard;
    
    //x = document.createElement("div"), 
    //y = document.createElement("div"),
    //z = document.createElement("div"),
    
    //console.log(textnode[0]); //testing

    //check if hand is empty
    if (textnode === undefined || textnode.length == 0) {
        // array empty or does not exist
        PLAYER.PlayerDeck.dealHand();
    }
    else {
        //there are some number of cards.
        let inHand = PLAYER.PlayerDeck.Hand.length;
        console.log("there are " + inHand + " cards");

        if (inHand === 3) {} //do nothing, full hand
        else { //we must refreshHand();
            PLAYER.PlayerDeck.refreshHand(inHand);
        }
    }
    for (let i = 0; i < textnode.length; i++) {
        let x = document.createElement("div");
        let text;
        //console.log(i);
        if (textnode[i].rankItem === 1 || textnode[i].rankItem === 4) {
            text = document.createTextNode(textnode[i].name + ': \n' + textnode[i].description + '\n' + textnode[i].attackRange + " Atk Multiplier");
        }
        else if (textnode[i].rankItem === 2) {
            text = document.createTextNode(textnode[i].name + ': \n' + textnode[i].description + '\n' + textnode[i].defenseRange + " defense");
        }
        else if (textnode[i].rankItem === 89) {
            text = document.createTextNode(textnode[i].name + ': \n' + textnode[i].description + '\n' + textnode[i].StatBuff + " \n Consumable: HPRes, ATKx, DEFx, etc");
        }
        else {
            text = document.createTextNode(textnode[i].name + ': \n' + textnode[i].description);
        }
        //console.log(text);
        x.appendChild(text);
        
        
        document.getElementsByClassName("Card")[i].appendChild(x);
        addCardEffect(WHINTERSNEK, PLAYER, textnode, i);
    }
}

function addCardEffect(WHINTERSNEK, PLAYER, textnode, i) {
    document.getElementsByClassName("Card")[i].addEventListener("click", function() {
        // how to now relate card effects!! The divs have almost nothing to do with the actual objects.
        // When I click. I would like the Effect. alert(textnode[i].Effect);
        //console.log(this);
        let CardEffect = textnode[i].Effect; //a string, will determine what happens next.

        //make a function for each one of these. So when clicked, the function will run, act accordingly (attack, add defense, buff)
        switch (CardEffect) {
            case "attack":
                //removeEvent(this);
                this.removeEventListener("click", arguments.callee);
                PlayerAttack(WHINTERSNEK, PLAYER, textnode[i]);
                break;
            case "defense":
                this.removeEventListener("click", arguments.callee);
                PlayerDefense(WHINTERSNEK, PLAYER, textnode[i]);
                break;
            case "Escape":
                this.removeEventListener("click", arguments.callee);
                PlayerEscape(textnode[i]);
                break;
            case "HPRES":
            case "ATKMultiplier":
            case "DEFMultiplier":
            case "Revive":
                this.removeEventListener("click", arguments.callee);
                PlayerConsumable(WHINTERSNEK, PLAYER, textnode[i]);
                break;
        }
    });
}























const PlayerAttack = (WHINTERSNEK, PLAYER, Card) => { // I need an internal timer that allows "chaining" attacks, so that more new cards can be added to the hand.
    
    let CardName = document.getElementsByClassName("Card");
    console.log("You have attacked! W/ " + Card.name);
    //console.log();
    //how to make it so, I can only click on cards that also have an attack feature. 
    //1st disable the card selected. ~~~ I figure this should be done on the eventlistener, scroll up.
    //2nd disable all cards that should not be able to be selected, i.e. if the other cards are defense and buffs, disable them
    //3rd make the exception for special attack through rankItem.
    //4th 
    //should start a seperate timer here. that will end the turn / chaining when reaches 0
    //should reset the timer every time you add on a card? which means the chain continues.
    let sec = 5;
    let hundsec = 0;

    function BattleTimer() {
        let time = sec + ":" + hundsec; //string
        let BT = document.getElementById("BattleTimer");
        
        if (hundsec === 0) {
            hundsec = 99;
            sec -= 1;
        }
        else hundsec -= 1; //as in tenths, hundreths place in decimal.

        if (sec === 0 && hundsec === 0) {
            time = "5:00"
            BT.textContent = time;
            stopInterval();
            HandDivFill(WHINTERSNEK);
        }

        BT.textContent = time;
        
    }
    function stopInterval() {
        clearInterval(BATTLETIMER);
    }
    let BATTLETIMER = this.setInterval(BattleTimer, 10);
    
    //5th 
    //shift every card you select into a "used" pile (that will then clear itself) 
    //if your deck is depleted, will reshuffle your deck and redeal hand (once deck is depleted)

    //6th
    //else if the deck is not depleted, shift up to 3 cards back into the hand.

    //7th 
    //

    //first --> decrease enemy health and health bar.
    let EnemyDmg = Card.attackRange * PLAYER.Stats.attack;
    //console.log(EnemyDmg); //WHINTERSNEK.Stats.health -= EnemyDmg;
    WHINTERSNEK.Stats.health -= EnemyDmg;
    console.log(Card.description);
    console.log("Whinter Snek's health: " + WHINTERSNEK.Stats.health);
    /*  width: 180px; div: Enemy, div class HPBar .......... PlayerHP is represented by numbers. So EnemyAttack just needs to 
    change numbers according to Player health*/


}
const PlayerDefense = (PLAYER, Card) => { // Defense works as follows -> PLAYER and Enemies have a "armor threshold", meaning, both the Player and the Enemy must 
    // 
    let sec = 5;
    let hundsec = 0;

    function BattleTimer() {
        let time = sec + ":" + hundsec; //string
        let BT = document.getElementById("BattleTimer");
        
        if (hundsec === 0) {
            hundsec = 99;
            sec -=1;
        }
        else hundsec -= 1; //as in tenths, hundreths place in decimal.

        if (sec === 0 && hundsec === 0) {
            BT.textContent = "0:0";
            stopInterval();
            //RefreshHand();
        }

        BT.textContent = time;
        
    }
    function stopInterval() {
        clearInterval(BATTLETIMER);
    }
    let BATTLETIMER = this.setInterval(BattleTimer, 10);


    let defbuff = Card.defenseRange;
    let PDEF = PLAYER.getPlayerDefense();
    //console.log(Card.defenseRange);
    console.log(Card.name + " will buff Player Defense (" + PDEF + ") by " + defbuff);
    //console.log(P_DEF);
    PLAYER.setPlayerDefense(defbuff);
    console.log("Player Defense is now " + PDEF);

}
const PlayerEscape = (Card) => { // Roll a random 80& chance to escape. some enemies cannot be escahpeyed from. Some enemies have a "trap" factor, which lowers
    // chance of escape, and some like (some) bosses have an intimidation factor that does not allow you to escahpey
    console.log(Card.name);
    //need to create a story and environment interface first
    let chance = Math.floor(Math.random() * 20);
    if (chance === 1 || chance === 6 || chance === 20) {
        console.log("escape successful");
        endGame("escape");
    }
}
const PlayerConsumable = (PLAYER, Card) => {
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
