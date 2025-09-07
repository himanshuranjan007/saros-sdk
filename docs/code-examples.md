# Runnable Code Examples

This section provides complete, self-contained TypeScript scripts for the main SDK functionalities. You can copy, paste, and run these directly after filling in your wallet's secret key and the required public keys.

:::warning Warning
These examples are configured for **Solana Devnet**. You will need a devnet wallet with some SOL to pay for transaction fees. Do not use your mainnet private key.
:::

## 1. Full Swap Script (`swap.ts`)

This script executes an "exact input" swap of Token X for Token Y.

```typescript
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { AnchorProvider, Program, BN, utils } from '@coral-xyz/anchor';
import { IDL as SarosDlmmIdl } from '@saros-finance/dlmm-sdk';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import bs58 from 'bs58';

// --- CONFIGURATION ---
const RPC_URL = 'https://api.devnet.solana.com';
const PROGRAM_ID = new PublicKey('LBUZKhRxPF3XG2A2qRFF2a8sFkvv4noG2_your_program_id');
const PAIR_ADDRESS = new PublicKey('58oQChx4yWmvKdwLLZzBi4ChoCc2fqbAaGgBG5eGgX2T');
const WALLET_SECRET_KEY = 'YOUR_DEVNET_WALLET_SECRET_KEY_HERE';

async function main() {
    // Initialization...
    const connection = new Connection(RPC_URL, 'confirmed');
    const wallet = Keypair.fromSecretKey(bs58.decode(WALLET_SECRET_KEY));
    const provider = new AnchorProvider(connection, { publicKey: wallet.publicKey, signTransaction: wallet.signTransaction, signAllTransactions: wallet.signAllTransactions }, { commitment: 'confirmed' });
    const program = new Program(SarosDlmmIdl, PROGRAM_ID, provider);
    
    // Fetching state and preparing accounts...
    const pairState = await program.account.pair.fetch(PAIR_ADDRESS);
    const [TOKEN_X_MINT, TOKEN_Y_MINT] = [pairState.tokenMintX, pairState.tokenMintY];
    const [userVaultX, userVaultY] = await Promise.all([
        getOrCreateAssociatedTokenAccount(connection, wallet, TOKEN_X_MINT, wallet.publicKey),
        getOrCreateAssociatedTokenAccount(connection, wallet, TOKEN_Y_MINT, wallet.publicKey)
    ]);
    
    // Deriving PDAs...
    const [tokenVaultXPda] = PublicKey.findProgramAddressSync([...]);
    const [tokenVaultYPda] = PublicKey.findProgramAddressSync([...]);
    const [binArrayLowerPda] = PublicKey.findProgramAddressSync([...]);
    const [binArrayUpperPda] = PublicKey.findProgramAddressSync([...]);

    // Swap Logic
    const amountIn = new BN(10000);
    const txSignature = await program.methods
        .swap(amountIn, new BN(0), true, { exactInput: {} })
        .accounts({...})
        .rpc();
    console.log(`\nSwap successful! View on Solscan: https://solscan.io/tx/${txSignature}?cluster=devnet`);
}

main().catch(console.error);
```
