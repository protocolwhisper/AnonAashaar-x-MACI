import { ethers } from 'hardhat';
import "dotenv/config";

const interfaceABI = [
    "function verifyAnonAadhaarProof(uint256 nullifierSeed, uint256 nullifier, uint256 timestamp, uint256 signal, uint256[4] calldata revealArray, uint256[8] calldata groth16Proof) external view returns (bool)"
];

async function main() {
    const contractAddress = "0x6bE8Cec7a06BA19c39ef328e8c8940cEfeF7E281";
    const nullifierSeed = 1234;
    const nullifier = BigInt("7946664694698614794431553425553810756961743235367295886353548733878558886762");
    const timestamp = 1723055400;
    const signalHash = BigInt("1");
    const revealArray = [0, 0, 0, 0];
    const groth16Proof = [
        '19613209248022962921283439647150605945057246932344783811741514393358655576792',
        '10317452136102626357119986207261231864071530255051666525786478751608215619352',
        '13994908871847722567085663140437612737252173717549053134898368513577642784119',
        '10937517604583413840305698903831550128320032027729557529190335195226007343995',
        '3941484773614948918103636102848453978693783115257987335410838062880557266173',
        '4771322914308177851747009463739596736191794757050610807834050514805304981049',
        '16147646365555414367624296803676323355468634555196902628799096862578674404711',
        '8732419708886969401130742617600158786418339608433342026888275412661716099531'
    ];

    const contract = new ethers.Contract(contractAddress, interfaceABI, ethers.provider);

    try {
        const result = await contract.verifyAnonAadhaarProof(
            nullifierSeed,
            nullifier,
            timestamp,
            signalHash,
            revealArray,
            groth16Proof
        );

        console.log("Verification result:", result);
    } catch (error) {
        console.error("Error calling verifyAnonAadhaarProof:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
