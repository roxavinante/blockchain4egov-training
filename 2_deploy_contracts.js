// Import the compiled contract
const Voting = artifacts.require("Voting");

// Export a function to deploy the contract
module.exports = function (deployer) {
    deployer.deploy(Voting); // Deploy the Voting contract to the blockchain
};
