export default function onCellEdit(inputReceived){
  console.log("dataCellEdit action is running...");
  console.log(inputReceived);
  return (
    {
      type: 'CELL-EDIT',
      payload: inputReceived
    }
  );
};
