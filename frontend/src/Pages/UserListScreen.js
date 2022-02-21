import React, {useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import { Table,Button,Container} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, updateUser } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const userList = useSelector(state=>state.userList)
    const {loading,error,users}=userList
    console.log(users)

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success: successUpdate } = userUpdate

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate('/signin')
        }
    },[dispatch,navigate,successUpdate])

    const blockHandler=(user) => {
        if (window.confirm('Do you want to block this user?')) {
            dispatch(updateUser({ ...user, isBlocked: true }))
          }
    }
    const unblockHandler=(user) => {
        if (window.confirm('Unblock this user?')) {
            dispatch(updateUser({ ...user, isBlocked: false }))
          }
    }

  return (
      <Container>
      <h1>Users</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
          <Table striped bordered hover responsive className='table-sm tableColor'>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Admin</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {users.map(user =>(
                      <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                          <td>{user.isAdmin ? (<i className="fas fa-check" style={{color: 'green'}}></i>) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                          <td><LinkContainer to={`/admin/users/${user._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className="fas fa-edit"></i>
                              </Button>
                              </LinkContainer>
                              {user.isBlocked ?
                              <Button variant ='danger' className='btn-sm' onClick={()=>unblockHandler(user)}>Unblock</Button>:
                              <Button variant ='danger' className='btn-sm' onClick={()=>blockHandler(user)}>Block</Button>}
                              </td>  
                      </tr>
                  ))}
              </tbody>
          </Table>
      )}
      </Container>
  )
};

export default UserListScreen;
