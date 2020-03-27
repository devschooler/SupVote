var voting = artifacts.require("Voting");
module.exports = function(deployer) {
   deployer.deploy(voting,['Fillon','Le Pen','Le Pen'] .map(x => web3.utils.asciiToHex(x)));
  
};