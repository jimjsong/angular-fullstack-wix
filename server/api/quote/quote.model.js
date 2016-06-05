'use strict';

import mongoose from 'mongoose';

var QuoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  active: Boolean
});

export default mongoose.model('Quote', QuoteSchema);
