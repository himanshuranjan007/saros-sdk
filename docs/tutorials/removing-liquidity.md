# Tutorial: Removing Liquidity

This guide explains how to withdraw your tokens from a Saros DLMM liquidity position. You can either partially withdraw or close the position entirely.

## Core Concepts

- **Position NFT**: Your liquidity is tied to your Position NFT. You need its mint address to identify which position to withdraw from.
- **Shares**: When you deposit liquidity, you receive "shares" in each bin. To withdraw, you specify how many shares you want to remove from each bin.

## Step 1: Find Your Position and Calculate Shares to Remove

First, you need the mint address of your Position NFT. Let's say we want to remove 50% of our liquidity. We need to fetch the current state of our position to see how many shares we have.

```typescript
// (Assuming program, positionPda are already defined)
const positionState = await program.account.position.fetch(positionPda);
const percentageToRemove = 5000; // 50% in basis points
const sharesToRemove = positionState.liquidityShares.map(currentShares => {
    return currentShares.mul(new BN(percentageToRemove)).div(new BN(10000));
});
```

## Step 2: Decrease the Position

With the `sharesToRemove` array calculated, we can call the `decreasePosition` instruction. This will burn the specified shares and transfer the corresponding tokens back to your wallet.

```typescript
console.log("Removing 50% of liquidity...");
const txSignature = await program.methods
    .decreasePosition(sharesToRemove)
    .accounts({...})
    .rpc();

console.log(`Successfully removed liquidity! Tx: ${txSignature}`);
```

## Closing a Position (Optional)

If you want to remove 100% of your liquidity, use the `closePosition` instruction. It withdraws everything and closes the position account.

```typescript
await program.methods.closePosition().accounts({...}).rpc();
```
