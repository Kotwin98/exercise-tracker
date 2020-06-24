import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.username}</td>
        <td>
            <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>
                <button className="btn btn-danger">
                    X
                </button>
            </a>
        </td>
    </tr>
  )

class DeleteUser extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this)

        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            this.setState({ users: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
      }

    usersList() {
        return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
      }

render() {
    return (
        <div>
            <h3>Delete User</h3>
            <table className="table">
                <tbody>
                    {this.usersList()}
                </tbody>
            </table>
        </div>
    );
}
}

export default DeleteUser;