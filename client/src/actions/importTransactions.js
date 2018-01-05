export default function importTransactions(transactions){
  console.log("importTransactions action is running...");
  return (
    {
      type: 'IMPORT-TXNS',
      payload: transactions
    }
  );
};
