# Quick Start: Your First Interaction

This guide will walk you through setting up a project with the Saros DLMM SDK and performing your first read-only interaction with the protocol.

## 1. Project Setup & Installation

Create a new directory for your project and initialize a `package.json` file. We'll use TypeScript for this example.

```bash
# Using bash
mkdir saros-starter
cd saros-starter
npm init -y
npm install @saros-finance/dlmm-sdk @solana/web3.js @coral-xyz/anchor bs58
npm install -D typescript @types/node ts-node
```

Next, create a `tsconfig.json` file to configure TypeScript:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## 2. Setting up the Connection

Create a new file named `index.ts`. In this file, we'll set up our connection to the Solana devnet and create a wallet instance.

:::info Info
For this example, we're generating a new keypair. In a real-world frontend application, you would use a wallet adapter (like `@solana/wallet-adapter-react`) to get the user's public key and sign transactions.
:::

```typescript
// index.ts
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { IDL as SarosDlmmIdl } from '@saros-finance/dlmm-sdk';
import bs58 from 'bs58';

// --- Configuration ---
const RPC_URL = 'https://api.devnet.solana.com';
const PROGRAM_ID = new PublicKey('LBUZKhRxPF3XG2A2qRFF2a8sFkvv4noG2_your_program_id'); // Replace with actual Program ID
const PAIR_ADDRESS = new PublicKey('58oQChx4yWmvKdwLLZzBi4ChoCc2fqbAaGgBG5eGgX2T'); // Example SOL/USDC pair

async function main() {
  console.log("Setting up connection...");
  const connection = new Connection(RPC_URL, 'confirmed');
  
  const secretKey = bs58.decode('your_base58_secret_key_here'); // Replace with a devnet wallet secret key
  const wallet = Keypair.fromSecretKey(secretKey);
  const provider = new AnchorProvider(connection, { publicKey: wallet.publicKey, signTransaction: wallet.signTransaction, signAllTransactions: wallet.signAllTransactions }, { commitment: 'confirmed' });

  console.log("Initializing Saros DLMM program...");
  const program = new Program(SarosDlmmIdl, PROGRAM_ID, provider);

  console.log(`Fetching state for pair: ${PAIR_ADDRESS.toBase58()}`);
  
  try {
    const pairState = await program.account.pair.fetch(PAIR_ADDRESS);
    
    console.log("\n--- Pair State Fetched Successfully! ---");
    console.log(`Token X Mint: ${pairState.tokenMintX.toBase58()}`);
    console.log(`Token Y Mint: ${pairState.tokenMintY.toBase58()}`);
    console.log(`Active Bin ID: ${pairState.activeId.toString()}`);
    console.log(`Bin Step: ${pairState.binStep}`);
    console.log("---------------------------------------\n");
  } catch (error) {
    console.error("Failed to fetch pair state:", error);
  }
}

main().catch(err => {
  console.error(err);
});
```

## 3. Running the Script

You'll need to replace the placeholder `PROGRAM_ID` and `your_base58_secret_key_here` with current values. Execute your script using `ts-node`:

```bash
# Using bash
npx ts-node index.ts
```

If successful, you will see the on-chain state of the liquidity pair printed in your console. Congratulations, you've successfully interacted with the Saros DLMM protocol!
