import useEth from "../../contexts/EthContext/useEth";

const utils = {
  getStatus: async (contract, accounts) => {
    try {
      if (await contract.methods.workflowStatus().call({ from: accounts[0] })) {
        // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        let status = await contract.methods
          .workflowStatus()
          .call({ from: accounts[0] });
        return status;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getOwner: async (contract, accounts) => {
    try {
      if (await contract.methods.owner().call({ from: accounts[0] })) {
        // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        let status = await contract.methods.owner().call({ from: accounts[0] });
        return status;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getVoter: async (contract, accounts, setVoter) => {
    try {
      if (
        await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] })
      ) {
        let voter = await contract.methods
          .getVoter(accounts[0])
          .call({ from: accounts[0] });

        setVoter(voter);
      }
    } catch (error) {
      console.log(
        error.message.split(
          "VM Exception while processing transaction: revert"
        )[1]
      );
    }
  },
};

export default utils;
