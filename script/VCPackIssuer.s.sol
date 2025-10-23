// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "../lib/forge-std/src/Script.sol";
import {console} from "../lib/forge-std/src/console.sol";

import {VCPackIssuer} from "../src/VCPackIssuer.sol"; 

contract DeployVCPackIssuerScript is Script {
    // Configuration constants
    string private constant BASE_URI = "ipfs://vcp-base-uri-2024/";

    function run() public {
        // Get the address corresponding to the deployer private key
        address deployer = vm.addr(vm.envUint("PRIVATE_KEY"));

        console.log("--- VCPackIssuer Deployment Script Started ---");
        console.log("Deployer Address:", deployer);
        console.log("Base URI for ERC1155:", BASE_URI);

        // Start broadcasting transactions using the deployer's key
        vm.startBroadcast();

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