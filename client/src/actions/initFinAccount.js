// Actions inform Reducers that an event has occurred.

export default function initFinAccount(accountObject){
  console.log("actions.initFinAccount running...");
  return (
    {
      type: 'INIT-FIN-ACCT',
      payload: accountObject
    }
  );
};
