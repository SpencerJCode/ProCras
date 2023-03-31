# ProCras
Repository for an online flash-card app.
-------------------------------------------------------
SQL Tables
users (id, first, last, email, pwd, created_at, updated_at)
decks (id, user_id, name, created_at, updated_at)
cards (id, deck_id,  tag, value, created_at, updated_at)

users have many decks
decks have many cards
-------------------------------------------------------
Routes
/home
Simple landing page, explanation of website

Links - How to Use -> /howtouse
        My Account -> /portal
        
/howtouse
pictures and explanation of how to make a deck, how to make a card, how to use the cards

Links - Home -> /home
        My Account -> /portal
        
/portal
options to either create a new account or log into an old one

Links - Home -> /home
        How to Use -> /howtouse
        Create Account -> /create
        Log In -> /login
       
/create
Enter information to create a new account.

Links - Submit -> Form POST to /validateregistration
        Home -> /home
        Log In -> /login

/validateregistration
No data displayed, receives POST from /create and validates data.
reroutes to /create and flashes errors
reroutes to /dashboard if validate succeeds

/login
Enter information to log into an existing account

Links - Submit -> Form POST to /validatelogin
        Home -> /home
        Create Account -> /create
        
/validatelogin
No data displayed, receives POST from /login and validates data.
reroutes to /login and flashes errors
reroutes to /dashboard if validate succeeds

/dashboard
Shows data such as how many decks have been made and how many total cards exist.

Links -> My Decks -> /decks
         Study -> /studyhall
         Log Out -> /logout
         
/logout
No data displayed, clears session
reroute to /home
