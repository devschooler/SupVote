module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8543,
      network_id: "*" ,// Match any network id
      from: "0x39b74d0de8339200857fc2200ce6252edc1df1dc",
      gas: 20000000,
    }
  },
  compilers: {
    solc: {
      version: '0.4.25',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
