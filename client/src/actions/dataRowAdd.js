export default function dataRowAdd(inputReceived){
  console.log("dataRowAdd action is running...");
  console.log(state);
  console.log(inputReceived);

  return (
    {
      type: 'ROW-ADD',
      payload: inputReceived
    }
  );
};
