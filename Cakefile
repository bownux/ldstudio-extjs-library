{spawn, exec} = require 'child_process'

task 'assets:watch', 'Watch source files and build JS & CSS', (options) ->
    runCommand = (name, args...) ->
        proc =          spawn name, args
        proc.stderr.on  'data', (buffer) -> console.log buffer.toString()
        proc.stdout.on  'data', (buffer) -> console.log buffer.toString()
        proc.on         'exit', (status) -> process.exit(1) if status isnt 0

    runCommand './cc.sh'
	
    runCommand 'coffee', '-wc','public/', 'public/javascripts/Controller', 'public/javascripts/Model', 'public/javascripts/samples','public/javascripts/Store','public/javascripts/View'
	#runCommand 'compass watch public/resources/ public/resources/sass/ymu-ext-theme.scss'
	
	#{exec} = require 'child_process'
	#exec 'compass compile'
