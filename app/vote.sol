pragma solidity ^0.6.4;
contract Voting {
  mapping (bytes32 => uint256) public voteReceiver;

  bytes32[] public candidateList;

  constructor(bytes32[] memory candidateNames) public {
    candidateList = candidateNames;
  }

  function votesReceivedPerCandidate(bytes32 candidate) view public returns (uint256) {
    require(realCandidate(candidate));
    return voteReceiver[candidate];
  }


  function incrementVotePerCandidate(bytes32 candidate) public {
    require(realCandidate(candidate));
    voteReceiver[candidate] += 1;
  }

  function realCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}