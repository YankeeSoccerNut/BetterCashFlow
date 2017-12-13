export default function onAddRow(inputReceived){
  console.log("onAddRow action is running...");
  console.log(inputReceived);

  return (
    {
      type: 'ADD-ROW',
      payload: inputReceived
    }
  );
};
