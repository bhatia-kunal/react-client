import React from 'react'
import { Spinner } from '../../components';
import style from './style';
import { SnackBarConsumer } from '../../contexts';

const withLoaderAndMessage = (WrappedComponent) => {
  const HOC = (props) => {
    const { loader, dataLength, apiResponseError, ...rest } = props;

    const renderErrorSnackBar = (handleOpen) => {
      if (!apiResponseError) {
        return null;
      }
      handleOpen(apiResponseError, 'error');
      return (
        <div style={style.text}>
          <h1>Oops! No Response</h1>
        </div>
      )
    }

    const renderLoader = () => {
      if (!loader) {
        return null;
      }

      return <Spinner style={style.base} size={100}/>
    };

    const renderMessage = () => {
      if (loader || dataLength) {
        return null;
      }

      return (
        <div style={style.text}>
          <h1>Ooops! No more trainees</h1>
        </div>
      )
    };

    const renderWrappedComponent = () => {
      if (loader || !dataLength || apiResponseError) {
        return null;
      }

      return <WrappedComponent {...rest} />
    }

    return (
      <SnackBarConsumer>
        {handleOpen => (
          <>
            {renderLoader()}
            {renderMessage()}
            {renderErrorSnackBar(handleOpen)}
            {renderWrappedComponent()}
          </>
        )}
      </SnackBarConsumer>
    );
  }

  return HOC;
};

export default withLoaderAndMessage;
