'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	events.EventEmitter.call(this);
	var self = this,
		forceEvent = function(eventName, outData) {
			this.emit(eventName, {
				eventName: eventName,
				data: outData
			});
		}

	qtools.validateProperties({
		subject: args || {},
		targetScope: this, //will add listed items to targetScope
		propList: [
			{
				name: 'appName',
				optional: false
			}
		]
	});

	//SETTINGS ====================================

	this.sendMetaData = false;

	this.dataFileDirectory = '/Volumes/qubuntuFileServer/cmerdc/lightningPipe/testDataFiles/';
	this.logFileDirectory = '/Volumes/qubuntuFileServer/cmerdc/lightningPipe/logFiles/';

	this.clientProfileSource = {
		type: 'file',
		filePath: '/Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/config/clientProfiles/'
	};

	var mailOptions = {
		from: 'TQ White II <tq@tqwhite.com>',
		to: 'tq@justkidding.com',
	}

	//logging setup ==============

	var EmailStream = require('bunyan-emailstream').EmailStream;  //mails directly from node
	var emailStream = new EmailStream(mailOptions, {});

	var logger = require('bunyan');


	this.log = new logger({
		name: this.appName,
		streams: [
			// 		{
			// 			stream: process.stdout,
			// 			level: 'debug'
			// 		},
			{
				path: this.logFileDirectory + 'lightningClover.log',
				level: 'trace'
			}
			// 			,
			// 			{
			// 				type: 'raw', // You should use EmailStream with 'raw' type!
			// 				stream: emailStream,
			// 				level: 'fatal',
			// 			}
		],
		src: false
	});


	//this.log.fatal({FATALTEST:'goodbye'}, args.appName+' Test Email from Bunyan logging');

	//==================================================	

	//BUILD RETURN OBJECT ====================================

	this.updateBaseUri = function(apiDefinition, req) {
		if (typeof (req.socket.localPort) != 'undefined') {
			var port = ':' + port;
		} else {
			var port = '';
		}
		this.baseUri = req.protocol + '://' + req.host + port + '/' + apiDefinition.name + '/' + apiDefinition.version + '/';
	}


	this.display=function(){
		
		console.log('logFile='+this.logFile+'\n');
		qtools.dump({'clientProfileSource':this.clientProfileSource});


		console.log('dataFileDirectory='+this.dataFileDirectory+'\n');
		console.log('logFileDirectory='+this.logFileDirectory+'\n');


	}

	this.get = function(name) {
		return this[name];
	}

	this.forceEvent = forceEvent;
	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;



