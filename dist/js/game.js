"use strict";

// /game/_id/:_id
// 5af804c72088d900069b283a

var _require = require('./api'),
    getGame = _require.getGame,
    getDecks = _require.getDecks;

var gameRoute = function gameRoute(c, n) {
  console.log("CALLED FROM /game/");
  appData.currentGameWinner = "loading ...";
  appData.currentGameName = "";
  appData.currentGameHero = "";
  appData.currentGameHeroDeck = [];
  appData.currentGameHeroDeckName = "loading ...";
  appData.currentGameOpponent = "";
  appData.currentGameOpponentDeck = [];
  appData.currentGameOpponentDeckName = "loading ...";
  if (appData.bound) bound.unbind();

  $(function () {
    $("#page-wrapper").load('/templates/game-inner.html', function (loaded) {
      rivets.bind($('#app'), { data: appData });
      getDecks();
      getGame(c.params.gameID).then(function (game) {
        appData.currentGameName = game.hero + " vs " + game.opponent;
        appData.currentGameHero = game.hero;
        appData.currentGameWinner = game.winner;
        appData.currentGameOpponent = game.opponent;
        appData.currentGameHeroDeck = [];
        Object.keys(game.players[0].deck.cards).forEach(function (cardID) {
          var card = cardUtils.allCards.findCard(cardID);
          if (card) {
            var cardObj = {
              count: game.players[0].deck.cards[cardID],
              colors: card.get("colors"),
              cost: card.get("cost"),
              name: card.get("prettyName")
            };
            appData.currentGameHeroDeck.push(cardObj);
          }
        });
        appData.currentGameHeroDeckName = game.hero + "'s deck: " + game.players[0].deck.poolName;
        appData.currentGameOpponentDeckName = game.players[1].deck.poolName;
        appData.currentGameOpponentDeck = [];
        Object.keys(game.players[1].deck.cards).forEach(function (cardID) {
          var card = cardUtils.allCards.findCard(cardID);
          if (card) {
            var cardObj = {
              count: game.players[1].deck.cards[cardID],
              colors: card.get("colors"),
              cost: card.get("cost"),
              name: card.get("prettyName")
            };
            appData.currentGameOpponentDeck.push(cardObj);
          }
        });
      });
    });
  });
};

module.exports = { gameRoute: gameRoute };