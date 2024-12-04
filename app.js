const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "VotedEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "candidatesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = "0x42FFb36B680630fbFe9Ad1aa1A9501584a6EE705";

let web3;
let votingContract;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        votingContract = new web3.eth.Contract(contractABI, contractAddress);

        const candidatesCount = await votingContract.methods.candidatesCount().call();
        const candidatesDiv = document.getElementById("candidates");

        for (let i = 1; i <= candidatesCount; i++) {
            const candidate = await votingContract.methods.candidates(i).call();
            const candidateElement = document.createElement("p");
            candidateElement.innerText = `${candidate.id}: ${candidate.name} - ${candidate.voteCount} votes`;
            candidatesDiv.appendChild(candidateElement);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

document.getElementById("voteForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const candidateId = document.getElementById("candidateId").value;
    const accounts = await web3.eth.getAccounts();

    try {
        await votingContract.methods.vote(candidateId).send({ from: accounts[0] });
        document.getElementById("message").innerText = "Vote cast successfully!";
        window.location.reload();
    } catch (error) {
        document.getElementById("message").innerText = error.message;
    }
});

window.addEventListener("load", init);
