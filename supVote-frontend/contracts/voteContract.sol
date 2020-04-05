pragma solidity 0.4.25;

contract VoteContract {
  
    struct Candidate {
        uint id;
        string name;
        uint voteNumber;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    mapping(uint => Candidate) public candidates;

    uint public incrementVoteForCandidate;
    event candidateHasVoted (
        uint indexed _candidateId
    );

    constructor () public {
        candidateCreator("Macron");
        candidateCreator("Fillon");
        candidateCreator("Le Pen");
    }

    function candidateCreator (string _name) private {
        incrementVoteForCandidate ++;
        candidates[incrementVoteForCandidate] = Candidate(incrementVoteForCandidate, _name, 0);
    }

    function voteForCandidate (uint _candidateId) public {
        require(!voters[msg.sender]);
        require(_candidateId > 0 && _candidateId <= incrementVoteForCandidate);
        voters[msg.sender] = true;
        candidates[_candidateId].voteNumber ++;

        emit candidateHasVoted(_candidateId);
    }
}
