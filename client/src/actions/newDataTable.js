// Actions inform Reducers that an event has occurred.

export default function newDataTable(dataTable){
  console.log("actions.newDataTable running...\n", dataTable);
  return (
    {
      type: 'NEW-DATATABLE',
      payload: dataTable
    }
  );
};
