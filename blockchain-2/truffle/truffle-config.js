module.exports = {
  rpc: {
  host:"localhost",
  port:8543
  },
  networks: {
  development: {
  host: "localhost", 
  port: 8543,
  network_id: "*",
  from: "0xbed3886f61e56be1e9783ccd5ed781edb7d33939",
  gas: 20000000
  }
  }
  };