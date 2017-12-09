export default function loadTransactions(transactions){
  console.log("loadTransactions action is running...");
  return (
    {
      type: 'LOAD-TXNS',
      payload: transactions
    }
  );
};
