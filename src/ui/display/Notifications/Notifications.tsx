import { CheckCircle, XCircle } from 'lucide-react';

import { Button } from '../../primitives/Button';
import { Spinner } from '../../primitives/Spinner';

import { VerticalAnimatedChildren } from '../VerticalAnimatedChildren';
import { DefaultNotificationData, NotificationData, PromiseNotificationData } from './Notifications.types';

import classNameModule from '../../core/classname';
import styles from './Notifications.module.scss';
const className = classNameModule(styles)

type NotificationsProps = {
    notifications: NotificationData[]
    handleClose: (id: string) => void
}

export const Notifications = ({ notifications, handleClose }: NotificationsProps) => {
    return <div {...className('Notifications')}>
        <VerticalAnimatedChildren>
            {
                notifications.map(notification =>
                    <Notification key={notification.id} notification={notification} handleClose={() => {
                        handleClose(notification.id)
                    }} />
                )
            }
        </VerticalAnimatedChildren>
    </div>;
};


const Notification = ({ notification, handleClose }: { notification: NotificationData, handleClose: () => void }) => {
    if (notification.type === 'default')
        return <DefaultNotification notification={notification} handleClose={handleClose} />

    return <PromiseNotification notification={notification} />
};


const DefaultNotification = ({ notification, handleClose }: { notification: DefaultNotificationData, handleClose: () => void }) => {
    const theme = notification.theme ?? 'default'
    const variant = notification.variant ?? 'outline'

    return <div {...className('Notification', `:${variant}-${theme}`)}>

        {
            notification.icon &&
            <div {...className('icon')}>
                {notification.icon}
            </div>
        }

        <div {...className('content')}>
            <div {...className('title')}>{notification.text}</div>
            {
                notification.description &&
                <div {...className('description')}>{notification.description}</div>
            }
        </div>
        {
            notification.actions && <div {...className('actions')}>
                {
                    notification.actions.map((action, index) =>
                        <Button key={index} size='sm' variant='outline' onClick={() => {
                            action.onClick(handleClose)
                        }}>
                            {action.label}
                        </Button>
                    )
                }
            </div>
        }
    </div>;
}

const PromiseNotification = ({ notification }: { notification: PromiseNotificationData }) => {
    return <div {...className('PromiseNotification',

        notification.status === "success" ? `:solid-success` :
            notification.status === "failure" ? `:solid-error` :
                `:outline-default`

    )}>
        {
            notification.status === 'pending' ?
                <Spinner size={14} /> :
                notification.status === 'success' ?
                    <CheckCircle size={14} /> :
                    <XCircle size={14} />
        }
        <div>
            {
                notification.status === "pending" ? notification.pending.title :
                    notification.status === "success" ? notification.success?.title :
                        notification.failure?.title
            }
        </div>
    </div>
}
