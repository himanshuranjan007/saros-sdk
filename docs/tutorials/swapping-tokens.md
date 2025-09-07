# Tutorial: Swapping Tokens

This tutorial provides a step-by-step guide to executing a token swap on a Saros DLMM pool using the SDK.

:::info Info
You can find a complete, runnable script for this tutorial in the [Runnable Code Examples](/code-examples) section.
:::

## Core Concepts

- **Pair & Vaults**: A DLMM pool is called a `Pair`. It holds tokens in two separate `Vaults` (one for Token X, one for Token Y). When you swap, you're sending tokens to one vault and receiving them from the other.
- **Bin Arrays**: Liquidity in a DLMM pool is organized into discrete price ranges called `bins`. These bins are stored on-chain in `Bin Arrays`. Any swap or liquidity operation needs to reference these arrays.
- **PDAs (Program Derived Addresses)**: Most accounts you interact with (vaults, bin arrays) are not standard public keys but are derived from the program's ID and certain seeds. You must derive these addresses correctly in your code.

## Step-by-Step Swap Process

### Step 1: Initialize SDK and Define Constants

First, set up your connection, wallet, and initialize the Anchor program as shown in the **Quick Start** guide. You will also need the addresses for the pair, the token mints, and your personal Associated Token Accounts (ATAs) for those mints.

```typescript
// (Assuming connection, wallet, provider, and program are initialized)
const PAIR_ADDRESS = new PublicKey('...');
const TOKEN_X_MINT = new PublicKey('...'); // e.g., USDC
const TOKEN_Y_MINT = new PublicKey('...'); // e.g., SOL
// Your token accounts
const USER_VAULT_X = new PublicKey('...');
const USER_VAULT_Y = new PublicKey('...');
```

### Step 2: Derive Required PDAs

The `swap` instruction requires several accounts. We need to derive the PDAs for the pair's token vaults and the active bin arrays.

```typescript
import { PublicKey } from '@solana/web3.js';
import { utils } from '@coral-xyz/anchor';

// Derive pair's token vaults
const [tokenVaultXPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("token_vault"), PAIR_ADDRESS.toBuffer(), TOKEN_X_MINT.toBuffer()],
    program.programId
);

// Derive bin arrays. Most pairs use indices 0 and 1.
const [binArrayLowerPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("bin_array"), PAIR_ADDRESS.toBuffer(), Buffer.from(new Uint8Array(new BN(0).toArray("le", 4)))],
    program.programId
);
```

### Step 3: Construct and Send the Transaction

Now we can build the `swap` instruction. We'll perform an **Exact Input** swap, meaning we specify exactly how much we want to send.

```typescript
import { BN } from '@coral-xyz/anchor';

// Swap 1 USDC (assuming 6 decimals) for SOL
const amountIn = new BN(1_000_000); 
// Set slippage tolerance. 0 means we accept any amount out.
const otherAmountThreshold = new BN(0);
// `true` to swap X for Y, `false` for Y for X
const swapForY = true; 

console.log("Sending swap transaction...");
const txSignature = await program.methods
    .swap(amountIn, otherAmountThreshold, swapForY, { exactInput: {} })
    .accounts({
        pair: PAIR_ADDRESS,
        binArrayLower: binArrayLowerPda,
        binArrayUpper: binArrayUpperPda,
        tokenMintX: TOKEN_X_MINT,
        userVaultY: USER_VAULT_Y,
        user: wallet.publicKey,
    })
    .rpc();

console.log(`Swap successful! Transaction signature: ${txSignature}`);
```
