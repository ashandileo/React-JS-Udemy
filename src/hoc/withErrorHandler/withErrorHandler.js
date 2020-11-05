import React, { useState, useRef } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    const willMount = useRef(true);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    if(willMount.current) {
      axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });

      axios.interceptors.response.use(null, error => {
        setError(error);
      });

      willMount.current = false;
    }

    return (
      <Aux>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default withErrorHandler;