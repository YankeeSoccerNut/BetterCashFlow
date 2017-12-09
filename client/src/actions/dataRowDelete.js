export default function dataRowDelete(inputReceived){
  console.log("dataRowDelete action is running...");
  console.log(inputReceived);
  return (
    {
      type: 'ROW-DELETE',
      payload: inputReceived
    }
  );
};
