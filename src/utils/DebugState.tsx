const DebugState = ({ state, name }: { state: any; name: string }) => {
  return (
    <div>
      <pre>
        {name} : {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

export default DebugState;
