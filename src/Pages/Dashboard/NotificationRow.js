import React from 'react';
import { Bounce } from 'react-reveal';
import { Link } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
const NotificationRow = ({unread, message, setDeletingNotification, handleNotification}) => {
    return (
        <tr>
            {
                !unread?                             
                <>
                    <Bounce left cascade>
                        <td>{message.subject}</td>
                        {
                            message.unread ?
                                <td><Link to={`/dashboard/notification/${message._id}`} onClick={()=>handleNotification(message._id)}><button className='btn btn-xs btn-success'>Unread</button></Link></td>
                                : <td><Link to={`/dashboard/notification/${message._id}`}><button className='btn btn-xs btn-danger'>Read Message</button></Link></td>
                        }
                        <td>
                            <label onClick={()=> setDeletingNotification(message)} htmlFor="delete-confirm-notification-modal" className="btn btn-xs btn-error modal-button">Delete</label>
                        </td>
                    </Bounce>
                </>:
                <>
                    {
                        message.unread && <>
                        <Bounce right cascade>
                            <td>{message.subject}</td>
                            <td><Link to={`/dashboard/notification/${message._id}`} onClick={()=>handleNotification(message._id)}><button className='btn btn-xs btn-success'>Unread</button></Link></td>
                            <td>
                                <label onClick={()=> setDeletingNotification(message)} htmlFor="delete-confirm-notification-modal" className="btn btn-xs btn-error modal-button">Delete</label>
                            </td>
                        </Bounce>
                        </>
                        
                    }
                </>
            }

        </tr>
    );
};

export default NotificationRow;