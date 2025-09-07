# API Reference

This page provides a high-level reference for the most common instructions in the Saros DLMM SDK.

## Program Instructions

### `swap`

Executes a token trade.

- **Parameters**: `amount` (BN), `otherAmountThreshold` (BN), `swapForY` (boolean), `swapType` (object)
- **Key Accounts**: `pair`, `binArrayLower`, `binArrayUpper`, `tokenVaultX`, `tokenVaultY`, `userVaultX`, `userVaultY`

### `createPosition`

Creates a new liquidity position NFT.

- **Parameters**: `relativeBinIdLeft` (BN), `relativeBinIdRight` (BN)
- **Key Accounts**: `pair`, `position` (PDA), `positionMint` (New Keypair), `positionTokenAccount`, `user`

### `increasePosition`

Deposits tokens into an existing position.

- **Parameters**: `amountX` (BN), `amountY` (BN), `liquidityDistribution` (array)
- **Key Accounts**: `pair`, `position`, `binArray*`, `tokenVault*`, `userVault*`, `positionTokenAccount`

### `decreasePosition`

Withdraws a specific amount of liquidity from a position.

- **Parameters**: `sharesToRemove` (BN[])
- **Key Accounts**: Same as `increasePosition`
