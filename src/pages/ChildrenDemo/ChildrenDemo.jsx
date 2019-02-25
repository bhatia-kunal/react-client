import React from 'react';
import { Math } from '../../components';

const Children = () => (
  <>
    <Math first={7} second={4} operator="+">
      {(first, second, operator, result) => (
        <h3>
          {first}
          {' '}
          {operator}
          {' '}
          {second}
          {' '}
          =
          {' '}
          {result}
        </h3>
      )}
    </Math>
    <Math first={7} second={3} operator="-">
      {(first, second, operator, result) => (
        <h3>
          {first}
          {' '}
          {operator}
          {' '}
          {second}
          {' '}
          =
          {' '}
          {result}
        </h3>
      )}
    </Math>
    <Math first={7} second={0} operator="/">
      {(first, second, operator, result) => (
        <h3>
          {first}
          {' '}
          {operator}
          {' '}
          {second}
          {' '}
          =
          {' '}
          {result}
        </h3>
      )}
    </Math>
    <Math first={7} second={3} operator="^">
      {(first, second, operator, result) => (
        <h3>
          {first}
          {' '}
          {operator}
          {' '}
          {second}
          {' '}
          =
          {' '}
          {result}
        </h3>
      )}
    </Math>
  </>
);

export default Children;
