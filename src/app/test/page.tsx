'use client'

import { Container } from "@ui/display/Container/Container"
import { Button, Input } from "@ui/primitives"

import { useNotifications } from "@ui/display/Notifications/Notifications.context"
import { HStack } from "@ui/layout"
import { CircleHelpIcon } from "lucide-react"
import { Separator } from "@ui/primitives/Separator"
import { useState } from "react"
// import { ColorPicker } from "@ui/display/ColorPicker/ColorPicker"
// import { Dropdown } from "@ui/display/Dropdown"

export default function TestPage() {

    const notifications = useNotifications()

    const [color, setColor] = useState('#8DB289')
    const [isOpen, setIsOpen] = useState(false)


    return <div>
        <Container vMargin="lg">
            <HStack gap={10}>
                <Button onClick={() => {
                    notifications.push({
                        text: 'Are you sure ?',
                        description: "This action is irreversible",
                        icon: <CircleHelpIcon size={15} />,
                        actions: [{
                            label: 'Yes',
                            onClick: (handleClose) => {
                                console.log("OK")
                                handleClose()
                            }
                        },
                        {
                            label: 'No',
                            onClick: (handleClose) => {
                                console.log("OK")
                                handleClose()
                            }
                        }]
                    })
                }}>PUSH</Button>
                <Button onClick={() => {
                    notifications.promise({
                        pending: {
                            title: 'Working',
                        },
                        success: {
                            title: 'Bravo !',
                            duration: 2000
                        },
                        failure: {
                            title: 'Oups !',
                            duration: 2000
                        },
                        promise: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (Math.random() > 0.5) {
                                    resolve()
                                } else {
                                    reject()
                                }
                            }, 2500)
                        })
                    })
                }}>PUSH PROMISE</Button>
            </HStack>

            <Separator />
        </Container>


        <Container>

            <div style={{ position: 'relative' }}>

                <Button onClick={() => setIsOpen(!isOpen)}>Open</Button>

                {/* <Dropdown onClose={() => setIsOpen(false)}>
                    <ColorPicker value={color} onChange={setColor}>
                        <VStack gap={10}>
                            <ColorPicker.Gradient />
                            <ColorPicker.Tint />
                            <ColorPicker.Opacity />
                            <ColorPicker.ColorInput />
                        </VStack>
                    </ColorPicker>
                </Dropdown> */}

            </div>



            <Separator />

            <div style={{ width: 100, height: 100, backgroundColor: color }} />

            <Separator />

            <Input value={color} onValueChange={value => {
                setColor(value)
                console.log("CHANGE")
            }} />
        </Container>


    </div>
}
