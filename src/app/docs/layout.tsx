import { Fullscreen, Sidebar, VStack } from "@ui/layout"
import { Button } from "@ui/primitives"
import { BlocksIcon, LayoutPanelTopIcon, Rows3Icon } from "lucide-react"
import Link from "next/link"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return <Fullscreen horizontal>
        <Sidebar position='left' width={250}>
            <VStack gap={5}>
                <Button variant="ghost" size="sm" fullWidth>
                    <BlocksIcon size={18} strokeWidth={1.5} />
                    <span>Primitives</span>
                </Button>

                <Link href="/docs/layout">
                    <Button variant="ghost" size="sm" fullWidth>
                        <LayoutPanelTopIcon size={18} strokeWidth={1.5} />
                        <span>Layout</span>
                    </Button>
                </Link>

                <Link href="/docs/sort">
                    <Button variant="ghost" size="sm" fullWidth>
                        <Rows3Icon size={18} strokeWidth={1.5} />
                        <span>Sort</span>
                    </Button></Link>
            </VStack>
        </Sidebar>
        <div style={{ flex: 1 }}>
            {children}
        </div>
    </Fullscreen>
}
