import { Button } from "@ui/primitives"
import { PipetteIcon } from "lucide-react"
import { useColorPickerContext } from "../ColorPicker.context"
import { hexToHSVa } from "../ColorPicker.utils"

export const EyeDropper = () => {

    const { setColor } = useColorPickerContext()

    return <Button onClick={async () => {
        const eyeDropper = getEyeDropper()
        const { sRGBHex } = await eyeDropper.open()
        const hsva = hexToHSVa(sRGBHex)
        setColor(hsva)
    }}
        shape="square"
        variant="outline"
        size="sm"
    >
        <PipetteIcon size={15} />
    </Button>
}


function getEyeDropper(): {
    open: () => Promise<{ sRGBHex: string }>
} {

    // @ts-expect-error EyeDropper is not defined in the global scope
    const EyeDropper = window.EyeDropper

    if (!EyeDropper)
        throw new Error('EyeDropper not supported')

    return new EyeDropper()
}