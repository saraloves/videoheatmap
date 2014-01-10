# Heat Vote

## Description

Custom HTML5 video player which tracks positive or negative votes on exact moments of the video and generates analytics for the uploader.

![player](http://i.imgur.com/0aGYQO5.png)

## How to Use

Navigate to http://heatvote.com and follow the instructions on the home page.  To experience heatvote's functionality with your own videos, create an account and submit a video on the admin page.  Then you can view your video with our player and analytics system.  Test with your users: we provide a demo link of your video for you to share.


## Tech Stack

- [Backbone](http://backbonejs.org/)
- [D3](http://d3js.org/)
- [VideoJS](http://www.videojs.com/)
- [PostgreSQL](http://www.postgresql.org/)/[Sequelize](http://sequelizejs.com/)
- [Express](http://expressjs.com/)/[Node](http://nodejs.org/)
- [Passport](http://passportjs.org/)
- [Jade](http://jade-lang.com/)/[Stylus](http://learnboost.github.io/stylus/)

## How to Install

	$ git clone https://github.com/saraloves/videoheatmap.git
	$ cd videoheatmap
	$ npm install
	$ bower install
	$ node app.js

## Challenges

- Rendering the D3 heatmap with our Backbone integration.
- Creating our own data algorithm for heatmap visualization.
- Managing async in Backbone and Node.

## Authors

- Sara Binns <sarabinns@gmail.com>
- Lindsey Smith <lindsey.engineer@gmail.com>
- Joao Stein <joaosteing@gmail.com>

Proudly produced at [Hack Reactor](http://www.hackreactor.com).