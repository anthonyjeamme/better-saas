'use client'

import { useRef, useEffect } from 'react';

import { useGameLoop } from '@ui/hooks/useGameLoop';
import { GameCanvas, useGameCanvas } from '@ui/modules/game/components/GameCanvas/GameCanvas';
import { useGamepadButtons } from '@ui/modules/game/hooks/useGamepadButtons';
import { useGamepadDirection } from '@ui/modules/game/hooks/useGamepadDirection';

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';

const className = classNameModule(styles)

export default function Page() {
    const gameCanvas = useGameCanvas()
    const backgroundImage = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        const img = new Image()
        img.src = 'https://blenderartists.org/uploads/default/optimized/4X/8/8/6/886ce189807922dec4627e6fcbf9230df144f3c9_2_500x500.jpg'
        img.onload = () => {
            backgroundImage.current = img
        }
    }, [])

    useGamepadButtons((e) => {
        if (e.buttonIndex === 0 && e.pressed) {
            const projectile = {
                position: {
                    x: positionRef.current.x + Math.cos(rotationRef.current) * 100,
                    y: positionRef.current.y + Math.sin(rotationRef.current) * 100
                },
                velocity: {
                    x: Math.cos(rotationRef.current) * 20,
                    y: Math.sin(rotationRef.current) * 20
                },
                startTime: performance.now(),
                duration: 2000
            }
            projectilesRef.current.push(projectile)
        }
    })

    const rotationDirection = useGamepadDirection({
        axis: 0,
        deadzone: 0.2
    })

    const projectilesRef = useRef<{
        position: { x: number, y: number }
        velocity: { x: number, y: number }
        startTime: number
        duration: number
    }[]>([])

    const rotationRef = useRef(-Math.PI / 2)
    const positionRef = useRef({ x: 0, y: 0 })
    const velocityRef = useRef({ x: 0, y: 0 })

    useGameLoop(() => {
        const gamepads = navigator.getGamepads()
        const gamepad = gamepads[0]

        if (gamepad) {
            const rotationInput = rotationDirection.getDirection().x
            if (Math.abs(rotationInput) > 0.1) {
                rotationRef.current += rotationInput * 0.02
            }

            if (gamepad.buttons[7].pressed) {
                const acceleration = 0.2
                velocityRef.current.x += Math.cos(rotationRef.current) * acceleration
                velocityRef.current.y += Math.sin(rotationRef.current) * acceleration
            }

            if (gamepad.buttons[6].pressed) {
                const acceleration = 0.2
                velocityRef.current.x -= Math.cos(rotationRef.current) * acceleration
                velocityRef.current.y -= Math.sin(rotationRef.current) * acceleration
            }

            // Friction
            const friction = 0.95
            velocityRef.current.x *= friction
            velocityRef.current.y *= friction

            // Mise à jour de la position
            positionRef.current.x += velocityRef.current.x
            positionRef.current.y += velocityRef.current.y

            // Mise à jour de la caméra
            gameCanvas.position = {
                x: gameCanvas.position.x + (positionRef.current.x - gameCanvas.position.x) * 0.04,
                y: gameCanvas.position.y + (positionRef.current.y - gameCanvas.position.y) * 0.04
            }
            gameCanvas.rotation = gameCanvas.rotation + (rotationRef.current - gameCanvas.rotation) * 0.1
        }

        // Mise à jour des projectiles
        const currentTime = performance.now()
        projectilesRef.current = projectilesRef.current.filter(projectile => {
            const age = currentTime - projectile.startTime
            if (age > projectile.duration) return false

            projectile.position.x += projectile.velocity.x
            projectile.position.y += projectile.velocity.y
            return true
        })

    }, [])

    return <div {...className('Page')}>
        <GameCanvas
            ref={gameCanvas.ref}
            render={(ctx) => {
                const position = positionRef.current

                if (backgroundImage.current) {
                    const pattern = ctx.createPattern(backgroundImage.current, 'repeat')
                    if (pattern) {
                        ctx.fillStyle = pattern
                        ctx.fillRect(-5000, -5000, 10000, 10000)
                    }
                }

                projectilesRef.current.forEach(projectile => {
                    ctx.fillStyle = `black`
                    ctx.beginPath()
                    ctx.arc(projectile.position.x, projectile.position.y, 4, 0, Math.PI * 2)
                    ctx.fill()
                })

                ctx.fillStyle = 'red'
                ctx.save()
                ctx.translate(position.x, position.y)
                ctx.rotate(rotationRef.current)
                ctx.fillRect(-50, -50, 100, 100)
                ctx.fillRect(40, -5, 50, 10)


                ctx.fillStyle = "#131313"
                ctx.fillRect(-60, -60, 120, 20)
                ctx.fillRect(-60, 40, 120, 20)

                ctx.restore()

            }}
        />
    </div>;
}