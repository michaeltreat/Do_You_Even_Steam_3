# Do_You_Even_Steam_3

This is a remake of another SPA that I built that utilizes the Steam API. 

This uses an no-longer-supported library called PageJS. The goal was to get this app to an MVP using basic jQuery and minimal libraries, then migrate it over to a more advanced FE setup like Angular and React. 

The leaderboard functionality is almost complete, but the project was put on hold due to other contracted projects taking priority. 

Current goal is to just wire together a basic full stack app that uses full CRUD routes. It will utilize a PostgreSQL database, and use the Steam API for data, with jQuery and PageJS on the FE.

Click here to see the current state of the project:

https://michaeltreat.github.io/Do_You_Even_Steam_3/

1. Click home.
2. Enter your steamID or your vanityURL ( make sure your profile on steam is set to public, not private).
  - If you don't have a Steam account or you aren't sure of either of your names, then you can enter `KillerTreat` to see my data. You can also type in something gamer-like and you'll likely find a user that chose that as their name, and you can see their stats.
3. If a user is found, it will automatically bring you to the Steamer Shame page for an overview of your stats.
4. Click on the `Game Stats` link to see a breakdown of each of your games.

5. Leaderboard and About are not available atm.
