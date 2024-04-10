var SimpleStorage = artifacts.require("../contracts/SimpleStorage");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SimpleStorage, { gas: 5000000, gasPrice: 10000000000 }); // Adjust gas and gasPrice as needed
};
