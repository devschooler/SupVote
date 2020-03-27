var voting = artifacts.require("Voting");
module.exports = function(deployer) {
   deployer.deploy(voting,['Fillon','Le Pen','Macron'].map(x => web3.utils.asciiToHex(x)));
  
};