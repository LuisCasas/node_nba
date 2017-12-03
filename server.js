require('./config/config.js');

const express = require('express');

const {ScannedURL} = require('./middleware/scannurl');
const port = process.env.PORT;

var app = express();

app.get('/dbupdate', (req, res) => {

});

app.get('/', (req, res) => {
    // console.log('Update called');
    const positions = [1, 2, 3];
    const weeks = [1, 2, 3];
    var thisPlayers;

    weeks.forEach((wk) => { 
        positions.forEach( async (pos) => { 
            
            var url = `http://fantasynba.canalplus.es/basketball/reports/player_rankings.asp?pos=${pos}&wk=${wk}`;
            
            // for testing purposes
            if(wk === 1 && pos === 1){
                // console.log('request url: '+url);

                try{
                    thisPlayers = await ScannedURL(url, wk, pos);

                    if(!thisPlayers){
                        return console.log('Error when trying to run URL', url);
                    }

                    // console.log(thisPlayers);

                    return thisPlayers;

                }  catch(err) {
                    return console.log(err);
                    //   res.status(400).send(err);
                } 
            }  
        });
    });   

    res.send('Update completed');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
