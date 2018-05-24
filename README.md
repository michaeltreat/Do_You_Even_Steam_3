# Do_You_Even_Steam_3

This is a remake of another SPA that I built that utilizes the Steam API. 

This uses an no-longer-supported library called PageJS. The goal was to get this app to an MVP using basic jQuery and minimal libraries, then migrate it over to a more advanced FE setup like Angular and React. 

The leaderboard functionality is almost complete, but the project was put on hold due to other contracted projects taking priority. 

Current goal is to just wire together a basic full stack app that uses full CRUD routes. It will utilize a PostgreSQL database, and uses the Steam API for data, with jQuery and PageJS on the FE.

---

**NOTE :** The back-end is deployed on Heroku, but it falls asleep when not used after a certin amount of time. That means your first request may take a bit longer, as the server needs to wake up first. I'll add a loading image to fix this in the future.

https://michaeltreat.github.io/Do_You_Even_Steam_3/

1. Enter your steamID or your vanityURL ( make sure your profile on steam is set to public, not private).
  - If you don't have a Steam account or you aren't sure of either of your names, then you can enter `KillerTreat` to see my data. You can also type in something gamer-like and you'll likely find a user that chose that as their name, and you can see their stats.
2. If a user is found, it will automatically bring you to the Steamer Shame page for an overview of your stats.
3. Click on the `Game Stats` link to see a breakdown of each of your games.


- Leaderboard and About are not available atm.
