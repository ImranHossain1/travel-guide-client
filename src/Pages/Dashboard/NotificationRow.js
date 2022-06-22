import React from 'react';
import { Link } from 'react-router-dom';
const NotificationRow = ({unread, message, setDeletingNotification, handleNotification}) => {
    return (
        <tr>
            {
                !unread?                             
                <>
                    <td>{message.subject}</td>
                    {
                        message.unread ?
                            <td><Link to={`/dashboard/notification/${message._id}`} onClick={()=>handleNotification(message._id)}><button className='btn btn-xs btn-success'>Read unread Message</button></Link></td>
                            : <td><Link to={`/dashboard/notification/${message._id}`}><button className='btn btn-xs btn-danger'>Read Message</button></Link></td>
                    }
                    <td>
                        <label onClick={()=> setDeletingNotification(message)} htmlFor="delete-confirm-notification-modal" className="btn btn-xs btn-error modal-button">Delete</label>
                    </td>
                </>:
                <>
                    {
                        message.unread && <>
                            <td>{message.subject}</td>
                            <td><Link to={`/dashboard/notification/${message._id}`} onClick={()=>handleNotification(message._id)}><button className='btn btn-xs btn-success'>Read unread Message</button></Link></td>
                            <td>
                                <label onClick={()=> setDeletingNotification(message)} htmlFor="delete-confirm-notification-modal" className="btn btn-xs btn-error modal-button">Delete</label>
                            </td>
                        </>
                        
                    }
                </>
            }

        </tr>
    );
};

export default NotificationRow;