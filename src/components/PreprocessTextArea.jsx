function PreprocessTextArea({ defaultValue, onChange }) {
  return (
      <>
          <label hidden></label>
          <textarea className="form-control" rows="23" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
      </>
  );
}

export default PreprocessTextArea;