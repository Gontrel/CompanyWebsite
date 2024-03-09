import React from 'react';
import './HelperText.scss';

interface HelperTextProps {
    errorText?: string;
    submitText?: string;
    validText?: string;
}

const HelperText: React.FC<HelperTextProps> = ({
    errorText,
    submitText,
    validText
}) => {
    if (errorText) {
        return <span className="error--text">{errorText}</span>;
    }

    if (submitText) {
        return <span className="valid--text">{submitText}</span>;
    }

    if (validText) {
        return <span className="valid--text">{validText}</span>;
    }

    return <span className="helper--text">Join the waiting list!</span>;
};

export default HelperText;
