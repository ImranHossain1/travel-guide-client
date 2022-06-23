import React from 'react';
import useNotifications from '../../hooks/useNotifications';
import Loading from '../Shared/Loading';
import { useState } from 'react';
import DeleteConfirmNotificationModal from './DeleteConfirmNotificationModal';
import NotificationRow from './NotificationRow';
import PageTitle from '../Shared/PageTitle';
const Notifications = () => {
    const [messages, isLoading, refetch]= useNotifications();
    const [deletingNotification, setDeletingNotification] = useState(null);
    const [unread, setUnread] = useState(false);
    let count = 0; 
    if(isLoading){
        return <Loading></Loading>
    }
    const notify= {
        unread : false
    }
    const handleNotification = id =>{
        fetch(`https://aqueous-dawn-43600.herokuapp.com/notification/${id}`,{
                  method: 'PATCH',
                  headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(notify)
              })
              .then(res=>res.json())
              .then(data=> {
                  console.log(data)
                  refetch()
                })
    }
    messages.forEach(message => {
        if(message.unread){
            count++
        }
    });
    const handleUnread =()=>{
        setUnread(true)
    }
    const handleRead =()=>{
        setUnread(false)
    }
    return (
        <div className='w-full mx-5 '>
            <div className='flex justify-center items-center flex-col mb-5'>
                <h2 className='text-5xl font-bold text-primary text-center my-2'>Notifications {(count !==0) && <span className='text-red-500'>({count})</span>}</h2>
                <>
                    {
                        !unread ? 
                        <button className='btn btn-xs btn-success mt-2' onClick={handleUnread}>See Unread Messages</button>
                        :
                        <button className='btn btn-xs btn-danger mt-2' onClick={handleRead}>See All Messages</button>
                    }
                </>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {messages.map((message, index)=> <NotificationRow key={message._id}
                            unread={unread} 
                            message={message} 
                            setDeletingNotification ={setDeletingNotification} 
                            handleNotification={handleNotification}
                            refetch= {refetch}
                        >
                        </NotificationRow>
                        )}
                        
                    </tbody>
                </table>
            </div>
            {  
                    deletingNotification  && <DeleteConfirmNotificationModal
                        deletingNotification = {deletingNotification}
                        refetch = {refetch}
                        setDeletingNotification= {setDeletingNotification}
                ></DeleteConfirmNotificationModal>}
        </div>
    );
};

export default Notifications;