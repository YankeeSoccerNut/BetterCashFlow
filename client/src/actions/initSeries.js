// Actions inform Reducers that an event has occurred.

export default function initSeries(){
  console.log("actions.initSeries running...");
  return (
    {
      type: 'INIT-SERIES'
    }
  );
};
