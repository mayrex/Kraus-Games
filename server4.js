const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const net = require('net');
const { escape } = require("querystring");

//SERVER_NAO_IP   = "192.168.196.215";
const SERVER_NAO_IP   = "192.168.20.27";
const SERVER_NAO_PORT = 6969;

var clientGame;
var helloFlag = false;

const nm_dependencies = ['phaser', 'net']; // keep adding required node_modules to this array.
nm_dependencies.forEach(dep => {
  app.use(`/${dep}`, express.static(path.join(__dirname, `node_modules/${dep}`)));
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/hello', function(req, res) {
	if(!helloFlag){
		
		const clientFakeNAO = net.createConnection({ port: SERVER_NAO_PORT, host: SERVER_NAO_IP}, () => {
			clientFakeNAO.write('nao');
			
			res.write('{"message": "Connessione stabilita."}');
			res.end();
		});
		
		

	
		clientGame = net.createConnection({ port: SERVER_NAO_PORT, host: SERVER_NAO_IP}, () => {
			clientGame.write('unreal');
			
			res.write('{"message": "Connessione stabilita con il NAO server"}');
			res.end();
		});
		
		clientGame.on('error', err => {
			//console.error(err)
			console.log("Errore connessione host " + SERVER_NAO_IP + " porta "+ SERVER_NAO_PORT);
		});
		
		clientGame.on('data', (data) => {
			console.log(data.toString());
			//clientGame.end();
			
			res.write(data.toString()); 
			res.end();
		});
		helloFlag = true;
	}
	
});

app.get('/speak', function(req, res) {
	//{"comando":"speak","animazione":"hello","messaggio":""}
	//var text = req.query.messaggio;
	var message = '{"comando":"speak","animazione":"hello","messaggio":"Ascolta un nuovo indizio"}';
	//Invia al NAO server 
	clientGame.write(message);
	
	//Rispondi alla richiesta (Phaser)
	res.write(message);
	res.end();
});

app.get('/speak2', function(req, res) {
	//{"comando":"speak","animazione":"hello","messaggio":""}
	var text = req.query.messaggio;
	var message = '{"comando":"speak","animazione":"hello","messaggio":"'+text+'"}';
	//Invia al NAO server 
	clientGame.write(message);
	
	//Rispondi alla richiesta (Phaser)
	res.write(message);
	res.end();
});

app.get('/speakBenvenuto', function(req, res) {
	//{"comando":"speak","animazione":"hello","messaggio":""}
	var text = req.query.messaggio;
	var message = '{"comando":"speak","animazione":"hello","messaggio":"Benvenuto in Iron Riddle nel gioco creato dagli studenti del liceo scientifico Enrico Fermi di Aversa."}';
	//Invia al NAO server 
	clientGame.write(message);
	
	//Rispondi alla richiesta (Phaser)
	res.write(message);
	res.end();
});

app.get('/ballo2', function(req, res) {
	var message = '{"comando":"speak","animazione":"ballo","messaggio":"Complimenti! Hai risolto il primo enigma"}';
	//Invia al NAO server 
	clientGame.write(message);
	
	//Rispondi alla richiesta (Phaser)
	res.write(message);
	res.end();
});

app.listen(8080,()=>{
    console.log("Listen to 8080");
})