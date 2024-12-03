function LoadingSpinner({text = "Loading", size = 25}) {
  return (
    <div className="d-flex align-items-center justify-content-center m-5">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      ></div>
      <strong className="ps-2" style={{ fontSize: size }}>
        {text}...
      </strong>
    </div>
  );
}

export default LoadingSpinner;
