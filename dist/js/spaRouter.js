"use strict";

var cookies = require('browser-cookies');

var _require = require("./deck"),
    deckRoute = _require.deckRoute;

var _require2 = require("./decks"),
    decksRoute = _require2.decksRoute;

var _require3 = require("./draft"),
    draftRoute = _require3.draftRoute;

var _require4 = require("./drafts"),
    draftsRoute = _require4.draftsRoute;

var _require5 = require("./profile"),
    profileRoute = _require5.profileRoute;

var _require6 = require("./game"),
    gameRoute = _require6.gameRoute;

var _require7 = require("./home"),
    homeRoute = _require7.homeRoute;

var _require8 = require("./api"),
    getDecks = _require8.getDecks,
    getGames = _require8.getGames;

var _require9 = require('./conf.js'),
    pagePrefix = _require9.pagePrefix;

var parseQuerystring = function parseQuerystring(ctx, next) {
  var cleanQuerystring = ctx.querystring.split("#")[0];
  var args = cleanQuerystring.split("&");
  var params = {};
  args.forEach(function (arg) {
    if (arg.includes("=")) {
      var parts = arg.split("=");
      var key = parts[0];
      var value = parts[1];
      params[key] = value;
    } else {
      params[arg] = true;
    }
  });
  Object.assign(ctx.params, params);
  next();
};

var scrollTop = function scrollTop(ctx, next) {
  window.scrollTo(0, 0);
  next();
};

$(function () {
  page(pagePrefix + "/", scrollTop, homeRoute);
  page(pagePrefix + "/login/", scrollTop, function (c, n) {
    console.log("CALLED FROM /login/");
    if (cookies.get("token")) {
      window.stop();
      window.location.href = pagePrefix + "/";
    }
  });
  page(pagePrefix + "/deck/", scrollTop, parseQuerystring, deckRoute);
  page(pagePrefix + "/decks/", scrollTop, parseQuerystring, decksRoute);
  page(pagePrefix + "/draft/", scrollTop, parseQuerystring, draftRoute);
  page(pagePrefix + "/profile/", scrollTop, parseQuerystring, profileRoute);
  page(pagePrefix + "/drafts/", scrollTop, parseQuerystring, draftsRoute);
  page(pagePrefix + "/game/", scrollTop, parseQuerystring, gameRoute);
  page();
});