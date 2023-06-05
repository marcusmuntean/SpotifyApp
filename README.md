# Project Title: Expressify

Expressify is a Spotify extension used to provide users with more detailed statistics about their music preferences, as well as unite users by providing the functionality of messaging other users as well as viewing their profile/statistics.

## Table of Contents
A. Installation

B. How to Use Project

C. Major Components and Features

D. The Status of those Features

E. Credits

## Installation 
On your command prompt or terminal, run the following:
`git clone https://github.com/marcusmuntean/SpotifyApp.git`

Frontend: `cd SpotifyApp`
`cd frontend`
`npm install`
`npm install axios`
`npm install firebase`
`npm start`

On a separate command prompt or terminal, run the following:

Backend:
`cd Spotify App`
`cd backend`
`npm install`
`npm install axios`
`npm install firebase`
`npm start`

*Note: In order for this to work, users must also setup a working Firebase web app and ensure they have a permissions.json in the backend folder, as well as necessary Spotify API keys in their own .env file.*
	
## How to Use Project
Login to your spotify account through the profile page. You will have access to the inbox page to message other users, as well as being able to make your profile public or private. You can view other public users in the discovery page. You can also view your liked songs and other statistics on the statistics page. Finally, you can participate and start new discussion forums on the discussion page.

## Major Components and Features

**Login Page:**
	In order to login, users will login with their Spotify account, which is carried out through the Spotify API. Upon doing so, certain profile information such a username, display name, and various listening statistics will be fetched from their Spotify profile to be displayed throughout the app.

**Profile:**
	This page gives the user the choice to change the visibility of their account from public or private. It also displays their username and a button to direct them to their inbox. An idea for the future is to allow them to display a top song/artist or a liked song on their profile page.

**Discovery Page:**
	The discovery page displays all public users that have an Expressify account. It currently only displays their username, but we aim to add functionality for viewing their profile and direct messaging users directly from the discovery page.

**Inbox/Messaging:**
	At the inbox page, users can message any other user of Expressify by typing their username into the box in the lower lefthand corner. Then a message can be typed and sent, and that user will be added to the message list on the upper left hand corner.

**Discussion Forums:**
	The discussion forums component of the project allows users to view and create public discussion boards on the app. Each discussion board must have a title and an initial message upon creation, and anytime afterwards, users can navigate to specific boards and add comments to that board. Additionally, any user can like individual messages, including their own, and message like counts are displayed to the right of each message.

**Statistics:**
	On the statistics page, users can view their personal top artists and songs from the past month up to all-time.

**Liked Songs:**
	The liked song page allows users to view their liked songs, sorted by most recently added. A idea for the future is to allow the user to display a liked song on their profile page.

## The Status of those Features
**Login Page - Complete**

**Profile - In progress: **
	*We aim to add functionality regarding displaying top songs/artists/liked songs, as well as cleaning up the UI.*
  
**Discovery Page - In progress: **
	*We aim to add functionality regarding icons for direct messaging and viewing profiles directly from the discover page. We also would like to add username searching and sorting/filtering functionality.*

**Inbox/Messaging - Complete**

**Discussion Forums - Complete**

**Statistics - Complete**

**Liked Songs - Complete**

## Credits
  Marcus Muntean (Software Engineer - Statstics & Liked Songs)
  
  Alex Talreja (Software Engineer - Discussion Forums)
  
  Tanisha Mehta (Software Engineer - Profile/Login Page & Home)
  
  Mohammed Alwosaibi (Software Engineer - Inbox & Discovery)
  
	
  
	
  
	
	
