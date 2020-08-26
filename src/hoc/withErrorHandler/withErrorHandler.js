import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {

    const [error, setError] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });

      axios.interceptors.response.use(null, error => {
        setError(error);
      });
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
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