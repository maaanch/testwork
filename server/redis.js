const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/express');
const Queue = require("bull");

const redisConfig = {
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  };

const myQueue = new Queue("myQueue", redisConfig);

// Optional: Set up Bull-Board for monitoring your queues
const { router } = createBullBoard([BullAdapter(myQueue)]);
