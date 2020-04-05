App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  alreadyVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8543');
      web3 = new Web3(App.web3Provider); 
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("VoteContract.json", function(VoteForCandidate) {
      App.contracts.VoteContract = TruffleContract(VoteForCandidate);
      App.contracts.VoteContract.setProvider(App.web3Provider);
      App.listenForEvents();
      return App.render();
    });
  },

  listenForEvents: function() {
    App.contracts.VoteContract.deployed().then(function(instance) {
      instance.candidateHasVoted({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        App.render();
      });
    });
  },

  render: function() {
    var supStance;
    var loadingBar = $("#loadingBar");
    var htmlContent = $("#htmlContent");
    loadingBar.show();
    htmlContent.hide();
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#voterAddress").html("Vous êtes connecté avec le compte : " + account);
      }
    });

    App.contracts.VoteContract.deployed().then(function(instance) {
      supStance = instance;
      return supStance.incrementVoteForCandidate();
    }).then(function(incrementVoteForCandidate) {
      var resultsPerCandidate = $("#resultsPerCandidate");
      resultsPerCandidate.empty();
      var choosenCandidate = $('#choosenCandidate');
      choosenCandidate.empty();

      for (var i = 1; i <= incrementVoteForCandidate; i++) {
        supStance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteNumber = candidate[2];
          var htmlForCandidate = `<tr><td class='${name}'>   ${name}  </td><td>  ${voteNumber}  </td></tr>`;



      
          resultsPerCandidate.append(htmlForCandidate);

          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          choosenCandidate.append(candidateOption);
        });
      }
      return supStance.voters(App.account);


    }).then(function(alreadyVoted) {
  
      if(alreadyVoted) {
       $('form').hide();
     $("#votedOrNot").html("Vous avez déjà voté avec ce compte ! Chaque compte ne peut voter qu'une fois !  " );

      }
      loadingBar.hide();
      htmlContent.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  loadVote: function() {
    var candidateId = $('#choosenCandidate').val();
    App.contracts.VoteContract.deployed().then(function(instance) {
      return instance.voteForCandidate(candidateId, { gas: 140000, from: App.account });
    }).then(function(result) {
      $("#htmlContent").hide();
      $("#loadingBar").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
