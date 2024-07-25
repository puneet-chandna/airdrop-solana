const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = Keypair.generate();

const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
        
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet balance is ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};
const airDropSol = async () => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
        const fromDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromDropSignature);
    }catch(err){
        console.log(err);
    }

}
const main = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};

main();