export const getBlockHashFromTxID = async (transactionID: string) => {
  if (!transactionID) return;
  const url = `https://api.explorer.aleo.org/v1/testnet3/find/blockHash/${transactionID}`;

  const response = await fetch(url);

  let data = await response.json();

  return data;
};
