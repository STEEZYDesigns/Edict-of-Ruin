# Edict-of-Ruin
A game I am making. Mechanics are based on / inspired by Baten Kaitos, a Gamecube series from 2003 and 2008.

Edict of Ruin is a turn-based strategy game that uses a dungeon-crawling choose-your-adventure style of storytelling, and game mechanics based on Baten Kaitos EWaTLO, the original.

Game Mechanics
-------------------------
Players will begin the game with a set character, giving them a name, and will progress the game by defeating enemies, growing stronger and completing the storyline. 
Players can grow stronger by defeating enemies and completing quests and can allot new points into their stats after gaining levels. Players will also gain access to stronger items to fight with as they progress.

Players have a Health Points (HP) Bar, if your points/bar reaches 0, you lose the game, use consumables or other methods to heal your points. Enemies also have an HP Bar and will die when their points/bar reaches 0 granting you EXP, consumables (including key consumables), and battle cards.

Battle is turn based, and depends on how fast you can make your decisions as well as strategizing how to fight certain enemies.
Use your Hand to see which cards you have randomly drawn from your Deck.
-- more updates on ( rank order, chaining, the nextaction list, log, and Enemy / Player Effects and Buffs ) later.

EXP -- will be updayed, monsters can drop EXP, quests can grant EXP
Money -- will be updated, monsters will drop ranges of money, can use to buy items at certain areas.

Decision making for the story, I will try to make a diverse storyline that gie replay value.

2/12/2020

I only plan to work on this "intensely" for about a month. This is more of a learning project, while experimenting with how much functionality I can achieve with pure HTML, CSS, and Javascript.
I do not have a current plan for a database, so progress and accounts will not be kept
Currently I have an HTML page and CSS styling done for "battle" pages. I will also have to learn to generalize this through Javascript.
I am also starting to make the "Deck" and "items" Javscript file, I will be breaking up the Deck generally into battle cards and consumables, while items may hold some features of both or perhaps be a file for special "key" consumables. After I make some base data I can work with, as in a variety of cards both of consumables and battle cards, I will try to make some "cards" for the enemy and then try to make the "cards" affect the player and enemy HP. I also will be adding some "shake" effect to the enemy to simulate damage taken.

Action List, Log, Effects / Buffs, and the random drawing of cards for each side will be done later.



3/1/2020
I have not worked as much as I would have like on this project. In total so far, I feel as though I have only worked on it about every other day, and not thoroughly made progress some days. This is of course, a learning process, and I have learned from this project and am very happy that I have taken it on. I will work on it until 3/8, and will attempt a Presentation of the project in front of a coding community.
Every day I do think about my project though I do make some progress, even if I dont code much, because I have also made wireframes and pseudo-code on paper, and every little thing I do I feel really benefits myself because I seek it out. So for junior programmers, keep on coding and looking forward. Don't look down at your feet and think "I can't" !
I have worked on giving my Player 
a Deck, giving the deck some functionality like shuffle, and shifting cards from Deck to :
a Hand, trying to make the Hand interactable. Which means defining what each Card should do after I give an object some properties. I.e. An attack card like a Dagger or Longsword will have an "attack" property, whereas a LeatherShield will not, thus I can use switch cases to assign a function that will attack the Enemies.


I have encountered many problems, and honestly I should have written each one down here in the ReadMe just so I and anyone else could look back and learn. Thus, I will try to do that from now on with all personal projects - likely I will make regular textfiles when working with others' projects just so I dont spread their code or methods.
One problem comes with "removeEventListener", where you cannot remove an anonymous function that is assigned to an "addEventListener" ........... https://stackoverflow.com/questions/10444077/javascript-removeeventlistener-not-working
To better explain my problems, there is the following:



if you are inside the actual function, you can use arguments.callee as a reference to the function. as in:

button.addEventListener('click', function() {
      ///this will execute only once
      alert('only once!');
      this.removeEventListener('click', arguments.callee);
});
EDIT: This will not work if you are working in strict mode ("use strict";)

Source: https://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript




My only real problem with this is that I use "use strict" in all my files, but this method makes me remove "use strict". I will simply remove "use strict" from that file for now since I want to try and complete the project, but that kind of thing really threw me off, not time-wise but I can't find a way around it while using "use strict at the moment.

Another problem I used to have was as to how to maintain the game "listening" constantly for what the next actions taken would be. This I found the answer in, by simply breaking down the functions into smaller functions and running them within each other. Also by automating what attacks the Enemies will make, by giving them preset attack methods, randomizing which will be used next, and putting them on an interval. Another change I could make in the future (as if i was to keep working on this) would be to create Speed Stats and make that affect turnover/attack rates.  I should have uploaded more simply to show how my code changes daily.

Another problem I currently have is multiple enemies. I am not sure at the moment how I would handle that. An array seems simple enough, but it almsot never is that simple xD

Thanks for reading :)
