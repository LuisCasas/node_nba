const request = require('request');
const jsdom = require('jsdom');
const {ObjectID} = require('mongodb');
// const bcrypt = require('bcryptjs');
// const bodyParser = require('body-parser');

const {mongoose} = require('./../db/mongoose');

const {Players} = require('./../models/players');

const {JSDOM} = jsdom;
// var file = 'test.txt';

var newPlayers = new Players();

const positions = [1, 2, 3];
const weeks = [1, 2, 3];

var ScannedURL = function scannURL(url, wk, pos){
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            
                const dom = new JSDOM(body);
                const tr = dom.window.document.querySelectorAll('tr');
                
                for(var i = 0; i < tr.length; i++){
                    var td = tr[i].textContent.split('\t');
                    var playerName;
                    var price;
                    var points;

                    for(var j = 0; j < td.length; j++){
                        
                        if(!td[j]){
                            continue;
                        } else if(j === 11 ){
                            var playerName = td[j].trim();
                        } else if(j === 28){
                            var price = td[j].trim();
                        } else if(j === 64){
                            var points = td[j].trim();
                        }
                    }

                    if(playerName){
                        var player = newPlayers.findPlayer(playerName);

                        if(!player){
                        newPlayers.addPlayer(playerName,pos,price);
                        }

                        newPlayers.updatePlayer(playerName,wk,points);
                    }                        
                }

                resolve(newPlayers);
            } else {
                reject(error);
            }
        });
    });
};

/*
var allPlayers = () => {
    weeks.forEach(  (wk) => { 
        positions.forEach( (pos) => { 
            var url = `http://fantasynba.canalplus.es/basketball/reports/player_rankings.asp?pos=${pos}&wk=${wk}`;

            if(pos === 2){
                // console.log('request url: '+url);
                var allPlayers = await ScannedURL(url, wk, pos);
                // console.log(allPlayers.players[0].week);
            }
        });
    });  
};
*/

module.exports = {ScannedURL};