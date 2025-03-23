module.exports = {
  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: 5777,       // Any network (default: none)
      gas: 10000000,     
      gasPrice: 20000000000
    }
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.21",
       settings: {          
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
       }
    }
  },
};
