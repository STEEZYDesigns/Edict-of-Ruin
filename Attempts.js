/*
for (let i = 0; i < 3; i++) {
    CardDivs[i].addEventListener("click", () => {
        // how to now relate card effects!! The divs have almost nothing to do with the actual objects.
        // When I click. I would like the Effect. alert(textnode[i].Effect);
        //console.log(this);
        let CardEffects = Cards[i].Effect; //a string, will determine what happens next.
    
        //make a function for each one of these. So when clicked, the function will run, act accordingly (attack, add defense, buff)
        switch (CardEffects) {
            case "attack":
                //console.log(this);
                this.removeEventListener("click", arguments.callee);
                removeCardContent(this);
    
                PlayerAttack(WHINTERSNEK, PLAYER, Cards[i]);
                break;
            case "defense":
                this.removeEventListener("click", arguments.callee);
                removeCardContent(this);

                PlayerDefense(WHINTERSNEK, PLAYER, Cards[i]);
                break;
            case "Escape":
                this.removeEventListener("click", arguments.callee);
                removeCardContent(this);

                PlayerEscape(Cards[i]);
                break;
            case "HPRES":
            case "ATKMultiplier":
            case "DEFMultiplier":
            case "Revive":
                this.removeEventListener("click", arguments.callee);
                removeCardContent(this);

                PlayerConsumable(WHINTERSNEK, PLAYER, Cards[i]);
                break;
        }
    });
}





 for (let i = 0; i < 3; i++) {
        CardDivs[i].addEventListener("click", function() {
            // how to now relate card effects!! The divs have almost nothing to do with the actual objects.
            // When I click. I would like the Effect. alert(textnode[i].Effect);
            //console.log(this);
            let CardEffect = Cards[i].Effect; //a string, will determine what happens next.

            //make a function for each one of these. So when clicked, the function will run, act accordingly (attack, add defense, buff)
            switch (CardEffect) {
                case "attack":
                    this.removeEventListener("click", arguments.callee);
                    removeCardContent(this);

                    PlayerAttack(WHINTERSNEK, PLAYER, Cards[i]);

                    console.log("trying to remove all other listeners");
                    Array.from(CardDivs).forEach(element => {
                        console.log(element);
                        if (element === this) {
                            //do nothing, as this card div was already taken care of
                            //else remove the Listeners of the other non-attack card
                        }
                        else {
                            element.removeEventListener("click",);
                        }

                        

                    });
                    
                    break;
                case "defense":
                    this.removeEventListener("click", arguments.callee);
                    PlayerDefense(WHINTERSNEK, PLAYER, Cards[i]);
                    break;
                case "Escape":
                    this.removeEventListener("click", arguments.callee);
                    PlayerEscape(Cards[i]);
                    break;
                case "HPRES":
                case "ATKMultiplier":
                case "DEFMultiplier":
                case "Revive":
                    this.removeEventListener("click", arguments.callee);
                    PlayerConsumable(WHINTERSNEK, PLAYER, Cards[i]);
                    break;
            }
        });
    }
}






    let first5 = this.textContent.substr(0, 5);
    
    //console.log(first5);
    switch(first5) {
        case "Dagge":
        case "Short":
        case "Longs":
        case "Speci":
            console.log("attack");
            //PlayerAttack(WHINTERSNEK, PLAYER, );
            break;
        case "Escap":
            //PlayerEscape();
        case "Leath":
            //PlayerDefense();
        case "Small":
        case "Reviv":
            //PlayerConsumable();
        





    let CardName = Array.from(document.getElementsByClassName("Card"));
    CardName.forEach(Divelement => {
        let first5 = Divelement.textContent.substr(0, 5);
        
        console.log(first5);
        //console.log(Divelement);
        switch(first5) {
            case "Dagge":
            case "Short":
            case "Longs":
            case "Speci":
                console.log("attack card, skip removing EL"); 
                break;
            case "Escap":
            case "Leath":
            case "Small":
            case "Reviv":
                console.log("We found a non-attack card. So remove EL.");
                Divelement.removeEventListener("click", );
                break;
        }
            
    });
    
*/
