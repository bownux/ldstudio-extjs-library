# YMU ExtJS Widgets

## Description
    # ExtJS Widgets used on YMU project showcase

## dev:
    # Install Deps
    npm install

    # To develop using coffee scripts
    (coffee --compile --watch .&); nodemon app.js
    OR
    (jitter . . &); nodemon app.js

    # To simply start:
    or node app.js

## port: 
4000

## Structure:
##      Client Side:
            - javascripts/
                  - Containers: Container Types 
                        + (HContainer): Extendable Resizable Horizontal Panel
                  - DataTabs: Data-Driven Tabs 
                        + (YoutubeStore): Storage and Model for Youtube Feed
                        + (YoutubeVideoTabs): TabPanels using YoutubeStore
                  - Players: Video Players
                        + (YoutubePlayer): Panel Component that plays videos from Youtube

        ## Creating Components Example:
           # Get Youtube Feed
           store = Ext.create 'DataTabs.YoutubeStore' 
           store.load

           # Create a Youtube Video Player
           player = Ext.create 'Players.YoutubePlayer'
        
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
