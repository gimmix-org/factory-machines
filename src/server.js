const express = require('express');
const Queue = require('bull');
const path = require('path');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const app = express();
app.use(express.json());

const queue = new Queue('builds');
queue.process(path.join(process.cwd(), '/src/processor.js'));

app.use((_req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NEXT_PUBLIC_FACTORY_SERVER
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-Auth-Token'
  );
  next();
});

app.get('/', (req, res) => {
  queue.getJobCounts().then(counts => {
    return res.json({ counts });
  });
});

app.get('/build', (req, res) => {
  const { id } = req.query;
  if (!id) return res.sendStatus(404);

  queue.getJob(id).then(job => {
    return res.json(job);
  });
});

app.post('/build', (req, res) => {
  const { config } = req.body;
  if (!config) return res.sendStatus(404);

  // Check if this contract address already has a job.
  queue.getJob(config.contractAddress).then(job => {
    // If the job doesn't exist, add it. Otherwise return info about the existing job.
    if (!job)
      queue.add(config, { jobId: config.contractAddress }).then(job => {
        res.json(job);
      });
    else res.json(job);
  });
});

app.listen(process.env.PORT || 3000);
