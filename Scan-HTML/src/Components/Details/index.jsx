function Details({ data }) {
  return (
    <div className="container">
      {data.map((file, index) => (
        <details key={index}>
          <summary>{file.serial}</summary>
          <pre className="json-code">{JSON.stringify(file, null, 2)}</pre>
        </details>
      ))}
    </div>
  );
}

export { Details };
