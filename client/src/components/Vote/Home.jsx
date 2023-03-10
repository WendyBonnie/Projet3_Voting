import React, { useEffect,useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";


function Proposal() {
    const {
        state: { contract, accounts },
      } = useEth();

      const [voter,setVoter]= useState()
      const [status,setStatus]= useState(0);
      const [owner,setOwner]= useState(0);
      console.log(contract)
     async function getVoter () {
        try {
                if(await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] })) {
                    let voter = await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
                    
                    setVoter(voter)
              }
            } catch (error) {

            alert(error.message.split("VM Exception while processing transaction: revert")[1]);
         }
     } 

     async function startProposal() {
        try {
            if(await contract.methods.startProposalsRegistering().call({ from: accounts[0] })) {
                // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
                let status = await contract.methods.startProposalsRegistering().call({ from: accounts[0] });
               console.log(status);
          }
        } catch (error) {
            console.log(error);
        alert(error.message.split("VM Exception while processing transaction: revert")[1]);
     }
     }

     function getStatus () {
        utils.getStatus(contract,accounts).then((result,err)=> {
            if(err){
                console.log(err);
            } else {
              
                setStatus(result)
            }
        })
     }
     function getOwner () {
        utils.getOwner(contract,accounts).then((result,err)=> {
            if(err){
                console.log(err);
            } else {
              
                setOwner(result)
            }
        })
     }

     

      useEffect(()=> {
        getVoter()
        getStatus()
        getOwner()
    },[accounts])

      useEffect(()=> {
       console.log("Voter",voter);
       console.log("status",status)
       console.log("status",owner)
      },[voter,status,owner])

  return (
    <Row>
      <Col>


      
        <h1>Bienvenue sur le vote du comité d'entreprise Lalaland</h1>
        <button onClick={startProposal} >Lancer la session enregistrement de proposition</button>
      </Col>
    </Row>
  );
}

export default Proposal;
