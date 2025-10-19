// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";

import {VCPackIssuer} from "../src/VCPackIssuer.sol"; 

contract DeployVCPackIssuerScript is Script {
    // Configuration constants
    uint256 private constant DEPLOYER_PRIVATE_KEY = 0x1; 
    string private constant BASE_URI = "ipfs://vcp-base-uri-2024/";

    function run() public {
        // Get the address corresponding to the deployer private key
        address deployer = vm.addr(DEPLOYER_PRIVATE_KEY);

        console.log("--- VCPackIssuer Deployment Script Started ---");
        console.log("Deployer Address:", deployer);
        console.log("Base URI for ERC1155:", BASE_URI);

        // Start broadcasting transactions using the deployer's key
        vm.startBroadcast(DEPLOYER_PRIVATE_KEY);

        // Deploy the contract, passing the BASE_URI and the deployer (owner) address
        VCPackIssuer issuer = new VCPackIssuer(
            BASE_URI, 
            deployer
        );

        // Log the deployment address
        console.log("Deployed VCPackIssuer at:", address(issuer));
        
        // Stop broadcasting transactions
        vm.stopBroadcast();
        console.log("--- VCPackIssuer Deployment Script Finished ---");
    }
}