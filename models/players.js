// add mongoose id

/*
var player = {
    _id: id,
    name: name,
    position: position,
    price: price,
    week: [{
        week: 1,
        points: points
    }, {
        week: 2,
        points: points
    }]
}
*/

class Players {
    constructor(){
        this.players = [];
    }

    addPlayer(playerName, position, price){
        var player = {
          //  _id: id,
            playerName, 
            position, 
            price, 
            week: []
        };

        this.players.push(player);
        return player;
    }

    findPlayer(name){
        var player = this.players.filter((player) => player.playerName === name);
        return player[0];
    }

    updatePlayer(name, week, points){
        var player = this.findPlayer(name);
        player.week.push({week, points});
    }
}

module.exports = {Players};