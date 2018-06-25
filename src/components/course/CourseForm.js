import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FieldInput from '../common/FieldInput';
import DatePickerInput from '../common/DatePickerInput';
import DropzoneInput from '../common/DropzoneInput';

export const CourseForm = ({ handleSubmit, pristine, reset, submitting, heading, handleSave, handleCancel }) => {
    debugger;
    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <h1>{heading}</h1>

            <Field
                type="text"
                name="category"
                label="Category"
                placeholder="Category of file"
                component={FieldInput}
            />

            <Field
                name="lastreviewed"
                label="Last Reviewed"
                placeholder="Last Reviewed Date"
                showTime={false}
                component={DatePickerInput}
            />

            <Field
                name="files"
                component={DropzoneInput}
            />


            <div>
                <button type="submit" disabled={submitting} className="btn btn-primary"><i className="fa fa-paper-plane-o" aria-hidden="true" /> Submit</button>

                {heading === 'Add' && <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-default btn-space">Clear Values</button>}

                <button type="button" className="btn btn-default btn-space" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
};





const validate = values => {
    const errors = {};

    if (!values.category) {
        errors.category = 'Required';
    }

    if (!values.lastreviewed) {
        errors.lastreviewed = 'Required';
    }

    return errors;
};



CourseForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    heading: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};



export default reduxForm({
    form: 'CourseForm',
    validate
})(CourseForm);
