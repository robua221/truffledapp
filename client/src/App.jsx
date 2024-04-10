import { useState, useEffect } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Web3 from "web3";
import "./App.css";
const App = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState("nill");

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // console.log(web3);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      // console.log(deployedNetwork.address);
      //  to interact with smart contractwe need
      // 1)ABI
      // 2)Contract address
      const contract = new web3.eth.Contract(SimpleStorage.abi, deployedNetwork.address);
      // console.log(contract); instance of contract with whom we are going to make an interaction

      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);
  // console.log(state)
  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const data = await contract.methods.getter().call();
      // console.log(data.toString());
      setData(data.toString());
    }
    contract && readData();
  }, [state]);
  async function writeData() {
    const { contract } = state;
    const data = document.querySelector("#value").value;
    await contract.methods.setter(data).send({ from: "0xc4D445786CA85EE14e0D7c462FE1541Fbf19a113" });
    window.location.reload();
  }

  return (
    <>
      <h1>Welcome to Dapp</h1>
      <div className="App">
        <p className="text">Contract Data : {data}</p>
        <div>
          <input type="text" id="value" required="required"></input>
        </div>

        <button onClick={writeData} className="button button2">
          Change Data
        </button>
      </div>
    </>
  );
};

export default App;
