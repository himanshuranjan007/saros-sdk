# Tutorial: Providing Liquidity

Adding liquidity to a Saros DLMM pool is a two-step process:

1. **Create a Position**: This mints an NFT that represents your ownership and defines the price range (bins) of your liquidity.
2. **Increase Position**: This is where you actually deposit your tokens into the range defined by your position NFT.

## Step 1: Create a Position

First, we need to create a new mint for our position NFT and then call the `createPosition` instruction. This instruction sets the lower and upper bin boundaries for our liquidity.

```typescript
import { createMint } from "@solana/spl-token";
import { TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

// Define the range relative to the active price bin
const relativeBinIdLeft = -10;  // 10 bins to the left
const relativeBinIdRight = 10; // 10 bins to the right

const positionMint = await createMint(
    connection, wallet.payer, wallet.publicKey, null, 0, undefined, undefined, TOKEN_2022_PROGRAM_ID
);

// Derive PDAs
const [positionPda] = PublicKey.findProgramAddressSync([...]);
const [positionTokenAccount] = PublicKey.findProgramAddressSync([...]);

await program.methods
    .createPosition(new BN(relativeBinIdLeft), new BN(relativeBinIdRight))
    .accounts({...})
    .signers([positionMint])
    .rpc();

console.log(`Position NFT created: ${positionMint.toBase58()}`);
```

## Step 2: Increase Position (Deposit Tokens)

With a position created, we can now deposit tokens. The key part is defining the `liquidityDistribution`. This tells the program how to allocate your tokens across the bins. For this example, we'll use a uniform "Spot" distribution.

```typescript
const amountX = new BN(1_000_000); // Amount of Token X
const amountY = new BN(1_000_000); // Amount of Token Y

// Create a uniform distribution across our range
const liquidityDistribution = [];
const totalBins = relativeBinIdRight - relativeBinIdLeft + 1;
const distributionPerBin = 10000 / totalBins;

for (let i = relativeBinIdLeft; i <= relativeBinIdRight; i++) {
    if (i < 0) {
        liquidityDistribution.push({ relativeBinId: i, distributionX: distributionPerBin, distributionY: 0 });
    } else if (i > 0) {
        liquidityDistribution.push({ relativeBinId: i, distributionX: 0, distributionY: distributionPerBin });
    } else {
        liquidityDistribution.push({ relativeBinId: i, distributionX: distributionPerBin / 2, distributionY: distributionPerBin / 2 });
    }
}

await program.methods
    .increasePosition(amountX, amountY, liquidityDistribution)
    .accounts({...})
    .rpc();

console.log("Successfully added liquidity!");
```
