// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @dev Smart contract for conducting voting process.
 */
contract Voting is Ownable {
    uint public winningProposalID; // ID of the winning proposal

    struct Voter {
        bool isRegistered; // Flag indicating whether the voter is registered
        bool hasVoted; // Flag indicating whether the voter has voted
        uint votedProposalId; // ID of the proposal voted by the voter
    }

    struct Proposal {
        string description; // Description of the proposal
        uint voteCount; // Total number of votes received by the proposal
    }

    enum WorkflowStatus {
        RegisteringVoters, // The initial state of the contract
        ProposalsRegistrationStarted, // The state when the registering of proposals is started
        ProposalsRegistrationEnded, // The state when the registering of proposals is ended
        VotingSessionStarted, // The state when the voting session is started
        VotingSessionEnded, // The state when the voting session is ended
        VotesTallied // The state when the votes are tallied
    }

    WorkflowStatus public workflowStatus; // The current status of the contract
    Proposal[] proposalsArray; // The array of proposals
    mapping(address => Voter) voters; // The mapping of voters

    event VoterRegistered(address voterAddress); // Event triggered when a new voter is registered
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    ); // Event triggered when the workflow status is changed
    event ProposalRegistered(uint proposalId); // Event triggered when a new proposal is registered
    event Voted(address voter, uint proposalId); // Event triggered when a voter has casted their vote

    /**
     * @dev Modifier to restrict function access to registered voters only
     */
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     * @dev Returns the voter details of a given address
     * @param _addr The address of the voter
     * @return Voter The voter details
     */
    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /**
     * @dev Returns the details of a proposal given its ID
     * @param _id The ID of the proposal
     * @return Proposal The proposal details
     */
    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /**
     * @dev Registers a new voter
     * @param _addr The address of the voter to be registered
     */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /**
     * @dev Adds a new proposal to the proposals array
     * @param _desc The description of the proposal to be added
     */

    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
     * @dev Registers a vote for the given proposal ID by the calling address.
     * Only voters can call this function during the VotingSessionStarted workflow status.
     * The calling address cannot vote twice and the proposal ID must exist in the proposalsArray.
     * Increases the vote count for the voted proposal.
     * Emits a Voted event.
     * @param _id The ID of the proposal to vote for.
     */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //
    /**
     * @dev Sets the workflow status to ProposalsRegistrationStarted and initializes the proposalsArray with a GENESIS proposal.
     * Only the owner can call this function during the RegisteringVoters workflow status.
     * Emits a WorkflowStatusChange event.
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
     * @dev Sets the workflow status to ProposalsRegistrationEnded.
     * Only the owner can call this function during the ProposalsRegistrationStarted workflow status.
     * Emits a WorkflowStatusChange event.
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @dev Sets the workflow status to VotingSessionStarted.
     * Only the owner can call this function during the ProposalsRegistrationEnded workflow status.
     * Emits a WorkflowStatusChange event.
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @dev Sets the workflow status to VotingSessionEnded and determines the winning proposal ID.
     * Only the owner can call this function during the VotingSessionStarted workflow status.
     * Emits a WorkflowStatusChange event.
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @dev Determines the winning proposal ID and sets the workflow status to VotesTallied.
     * Only the owner can call this function during the VotingSessionEnded workflow status.
     * Emits a WorkflowStatusChange event.
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
