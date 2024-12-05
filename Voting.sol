// SPDX-License-Identifier: MIT
// Specifies the license type for the contract, required for public deployment.

pragma solidity ^0.8.0; 
// Defines the Solidity version to be used.

// The Voting contract
contract Voting2 {
    // A structure to represent a candidate
    struct Candidate {
        uint id;           // Candidate ID
        string name;       // Candidate name
        uint voteCount;    // Number of votes received
    }

    // A mapping to store candidates with their ID as the key
    mapping(uint => Candidate) public candidates;

    // A mapping to track if an address (voter) has already voted
    mapping(address => bool) public voters;

    // Tracks the number of candidates
    uint public candidatesCount;

    // Event emitted whenever a vote is cast
    event VotedEvent(uint indexed candidateId);

    // Constructor that runs once when the contract is deployed
    constructor() {
        // Initialize the contract with two candidates
        addCandidate("Alice");
        addCandidate("Bob");
    }

    // Private function to add a candidate (only callable from inside the contract)
    function addCandidate(string memory _name) private {
        candidatesCount++; // Increment the number of candidates
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        // Store the new candidate in the mapping
    }

    // Function to allow voting
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted."); 
        // Ensure the voter hasn't already voted

        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");
        // Ensure the candidate ID is valid

        voters[msg.sender] = true; // Mark the voter as having voted
        candidates[_candidateId].voteCount++; // Increment the vote count for the candidate

        emit VotedEvent(_candidateId); // Emit an event for the vote
    }
}
