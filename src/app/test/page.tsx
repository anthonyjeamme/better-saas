'use client'

import { Container } from "@ui/display/Container/Container"
import { HStack } from "@ui/layout"
import { Field } from "@ui/primitives"
import { NumberInput } from "@ui/primitives/NumberInput/NumberInput"
import { Separator } from "@ui/primitives/Separator/Separator"
import { useState } from "react"


export default function TestPage() {

    const [integer, setInteger] = useState<number>(0)
    const [decimal, setDecimal] = useState<number>(0)

    const [integerNullable, setIntegerNullable] = useState<number | null>(null)
    const [decimalNullable, setDecimalNullable] = useState<number | null>(null)

    const [decimalMinMax, setDecimalMinMax] = useState<number>(0)
    const [decimalFixed, setDecimalFixed] = useState<number>(0)

    return <div>
        <Container vMargin="md">

            <Field label="INTEGER">
                <HStack align="center">

                    <NumberInput
                        value={integer}
                        onValueChange={setInteger}
                        size='md'
                        integer
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(integer, null, 2)}
                    </pre>

                </HStack>
            </Field>


            <Field label="DECIMAL">
                <HStack align="center">

                    <NumberInput
                        value={decimal}
                        onValueChange={setDecimal}
                        size='md'
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(decimal, null, 2)}
                    </pre>

                </HStack>
            </Field>

            <Separator />

            <Field label="INTEGER (NULLABLE)">
                <HStack align="center">

                    <NumberInput
                        value={integerNullable}
                        onValueChange={setIntegerNullable}
                        size='md'
                        emptyValue="null"
                        integer
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(integerNullable, null, 2)}
                    </pre>

                </HStack>
            </Field>


            <Field label="DECIMAL (NULLABLE)">
                <HStack align="center">

                    <NumberInput
                        value={decimalNullable}
                        onValueChange={setDecimalNullable}
                        size='md'
                        emptyValue="null"
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(decimalNullable, null, 2)}
                    </pre>

                </HStack>
            </Field>

            <Separator />


            <Field label="DECIMAL (NULLABLE) MIN 0 MAX 100">
                <HStack align="center">

                    <NumberInput
                        value={decimalMinMax}
                        onValueChange={setDecimalMinMax}
                        size='md'
                        min={0}
                        max={100}
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(decimalMinMax, null, 2)}
                    </pre>

                </HStack>
            </Field>

            <Separator />



            <Field label="DECIMAL (NULLABLE) FIXED 2">
                <HStack align="center">

                    <NumberInput
                        value={decimalFixed}
                        onValueChange={setDecimalFixed}
                        size='md'
                        fixed={2}
                    />
                    <pre style={{
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {JSON.stringify(decimalFixed, null, 2)}
                    </pre>

                </HStack>
            </Field>


        </Container>
    </div>
}