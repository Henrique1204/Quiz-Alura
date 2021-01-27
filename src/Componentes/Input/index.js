import React from 'react';
import styled from 'styled-components';
// Importando biblioteca para gerencimanento de propriedades.
import PropTypes from 'prop-types';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-bottom: 25px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => theme.colors.mainBg};
    outline: 0;
`;

export default function Input({ name, ...props }) {
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <InputBase id={name} name={name} {...props} />
    </div>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
