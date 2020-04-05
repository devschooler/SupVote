var supContract = artifacts.require("./voteContract.sol");

module.exports = function(deployer) {
  deployer.deploy(supContract);
};
