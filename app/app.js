web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8543"))
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
 console.log(account);
})

//import { default as contract } from 'http://localhost:8888/blockchain-2/truffle/build/contracts/Voting.json';

//import voting_artifacts from '../blockchain-2/truffle/build/contracts/Voting.json'

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"votesReceivedPerCandidate","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"realCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceiver","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"incrementVotePerCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

//var Voting = contract(voting_artifacts);
Voting = new web3.eth.Contract(abi);


let candidates = {"Fillon": "candidate-1", "Le Pen": "candidate-2", "Macron": "candidate-3"}

let account

window.incrementVotePerCandidate = function(candidate) {
  let candidateName = $("#candidate").val();
  try {
    $("#msg").html("Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait.")
    $("#candidate").val("");

    /* Voting.deployed() returns an instance of the contract. Every call
     * in Truffle returns a promise which is why we have used then()
     * everywhere we have a transaction call
     */
    Voting.deployed().then(function(contractInstance) {
      contractInstance.incrementVotePerCandidate(candidateName, {gas: 140000, from: account}).then(function() {
        let div_id = candidates[candidateName];
        return contractInstance.votesReceivedPerCandidate.call(candidateName).then(function(v) {
          $("#" + div_id).html(v.toString());
          $("#msg").html("");
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }


    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
        return
      }

      account = accs[0]

    })
  

  Voting.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    Voting.deployed().then(function(contractInstance) {
      contractInstance.votesReceivedPerCandidate.call(name).then(function(v) {
        $("#" + candidates[name]).html(v.toString());
      });
    })
  }
});