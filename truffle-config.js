const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  rpc: {

    host:"localhost",
    port:8453
  },
  
  networks: {
    development: {
        host: "localhost",
        port: 8543,
        network_id:"*",
        from: "0x5433647c05b6DDFAc3dA97A7841F8434e3C5b50C",
        gas: 5000000
    }
  },
 // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },

// Configure your compilers
  compilers: {
    solc: {
      version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      evmVersion: "byzantium"
      }
    }
  },
  
};
