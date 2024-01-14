
export const getUserFortuneCredit = async (TransactionID: string) => {
  if (!TransactionID) return;
  const url = `https://api.explorer.aleo.org/v1/testnet3/find/blockHash//${TransactionID}`;

  const response = await fetch(url);

  let data = await response.json();
  return parseInt(data);
};
