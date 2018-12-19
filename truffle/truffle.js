const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "vault betray kangaroo sorry expose theory upper leaf useless oil return ring crucial soda suffer"

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/2d3acada7043465a825ec77f72387223")
      },
      network_id: 2
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/2d3acada7043465a825ec77f72387223")
      },
      network_id: 3
    },
  },
  solc: {
      optimizer: {
          enabled: true,
          runs: 200
      },
  },
};
