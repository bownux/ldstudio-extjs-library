# YMU ExtJS Widgets

## Description
    * ExtJS Widgets used on YMU project showcase.
    * Widgets can be used individually and independently in any client-side development.

## dev:
    * Install Dependencies
        npm install

    * To develop using coffee scripts
        (coffee --compile --watch .&); nodemon app.js
        OR
        (jitter . . &); nodemon app.js
        * For more Coffeescript information: http://jashkenas.github.com/coffee-script/

    * To simply start:
        node app.js

## port: 
    * *Default Port:* 3000
    * You may override with with env["PORT"] variable

## Structure:
    * config:
        * Routing information for Views
        * Other configuration type files can go here
    * views:
        * Application views, this are written in Jade-Lang, an html templating language
    * public:
        * These are external-internet facing files, place client-code here.
        * ExtJS client code lives in the Javascripts directory and is arranged by package name
    * app.coffee/app.js: 
        * Root application and configuration

## Client Side:
    - javascripts/
          - Containers: Container Types 
                + (HContainer): Extendable Resizable Horizontal Panel
          - DataTabs: Data-Driven Tabs 
                + (YoutubeStore): Storage and Model for Youtube Feed
                + (YoutubeVideoTabs): TabPanels using YoutubeStore
          - Players: Video Players
                + (YoutubePlayer): Panel Component that plays videos from Youtube

    * Each widget/component resides in it's own Package namespace recognizable by the directory
      name or Ext.define command.
    * Most components extend Ext.panel or other standard Ext Components to accomplish a 
      working widget.
    * Components/Widgets are extensible even further by defining your own class or during 
      creation time onReady.

## Creating Components Example:
   * Get Youtube Feed
        store = Ext.create 'DataTabs.YoutubeStore' 
        store.load

   * Create a Youtube Video Player
        player = Ext.create 'Players.YoutubePlayer'

   * Create a HContainer
        containers = Ext.create 'Containers.HContainer',
        { 
            items: [
                player,
            ],
            renderTo: 'video-container' 
        }

        
## Including Required Classes:
   Ext.require 'Players.YoutubePlayer'
   Ext.require 'Containers.HContainer'

   Ext.Loader.setConfig({
           enabled : true
           paths: 
               Players: 'javascripts/Players'
               Containers: 'javascripts/Containers'
    })

## Deploy to Heroku
    git remote add heroku git@heroku.com:deep-summer-8725.git
    git push heroku master
