// Text area for editing raw song code before preprocessing
function PreprocessTextArea({ defaultValue, onChange }) {
    return (
        <>
            <label hidden></label>
            <textarea
                className="form-control"
                rows="23"
                defaultValue={defaultValue}
                onChange={onChange}
                id="proc"
            />
        </>
    );
}

export default PreprocessTextArea;