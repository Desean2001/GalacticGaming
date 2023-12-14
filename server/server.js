
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const router = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(router);

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});
