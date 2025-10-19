// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {Context} from "../lib/openzeppelin-contracts/contracts/utils/Context.sol";
import {Strings} from "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";

// FIX: Removed explicit inheritance of 'Context' as it is inherited by ERC1155.
contract VCPackIssuer is ERC1155, Ownable {
    using Strings for uint256;

    enum SubmissionStatus {
        NotSubmitted,
        Pending,
        Approved
    }

    struct Milestone {
        string description;
    }

    struct Pack {
        uint256 id;
        string name;
        string metadataURI;
        Milestone[] milestones;
    }

    mapping(uint256 => Pack) public packs;

    uint256 public nextPackId = 1;

    mapping(address => mapping(uint256 => uint256)) public holderProgress;

    mapping(address => mapping(uint256 => mapping(uint256 => uint8))) public submissionStatus;

    event PackCreated(uint256 indexed packId, string name, string metadataURI, uint256 milestoneCount);
    event MilestoneSubmitted(address indexed holder, uint256 indexed packId, uint256 milestoneIndex, string proofCID);
    event MilestoneApproved(address indexed holder, uint256 indexed packId, uint256 milestoneIndex, uint256 newProgress);
    event MilestoneRejected(address indexed holder, uint256 indexed packId, uint256 milestoneIndex);
    event PackMinted(address indexed holder, uint256 indexed packId, string finalMetadataURI);

    constructor(string memory _uri, address initialOwner) ERC1155(_uri) Ownable(initialOwner) {}

    function createPack(
        string memory _name,
        string memory _metadataURI,
        Milestone[] memory _milestones
    ) external onlyOwner {
        require(_milestones.length > 0, "Pack must have at least one milestone");

        uint256 currentPackId = nextPackId;

        // FIX: Instead of copying the dynamic array directly (which fails in legacy pipeline),
        // we use a storage reference and push elements iteratively.
        Pack storage newPack = packs[currentPackId];

        // Initialize scalar/static members
        newPack.id = currentPackId;
        newPack.name = _name;
        newPack.metadataURI = _metadataURI;

        // Copy dynamic array (milestones) element by element
        for (uint256 i = 0; i < _milestones.length; i++) {
            newPack.milestones.push(_milestones[i]);
        }

        nextPackId++;

        emit PackCreated(currentPackId, _name, _metadataURI, _milestones.length);
    }

    function approveMilestone(
        address _holder,
        uint256 _packId,
        uint256 _milestoneIndex
    ) external onlyOwner {
        Pack storage pack = packs[_packId];
        require(pack.id != 0, "Pack does not exist");
        require(_milestoneIndex < pack.milestones.length, "Invalid milestone index");

        uint8 currentStatus = submissionStatus[_holder][_packId][_milestoneIndex];
        require(currentStatus == uint8(SubmissionStatus.Pending), "Milestone must be Pending (1)");

        submissionStatus[_holder][_packId][_milestoneIndex] = uint8(SubmissionStatus.Approved);

        holderProgress[_holder][_packId]++;

        emit MilestoneApproved(_holder, _packId, _milestoneIndex, holderProgress[_holder][_packId]);
    }

    function rejectMilestone(
        address _holder,
        uint256 _packId,
        uint256 _milestoneIndex
    ) external onlyOwner {
        Pack storage pack = packs[_packId];
        require(pack.id != 0, "Pack does not exist");
        require(_milestoneIndex < pack.milestones.length, "Invalid milestone index");

        uint8 currentStatus = submissionStatus[_holder][_packId][_milestoneIndex];
        require(currentStatus != uint8(SubmissionStatus.Approved), "Cannot reject an Approved milestone");

        submissionStatus[_holder][_packId][_milestoneIndex] = uint8(SubmissionStatus.NotSubmitted);

        emit MilestoneRejected(_holder, _packId, _milestoneIndex);
    }

    function submitMilestone(
        uint256 _packId,
        uint256 _milestoneIndex,
        string memory _proofCID
    ) external {
        Pack storage pack = packs[_packId];
        require(pack.id != 0, "Pack does not exist");
        require(_milestoneIndex < pack.milestones.length, "Invalid milestone index");

        uint8 currentStatus = submissionStatus[_msgSender()][_packId][_milestoneIndex];

        require(
            currentStatus == uint8(SubmissionStatus.NotSubmitted),
            "Milestone is currently Pending or Approved"
        );

        submissionStatus[_msgSender()][_packId][_milestoneIndex] = uint8(SubmissionStatus.Pending);

        emit MilestoneSubmitted(_msgSender(), _packId, _milestoneIndex, _proofCID);
    }

    function mintCompletedPack(
        uint256 _packId,
        string memory _finalMetadataURI
    ) external {
        Pack storage pack = packs[_packId];
        require(pack.id != 0, "Pack does not exist");

        require(
            holderProgress[_msgSender()][_packId] == pack.milestones.length,
            "Pack not yet complete: required milestones not met"
        );

        require(balanceOf(_msgSender(), _packId) == 0, "Pack already minted");

        _mint(_msgSender(), _packId, 1, "");

        emit PackMinted(_msgSender(), _packId, _finalMetadataURI);
    }

    function getRequiredMilestoneCount(uint256 _packId) public view returns (uint256) {
        return packs[_packId].milestones.length;
    }
}