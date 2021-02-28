import React from 'react';
import styled from 'styled-components';

/**
 * Modal component
 * @param {object} param0
 */

export const Modal = ({
  children,
  isOpened,
  onClose,
  maxWidth,
  padding = '24px',
}) => {
  return (
    <>
      {isOpened && (
        <ModalWrapper
          onMouseDown={() => onClose()}
          backdrop={isOpened ? 'blur(15px)' : 'blur(0px)'}
        >
          <ModalContent
            onMouseDown={(e) => e.stopPropagation()}
            width={maxWidth}
            padding={padding}
          >
            {children}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  backdrop-filter: ${(p) => p.backdrop};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: backdrop-filter 10s ease 10s;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 20px;
  max-width: ${(props) => props.width};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-shadow: 0px 8px 29px rgba(0, 0, 0, 0.4);
`;
