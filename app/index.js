web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8543"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
})

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"votesReceivedPerCandidate","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"realCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceiver","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"incrementVotePerCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

contract = new web3.eth.Contract(abi);
contract.options.address = "0xCeF7566dF8f9ec9A862859788b800147EdCBd4e5";
// update this contract address with your contract address

candidates = {"Fillon": "candidate-1", "Le Pen": "candidate-2", "Le Pen": "candidate-3"}

function incrementVotePerCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);

 contract.methods.incrementVotePerCandidate(web3.utils.asciiToHex(candidateName)).send({gas: 140000,from: account}).then((f) => {
  let div_id = candidates[candidateName];
  contract.methods.votesReceivedPerCandidate(web3.utils.asciiToHex(candidateName)).call().then((f) => {
   $("#" + div_id).html(f);
  })
 })
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];
  
 contract.methods.votesReceivedPerCandidate(web3.utils.asciiToHex(name)).call().then((f) => {
     console.log(candidates[name]).html(f);
  $("#" + candidates[name]).html(f);
 })
 }
});