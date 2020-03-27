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
  from: "0xfdbbbfa6a6b5620815b1c62dd641539aff43ae91",
  gas: 180000,
  gasLimit: 200000,
  
  }
  }
  };