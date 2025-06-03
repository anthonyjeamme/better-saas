'use client'


import { createContext, useContext, useState } from "react";
import { NotificationData, DefaultNotificationDataInput, PromiseNotificationDataInput } from "./Notifications.types";
import { Notifications } from "./Notifications";


type NotificationContextType = {
    push: (notification: DefaultNotificationDataInput) => void
    promise: (notification: PromiseNotificationDataInput) => void
}

const notificationContext = createContext<NotificationContextType | null>(null)


type NotificationsProviderProps = {
    children?: React.ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
    const [notifications, setNotifications] = useState<NotificationData[]>([])

    return <notificationContext.Provider value={{
        promise: (notification) => {
            const id = Math.random().toString()
            setNotifications([...notifications, {
                ...notification,
                type: 'promise',
                id,
                status: 'pending'
            }])
            notification.promise.then(() => {
                setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, status: 'success' } : n))

                if (notification.success?.duration) {
                    setTimeout(() => {
                        setNotifications(notifications => notifications.filter(n => n.id !== id))
                    }, notification.success.duration)
                }
            })
            notification.promise.catch(() => {
                setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, status: 'failure' } : n))

                if (notification.failure?.duration) {
                    setTimeout(() => {
                        setNotifications(notifications => notifications.filter(n => n.id !== id))
                    }, notification.failure.duration)
                }
            })
        },
        push: (notification) => {

            const id = Math.random().toString()

            setNotifications([...notifications, {
                ...notification,
                type: 'default',
                id
            }])

            if (notification.duration)
                setTimeout(() => {
                    setNotifications(notifications => notifications.filter(n => n.id !== id))
                }, notification.duration)
        }
    }}>
        <Notifications notifications={notifications} handleClose={id => {
            setNotifications(notifications => notifications.filter(n => n.id !== id))
        }} />
        {children}
    </notificationContext.Provider>
}
export function useNotifications() {
    const context = useContext(notificationContext)
    if (!context)
        throw new Error('useNotifications must be used within a NotificationsProvider')

    return context
}