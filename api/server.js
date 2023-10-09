// server.js
import Fastify from "fastify";
import cors from "@fastify/cors";

const fastify = Fastify();
// Register the CORS plugin
fastify.register(cors, {
  origin: true, // reflect the request origin, as defined by req.header('Origin')
  credentials: true, // supports credentials
});

const dummyData = {
  AAPL: {
    day: [
      {
        time: "2023-10-01",
        open: 100.0,
        close: 150.0,
        high: 155.0,
        low: 140.0,
        volume: 1000,
      },
      {
        time: "2023-10-02",
        open: 110.0,
        close: 152.0,
        high: 157.0,
        low: 142.0,
        volume: 1100,
      },
      // ... (Add 10 days  daily data for AAPL
      {
        time: "2023-10-03",
        open: 120.0,
        close: 160.0,
        high: 165.0,
        low: 150.0,
        volume: 1200,
      },

      {
        time: "2023-10-04",
        open: 270.0,
        close: 170.0,
        high: 175.0,
        low: 160.0,
        volume: 1300,
      },
      {
        time: "2023-10-05",
        open: 150.0,
        close: 180.0,
        high: 185.0,
        low: 170.0,
        volume: 1400,
      },
      {
        time: "2023-10-06",
        open: 160.0,
        close: 190.0,
        high: 195.0,
        low: 180.0,
        volume: 1500,
      },
      {
        time: "2023-10-07",
        open: 160.0,
        close: 200.0,
        high: 205.0,
        low: 190.0,
        volume: 1600,
      },
      {
        time: "2023-10-08",
        open: 310.0,
        close: 210.0,
        high: 215.0,
        low: 200.0,
        volume: 1700,
      },
      {
        time: "2023-10-09",
        open: 200.0,
        close: 220.0,
        high: 225.0,
        low: 210.0,
        volume: 1800,
      },
      {
        time: "2023-10-10",
        open: 130.0,
        close: 230.0,
        high: 235.0,
        low: 220.0,
        volume: 1900,
      },
      {
        time: "2023-10-11",
        open: 290.0,
        close: 240.0,
        high: 245.0,
        low: 230.0,
        volume: 2000,
      },
      {
        time: "2023-10-12",
        open: 200.0,
        close: 250.0,
        high: 255.0,
        low: 240.0,
        volume: 2100,
      },
      {
        time: "2023-10-13",
        open: 280.0,
        close: 260.0,
        high: 265.0,
        low: 250.0,
        volume: 2200,
      },
      {
        time: "2023-10-14",
        open: 210.0,
        close: 270.0,
        high: 275.0,
        low: 260.0,
        volume: 1200,
      },
    ],

    hour: [
      {
        time: "2023-10-01T09:00:00",
        open: 100.0,
        close: 150.5,
        high: 151.0,
        low: 149.0,
        volume: 100,
      },
      {
        time: "2023-10-01T10:00:00",
        open: 130.0,
        close: 151.0,
        high: 152.0,
        low: 150.0,
        volume: 120,
      },
      // ... (Add more hourly data for AAPL)
    ],
  },
  MSFT: {
    day: [
      {
        time: "2023-10-01",
        close: 210.0,
        high: 215.0,
        low: 205.0,
        volume: 900,
      },
      {
        time: "2023-10-02",
        close: 212.0,
        high: 217.0,
        low: 208.0,
        volume: 950,
      },
      // ... (Add more daily data for MSFT)
    ],
    hour: [
      {
        time: "2023-10-01T09:00",
        close: 210.5,
        high: 211.0,
        low: 209.0,
        volume: 90,
      },
      {
        time: "2023-10-01T11:00",
        close: 211.0,
        high: 212.0,
        low: 210.0,
        volume: 95,
      },
      // ... (Add more hourly data for MSFT)
    ],
  },
};

// Mock data generator
function generateMockData(symbol, period) {
  if (dummyData[symbol] && dummyData[symbol][period]) {
    return dummyData[symbol][period];
  } else {
    return [];
  }
}

// API endpoint
fastify.get("/api/search", (request, reply) => {
  const { symbol, period } = request.query;
  if (!symbol || !period || (period !== "day" && period !== "hour")) {
    return reply
      .code(400)
      .send({ error: "Symbol and valid period (day or hour) are required." });
  }
  const data = generateMockData(symbol, period);
  reply.send(data);
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(
      `Server running on http://localhost:${fastify.server.address().port}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
