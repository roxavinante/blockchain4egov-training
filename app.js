// The ABI (Application Binary Interface) defines the structure of the contract, used to interact with it.
// Replace this placeholder with the actual ABI from Voting.json.
const contractABI = [
    /* ABI goes here */
];

// The address of the deployed contract, obtained from the migration output.
const contractAddress = '0xYourDeployedContractAddress';

// Declare variables to store Web3 and the contract instance.
let web3;
let votingContract;

// Initialize the DApp when the page loads
async function init() {
    if (window.ethereum) {
        // MetaMask injects Ethereum into the browser as `window.ethereum`.
        web3 = new Web3(window.ethereum); // Create a new Web3 instance
        await window.ethereum.enable(); // Request permission to access the user's MetaMask wallet

        // Create a new instance of the Voting contract
        votingContract = new web3.eth.Contract(contractABI, contractAddress);

        // Fetch the total number of candidates
        const candidatesCount = await votingContract.methods.candidatesCount().call();

        // Get the "candidates" div from the DOM
        const candidatesDiv = document.getElementById("candidates");

        // Loop through all candidates and display their details
        for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await votingContract.methods.candidates(i).call(); // Fetch candidate details
            const candidateElement = document.createElement("p"); // Create a new paragraph element
            candidateElement.innerText = `${candidate.id}: ${candidate.name} - ${candidate.voteCount} votes`;
            // Display candidate ID, name, and vote count
            candidatesDiv.appendChild(candidateElement); // Add the paragraph to the DOM
        }
    } else {
        // If MetaMask is not detected, display an alert
        alert("Please install MetaMask!");
    }
}

// Handle the form submission when the user votes
document.getElementById("voteForm").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const candidateId = document.getElementById("candidateId").value; // Get the candidate ID from the form
    const accounts = await web3.eth.getAccounts(); // Get the list of MetaMask accounts

    try {
        // Call the vote function on the contract
        await votingContract.methods.vote(candidateId).send({ from: accounts[0] });
        document.getElementById("message").innerText = "Vote cast successfully!";
        window.location.reload(); // Reload the page to update the vote counts
    } catch (error) {
        // Display an error message if the vote fails
        document.getElementById("message").innerText = error.message;
    }
});

// Initialize the app when the page loads
window.addEventListener("load", init);
