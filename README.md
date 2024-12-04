# Blockchain Technology Application in eGovernment
e-Voting DApp code dump for blockchain exercises

**Code Flow Summary:**

**1. Smart Contract (Voting.sol):**
   - Defines the logic for voting, including storing candidates, ensuring one vote per user, and emitting events.

**2. Frontend JavaScript (app.js):**
- Connects to the blockchain via Web3 and interacts with the smart contract.
- Fetches candidate data and listens for votes.

**3. Frontend HTML (index.html):**
- Provides a user interface for interacting with the voting system.
- Displays candidates and allows users to cast votes.

**4. Deployment Script (2_deploy_contracts.js):**
- Deploys the smart contract to the blockchain during development.
