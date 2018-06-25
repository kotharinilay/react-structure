import React, { PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment'
import 'react-widgets/dist/css/react-widgets.css'

momentLocalizer(moment)

const DatePickerInput = ({ input: { onChange, value }, name, label, placeholder, showTime, meta: { touched, error, warning } }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            <div className="field">
                <DateTimePicker
                    onChange={onChange}
                    name={name}
                    format="YYYY-MM-DD"
                    placeholder={placeholder}
                    time={showTime}
                    value={!value ? null : new Date(value)}
                />

                {touched && ((error && <p className="text-danger">{error}</p>) || (warning && <p className="text-danger">{warning}</p>))}
            </div>
        </div>
    );
};



DatePickerInput.propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
};



export default DatePickerInput;
