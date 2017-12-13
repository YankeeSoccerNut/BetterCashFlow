export default function onDeleteRow(inputReceived){
  console.log("onDeleteRow action is running...");
  console.log(inputReceived);
  return (
    {
      type: 'DELETE-ROW',
      payload: inputReceived
    }
  );
};
