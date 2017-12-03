const {ScannedURL} = require('./middleware/scannurl');

const positions = [1, 2, 3];
const weeks = [1, 2, 3];

 weeks.forEach( async (wk) => { 
    positions.forEach(async (pos) => { 
// for(var wk = 1; wk < 3; wk++){
    // for(var pos = 1; pos < 3; pos++){
        var url = `http://fantasynba.canalplus.es/basketball/reports/player_rankings.asp?pos=${pos}&wk=${wk}`;

        if(pos === 2){
            console.log('request url: '+url);
            var allPlayers = await ScannedURL(url, wk, pos);
            console.log(allPlayers.players[0].week);
        }
    });
});