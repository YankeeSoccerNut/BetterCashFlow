// Actions inform Reducers that an event has occurred.

export default function newProjection(projections){
  console.log("actions.newProjection running...\n", projections);
  return (
    {
      type: 'NEW-PROJECTION',
      payload: projections
    }
  );
};
