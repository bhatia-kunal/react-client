import React from 'react'
import { Spinner } from '../../components';
import style from './style';

const withLoaderAndMessage = (WrappedComponent) => {
  const HOC = (props) => {
    const { loader, dataLength, apiResponseError, ...rest } = props;

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
      <>
        {renderLoader()}
        {renderMessage()}
        {renderWrappedComponent()}
      </>
    );
  }

  return HOC;
};

export default withLoaderAndMessage;
