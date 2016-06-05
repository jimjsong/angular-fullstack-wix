/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/quote              ->  index
 */

'use strict';
import _ from 'lodash';
import Quote from './quote.model';

var quotes = [];
const FIVE_MINUTES = 1000 * 5 * 60;
const RELOAD_PARAM_CODE = '1234567890abcdefghijklmnopqrstuvwxyz.reload';

function LoadQuotes() {
  console.log(new Date(), 'Load Quotes ')
  quotes = require('./QuotesRaw').Quotes();
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Quotes
export function index(req, res) {
 console.log(new Date(), 'Quote index called')
  if (!!req.query.instance  && !!req.query.instanceId) {
    if (!!quotes && quotes.length > 0) {
      var indexVal = Math.floor(Math.random() * quotes.length);
      return res.json(quotes[indexVal]);
    }
  }

  return res.json({});
}

export function reload(req, res) {
  console.log(new Date(), 'Quote reloading command issued')
  if ( req.query.code != RELOAD_PARAM_CODE)
  {
    return res.json({cmd: "reload", status: "fail", dt: new Date()});
  }

  LoadQuotes();
  return res.json({cmd: "reload", status: "ok", dt: new Date()});
}


export function random(req, res) {
  var indexNumber = Math.floor(Math.random() * 10);

  return
}

LoadQuotes();

//load every 5
setTimeout(LoadQuotes, FIVE_MINUTES);
