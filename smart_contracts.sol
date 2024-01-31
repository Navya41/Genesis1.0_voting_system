// SPDX-License-Identifier: MIT
// VotingSystem.sol
pragma solidity ^0.8.0;

contract VotingSystem {
    mapping(string => uint256) public candidateVotes;
    mapping(address => bool) public hasVoted;

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "You have already voted");
        candidateVotes[candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getCandidateVotes(string memory candidate) public view returns (uint256) {
        return candidateVotes[candidate];
    }
}
