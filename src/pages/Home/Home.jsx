import React, { Component } from 'react'
import { callApi } from '../../libs/utils';
import { Spinner } from '../../components';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount = async () => {
    const user = await callApi('get', '/user/me', {});
    console.log(user);
    const { data } = user.data;
    this.setState({
      user: data,
    });
  }

  render () {
    const { user } = this.state;
    return (
      <div>
        {
          user ? (<h1>Hello, {user.name}!</h1>) : <Spinner size={40} />
        }
      </div>
    )
  }
}

export default Home
