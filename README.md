# ProCras
Repository for an online flash-card app.

ProCras is an online flash-card application produced by Evan Wiorek, Spencer Johnson, and William Davies. It is short for "procrastination", which everyone does before taking tests.

# Tools
ProCras was built in an agile environment using GIT and Trello. It's a React project that includes MongoDB, Express, and Bootstrap. 

# Functionality
Cards contain front and back information, as well as the ID of the deck of cards it belongs in, that card's number of appearances, and the number of successful 
recognitions it has. A deck has an array of card IDs, a Stack ID, a Deck Name, and whether or not the deck is a unique session deck. A session deck is a chunk of data created
just when a user is studying. These persist until a user decides to remove them. Finally, a stack contains an array of deck IDs and a stack name.

Users  can create stacks with custom names, and within stacks, create decks. Decks cannot exist apart from stacks. Each deck has a unique card generation window that
creates cards linked to that deck. In order to study, users can select decks or even entire stacks to be imported into a study session that obtains every card 
included in all selected stacks and decks and randomizes them all every time that session is triggered.

During a study session, users are presented with the front side of a random card and must click on the card to see the back. Upon flipping, they may indicate whether or not
the successfully recognize the card. Clicking either button increments the value of a "appearances" key within the card class. Clicking yes also increments the "successes" 
value. The latter is divided by the former to display the success rate for that card, and the sums of both across the entire session creates the success rate for that 
session deck.

# Demo
(https://github.com/SpencerJCode/ProCras/blob/main/procras-demo.mp4)

# Future Features
1) Login/Registration. Will allow users to make their own stacks, decks, and cards, without worrying about other users being able to manipulate or edit their data.
2) Global data. Users will be able to set their stacks and decks as "public" so that they are searchable and useable by anyone else in the world.
3) Dark  Mode / Light Mode
4) Optional countdown timers to put pressure on study time
5) Voice-recognition - "Flip" to view the back of a card, "I got it" to indicate successful recognition,  "I missed it" to indicate failed recognition
6) Indicating a failed recongition causes the randomizer to include the card sooner than a mere randomization to encourage repetition
7) Current succeess and fail rates are stored on each card. Sessions would benefit from having their own success rates so users can track prograss over time.
8) Allowing the uploading of images and even sound clips to flash cards.
