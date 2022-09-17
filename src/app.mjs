#!/usr/bin/env node

import express from 'express';

import { handler } from './index.mjs';

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const output = await handler();
  res.send(output.body);
})

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
