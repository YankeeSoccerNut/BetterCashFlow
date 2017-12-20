// Actions inform Reducers that an event has occurred.

export default function newObservations(observations){
  console.log("actions.newObservations running...\n", observations);
  return (
    {
      type: 'NEW-OBSERVATIONS'
    }
  );
};
