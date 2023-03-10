
import useEth from "../../contexts/EthContext/useEth";

;
const utils = {
 
getStatus: async (contract,accounts) => {
  
    try {
        if(await contract.methods.workflowStatus().call({ from: accounts[0] })) {
            // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
            let status = await contract.methods.workflowStatus().call({ from: accounts[0] });
            return status
      }
    } catch (error) {
      
    alert("Error on status");
 }
}
    
};

export default utils;
