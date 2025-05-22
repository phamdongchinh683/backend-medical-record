# Decentralized Medical Record Management System

This project is a decentralized application (DApp) designed to manage medical records securely using blockchain technology. It features MetaMask wallet authentication, real-time access control updates via WebSocket (Socket.IO), and role-based access for doctors and patients.

## Features

### MetaMask Login and Registration
- Both doctors and patients log in using their MetaMask wallet address.
- Wallet address is used as a unique identifier on the blockchain.

### Doctor Role
- Search for patients by their national ID (CCCD).
- View a list of patients who have granted access.
- View detailed medical records of patients.

### Patient Role
- View a list of available doctors.
- View detailed doctor information.
- Grant or revoke access permission to doctors in real-time via WebSocket.
- Upload medical record files (e.g., PDFs, images) which are stored using IPFS.

## Technologies Used

- **Solidity** – Smart contract development.
- **React.js** – Frontend interface.
- **Web3.js** – Blockchain interactions.
- **Socket.IO** – Real-time communication for access permissions.
- **Node.js & Express** – Backend services.
- **MetaMask** – Wallet authentication.
- **IPFS** – Decentralized file storage.
