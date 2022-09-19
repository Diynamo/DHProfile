import { ethers } from "ethers";
import cristianoWhitelist from "../lib/contract/cristianoWhitelist.json";

const CONTRACT_ADDRESS = "0xF3185BB3FeCd02FBFEbF1064760B8420ed8cfDDF";
const rpcProvider = new ethers.providers.JsonRpcProvider('https://matic-mumbai.chainstacklabs.com');
const contract = new ethers.Contract(CONTRACT_ADDRESS, cristianoWhitelist, rpcProvider);

export async function getBalance(address) {
  try {
    const response = await contract.balance(address);
    return response;
  } catch (err) {
    // console.log(err);
  }
}

export async function getTotalBought() {
  try {
    const response = await contract.total_bought();
    return response;
  } catch (err) {
    // console.log(err);
  }
}

export async function getTotalLeft() {
  try {
    const response = await contract.total_left();
    return response;
  } catch (err) {
    // console.log(err);
  }
}

export async function getList(id) {
  try {
    const response = await contract.get_list(id);
    return response;
  } catch (err) {
    // console.log(err);
  }
}

