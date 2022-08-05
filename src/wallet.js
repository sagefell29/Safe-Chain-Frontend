import { MadiTrackABI } from "./sc_abi/abi";
const { ethers } = require("ethers");
const BigNumber = require("bignumber.js");

export var requestArray = [];
export let ppcontract;
export let MediTrackAddress;
export let account;

export default async function initWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // MetaMask requires requesting permission to connect users accounts
  account = await provider.send("eth_requestAccounts", []);
}

export async function getPatientRequests(address) {
  requestArray = [];
  ppcontract = address;
  var requestCount;

  const getPatientContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, MadiTrackABI, signer);
    return contract;
  };

  var contract = getPatientContract();

  requestCount = contract.getactiveRequestCount().then((res) => {
    return new BigNumber(res._hex).toNumber();
  });
  for (var i = 0; i < (await requestCount); i++) {
    // eslint-disable-next-line no-loop-func
    contract.getRequest(i).then((res) => {
      requestArray.push(res);
    });
  }
  return await requestArray;
}

export function updateRequestActive(index) {
  console.log(index);

  const getPatientContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ppcontract, MadiTrackABI, signer);
    return contract;
  };

  var contract = getPatientContract();

  contract.updateActive(index).then(() => {
    getPatientRequests(ppcontract);
  });
}
