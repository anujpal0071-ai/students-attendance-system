function BackButton({
  setPage,
  page = "Dashboard"
}) {

  return (
    <button
      type="button"
      className="back-btn"
      onClick={() => setPage(page)}
    >
      ← Back
    </button>
  );

}

export default BackButton;