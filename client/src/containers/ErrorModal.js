import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../components/Modal';
import { UserContext } from '../context/UserContext';

export const ErrorModal = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const { globalError, setGlobalError } = useContext(UserContext);

  useEffect(() => {
    if (!!globalError) {
      setIsOpenedModal(true);
    }
  }, [globalError]);

  const onCloseErrorModal = () => {
    setIsOpenedModal(false);
    setGlobalError('');
  };

  return (
    <Modal isOpened={isOpenedModal} onClose={onCloseErrorModal}>
      <ErrorInner>{globalError}</ErrorInner>
    </Modal>
  );
};

const ErrorInner = styled.p`
  font-weight: 300;
  font-size: 1rem;
`;
