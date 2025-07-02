import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/TermsCheckbox.scss';

export default function TermsCheckbox({ accepted, onChange, error }) {
  return (
    <div className="terms-section">
      <label className="terms-checkbox">
        <input
          type="checkbox"
          checked={accepted}
          onChange={onChange}
          aria-label="Accept terms and service"
        />
        <span>
          I accept the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            terms and service
          </a>.
        </span>
      </label>
      {error && <p className="error-message" role="alert">{error}</p>}
    </div>
  );
}

TermsCheckbox.propTypes = {
  accepted: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
