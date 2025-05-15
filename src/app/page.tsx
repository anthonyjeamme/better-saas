'use client'

import { Box } from '@ui/display/Box/Box';
import { Breadcrumb } from '@ui/display/Breadcrumb/Breadcrumb';
import { Container } from '@ui/display/Container/Container';
import { ContextMenu, useContextMenu } from '@ui/display/ContextMenu/ContextMenu';
import { Dropzone } from '@ui/display/Dropzone/Dropzone';
import { Grid } from '@ui/display/Grid/Grid';
import { Menu } from '@ui/display/Menu/Menu';
import { Tree } from '@ui/display/Tree/Tree';
import { useList } from '@ui/hooks/useList/useList';
import { usePasteFile } from '@ui/hooks/usePasteFile/usePasteFile';
import { Fullscreen, HStack, Sidebar, VStack } from '@ui/layout';
import { For } from '@ui/layout/For/For';
import { Modal } from '@ui/layout/Modal/Modal';
import { Button, Field, Input } from '@ui/primitives';
import { Badge } from '@ui/primitives/Badge/Badge';
import { Checkbox } from '@ui/primitives/Checkbox/Checkbox';
import { FilePicker } from '@ui/primitives/FilePicker/FilePicker';
import { Image } from '@ui/primitives/Image/Image';
import { InlineSelect } from '@ui/primitives/InlineSelect/InlineSelect';
import { NumberInput } from '@ui/primitives/NumberInput/NumberInput';
import { Select } from '@ui/primitives/Select/Select';
import { Separator } from '@ui/primitives/Separator/Separator';
import { Toggle } from '@ui/primitives/Toggle/Toggle';
import { Small } from '@ui/typo/Small/Small';
import { BotIcon, PinIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';



function Page() {
  const [bool, setBool] = useState(false)
  const [number, setNumber] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string>('')
  const [selectedMult, setSelectedMult] = useState<string[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const contextMenu = useContextMenu()

  usePasteFile(files => {
    console.log("===>", files)
  })

  const list = useList([
    {
      id: '1',
      name: 'john'
    }, {
      id: '2',
      name: 'jane'
    }, {
      id: '3',
      name: 'jim'
    },
    {
      id: '4',
      name: 'jeff'
    },
    {
      id: '5',
      name: 'jean'
    }
  ])

  console.log(number)

  return <Fullscreen horizontal >
    <Sidebar position='left' width={250}>Coucouc!</Sidebar>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <Container size='xl' vMargin='xl'>

        <h2>Modal</h2>


        <Button onClick={() => setIsModalOpen(true)}>Open</Button>

        {
          isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
              <Modal.Dialog placement='center'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
                <Separator />

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates impedit dolores labore, est id non qui nulla architecto nihil,
                  saepe accusamus ipsa at? Assumenda et sit voluptatibus delectus? Reprehenderit, quidem!
                </p>
              </Modal.Dialog>
            </Modal>
          )
        }

        <h2>Buttons</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Button />`}</pre>
        </code>

        <Field label="Default">
          <HStack gap={10}>
            <Field label={<code>{`variant="solid"`}</code>}>
              <Button variant='solid'>Button</Button>
            </Field>
            <Field label={<code>{`variant="subtle"`}</code>}>
              <Button variant='subtle'>Button</Button>
            </Field>
            <Field label={<code>{`variant="surface"`}</code>}>
              <Button variant='surface'>Button</Button>
            </Field>
            <Field label={<code>{`variant="outline"`}</code>}>
              <Button variant='outline'>Button</Button>
            </Field>
            <Field label={<code>{`variant="ghost"`}</code>}>
              <Button variant='ghost'>Button</Button>
            </Field>
            <Field label={<code>{`variant="plain"`}</code>}>
              <Button variant='plain'>Button</Button>
            </Field>
          </HStack>
        </Field>

        <Field label="Primary">
          <HStack gap={10}>
            <Button theme='primary' variant='solid'>Button</Button>
            <Button theme='primary' variant='subtle'>Button</Button>
            <Button theme='primary' variant='surface'>Button</Button>
            <Button theme='primary' variant='outline'>Button</Button>
            <Button theme='primary' variant='ghost'>Button</Button>
            <Button theme='primary' variant='plain'>Button</Button>
          </HStack>
        </Field>

        <Field label="Success">

          <HStack gap={10}>
            <Button theme='success' variant='solid'>Button</Button>
            <Button theme='success' variant='subtle'>Button</Button>
            <Button theme='success' variant='surface'>Button</Button>
            <Button theme='success' variant='outline'>Button</Button>
            <Button theme='success' variant='ghost'>Button</Button>
            <Button theme='success' variant='plain'>Button</Button>
          </HStack>
        </Field>

        <Field label="Error">

          <HStack gap={10}>
            <Button theme='error' variant='solid'>Button</Button>
            <Button theme='error' variant='subtle'>Button</Button>
            <Button theme='error' variant='surface'>Button</Button>
            <Button theme='error' variant='outline'>Button</Button>
            <Button theme='error' variant='ghost'>Button</Button>
            <Button theme='error' variant='plain'>Button</Button>
          </HStack>
        </Field>
        <Field label="Warning">
          <HStack gap={10}>
            <Button theme='warning' variant='solid'>Button</Button>
            <Button theme='warning' variant='subtle'>Button</Button>
            <Button theme='warning' variant='surface'>Button</Button>
            <Button theme='warning' variant='outline'>Button</Button>
            <Button theme='warning' variant='ghost'>Button</Button>
            <Button theme='warning' variant='plain'>Button</Button>
          </HStack>
        </Field>

        <Field label="Sizing">
          <HStack gap={10} align='center'>
            <Button size='xs'>Button</Button>
            <Button size='sm'>Button</Button>
            <Button size='md'>Button</Button>
            <Button size='lg'>Button</Button>
            <Button size='xl'>Button</Button>
          </HStack>
        </Field>



        <Field label="Loading">
          <HStack gap={10}>
            <Button
              variant='outline'
              onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}
              loading
            >Button</Button>
            {/* <Button
              variant='outline'
              onClick={() => new Promise(resolve => setTimeout(resolve, 1000))}
            >
              {({ isLoading }) => (
                <>
                  {isLoading ? <Spinner size={14} /> : <PlayIcon size={14} />}
                  <span>Button custom</span>
                </>
              )}
            </Button> */}

          </HStack>
        </Field>

        <h2>Number inputs</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<NumberInput />`}</pre>
        </code>

        <Grid columns={5} gap={"md"}>
          <Field label={<code>{`size="sm"`}</code>}>
            <NumberInput emptyValue='null' value={number} onValueChange={setNumber} size='sm' />
          </Field>
          <Field label={<code>{`size="md"`}</code>}>
            <NumberInput emptyValue='null' value={number} onValueChange={setNumber} size='md' />
          </Field>
          <Field label={<code>{`size="lg"`}</code>}>
            <NumberInput emptyValue='null' value={number} onValueChange={setNumber} size='lg' />
          </Field>
        </Grid>

        <Grid columns={2} gap={"md"}>
          <Field label={<code>{`format="stepper"`}</code>}>
            <NumberInput emptyValue='null' value={number} onValueChange={setNumber} format='stepper' />
          </Field>
        </Grid>

        <h2>Checkbox</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Checkbox />`}</pre>
        </code>

        <HStack gap={10} vMargin={10}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' />
        </HStack>
        <HStack gap={10} vMargin={10}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' theme='primary' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' theme='primary' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' theme='primary' />
        </HStack>
        <HStack gap={10} vMargin={10}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' theme='success' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' theme='success' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' theme='success' />
        </HStack>

        <HStack gap={10} vMargin={10} align='center'>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='xs' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='sm' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='md' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='lg' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='xl' />
        </HStack>


        <h2>Toggle</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Toggle />`}</pre>
        </code>

        <HStack gap={10} vMargin={10} align='center'>

          <Toggle value={bool} onValueChange={setBool} />
          <Toggle value={bool} onValueChange={setBool} theme='primary' />
          <Toggle value={bool} onValueChange={setBool} theme='success' />
          <Toggle value={bool} onValueChange={setBool} theme='error' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' />

        </HStack>

        <HStack gap={10} vMargin={10} align='center'>

          <Toggle value={bool} onValueChange={setBool} variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='primary' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='success' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='error' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' variant='outline' />

        </HStack>

        <HStack gap={10} vMargin={10} align='center'>
          <Toggle value={bool} onValueChange={setBool} variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='primary' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='success' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='error' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' variant='subtle' />
        </HStack>


        <HStack gap={10} vMargin={10} align='center'>

          <Toggle value={bool} onValueChange={setBool} size='xs' />
          <Toggle value={bool} onValueChange={setBool} size='sm' />
          <Toggle value={bool} onValueChange={setBool} size='md' />
          <Toggle value={bool} onValueChange={setBool} size='lg' />
          <Toggle value={bool} onValueChange={setBool} size='xl' />

        </HStack>

        <h2>File Picker</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<FilePicker />`}</pre>
        </code>

        <FilePicker />

        <h2>Separators</h2>


        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Separator />`}</pre>
        </code>


        <Field label="Default">
          <Separator margin='sm' />
        </Field>

        <Field label="Primary">
          <Separator theme='primary' margin='sm' />
        </Field>

        <Field label="Success">
          <Separator theme='success' margin='sm' />
        </Field>

        <Field label="Error">
          <Separator theme='error' margin='sm' />
        </Field>

        <Field label="Warning">
          <Separator theme='warning' margin='sm' />
        </Field>



        <h2>Breadcrumb</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Breadcrumb />`}</pre>
        </code>

        <Breadcrumb>
          <Button variant='ghost' size='sm'>
            Home
          </Button>
          <Button variant='ghost' size='sm'>
            Dashboard
          </Button>
          <Button variant='ghost' size='sm'>
            Projects
          </Button>
        </Breadcrumb>


        <h2>Select</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Select />`}</pre>
        </code>

        <Grid columns={2} gap={"md"}>
          <Field label="Simple">

            <Select
              search
              fullWidth
              options={[
                { label: 'Emma', value: 'emma', searchTerm: 'emma' },
                { label: 'Liam', value: 'liam', searchTerm: 'liam' },
                { label: 'Olivia', value: 'olivia', searchTerm: 'olivia' },
                { label: 'Noah', value: 'noah', searchTerm: 'noah' },
                { label: 'Sophia', value: 'sophia', searchTerm: 'sophia' },
                { label: 'Jackson', value: 'jackson', searchTerm: 'jackson' },
                { label: 'Ava', value: 'ava', searchTerm: 'ava' },
                { label: 'Lucas', value: 'lucas', searchTerm: 'lucas' },
                { label: 'Isabella', value: 'isabella', searchTerm: 'isabella' },
                { label: 'Ethan', value: 'ethan', searchTerm: 'ethan' },
                { label: 'Mia', value: 'mia', searchTerm: 'mia' },
                { label: 'Aiden', value: 'aiden', searchTerm: 'aiden' },
                { label: 'Charlotte', value: 'charlotte', searchTerm: 'charlotte' },
                { label: 'Elijah', value: 'elijah', searchTerm: 'elijah' },
                { label: 'Amelia', value: 'amelia', searchTerm: 'amelia' }
              ]}

              value={selected} onChange={setSelected} />
          </Field>

          <Field label="Multiple">
            <Select
              multiple
              search
              fullWidth
              options={[
                { label: 'Emma', value: 'emma', searchTerm: 'emma' },
                { label: 'Liam', value: 'liam', searchTerm: 'liam' },
                { label: 'Olivia', value: 'olivia', searchTerm: 'olivia' },
                { label: 'Noah', value: 'noah', searchTerm: 'noah' },
                { label: 'Sophia', value: 'sophia', searchTerm: 'sophia' },
                { label: 'Jackson', value: 'jackson', searchTerm: 'jackson' },
                { label: 'Ava', value: 'ava', searchTerm: 'ava' },
                { label: 'Lucas', value: 'lucas', searchTerm: 'lucas' },
                { label: 'Isabella', value: 'isabella', searchTerm: 'isabella' },
                { label: 'Ethan', value: 'ethan', searchTerm: 'ethan' },
                { label: 'Mia', value: 'mia', searchTerm: 'mia' },
                { label: 'Aiden', value: 'aiden', searchTerm: 'aiden' },
                { label: 'Charlotte', value: 'charlotte', searchTerm: 'charlotte' },
                { label: 'Elijah', value: 'elijah', searchTerm: 'elijah' },
                { label: 'Amelia', value: 'amelia', searchTerm: 'amelia' }
              ]}

              value={selectedMult} onChange={setSelectedMult} />
          </Field>
        </Grid>


        <h2>Slider</h2>

        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Slider value={number} onValueChange={setNumber} min={0} max={10} size='xs' />`}</pre>
        </code>
        {/* <Grid columns={4} gap={"lg"}>
          <Field label={<code>{`size="xs"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} size='xs' />
          </Field>

          <Field label={<code>{`size="sm"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} size='sm' />
          </Field>

          <Field label={<code>{`size="md"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} size='md' />
          </Field>

          <Field label={<code>{`size="lg"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} size='lg' />
          </Field>

          <Field label={<code>{`theme="primary"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} theme='primary' />
          </Field>


          <Field label={<code>{`theme="error"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} theme='error' />
          </Field>

          <Field label={<code>{`theme="success"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} theme='success' />
          </Field>

          <Field label={<code>{`theme="warning"`}</code>}>
            <Slider value={number} onValueChange={setNumber} min={0} max={10} theme='warning' />
          </Field>
        </Grid>
 */}


        <h2>Menu</h2>


        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Menu />`}</pre>
        </code>

        <Menu />

        <h2>Tree</h2>


        <code>
          <pre style={{ padding: 10, margin: '20px 0', backgroundColor: `rgb(255,255,255,0.05)` }}>{`<Tree />`}</pre>
        </code>

        <Box variant='outline'>
          <Tree

            content={[
              {
                label: 'Agents',
                children: [
                  {
                    label: <><BotIcon size={14} /><span>Agent 1</span></>,
                    onClick: () => {
                      console.log("ICI !")
                    }
                  },
                  {
                    label: <><BotIcon size={14} /><span>Agent 2</span></>,
                    onClick: () => {
                      console.log("ICI !")
                    }
                  }
                ],
              },
              {
                label: 'Régions',
                children: [
                  {
                    label: <><PinIcon size={14} /><span>Levalanet</span></>,
                    onClick: () => {
                      console.log("ICI !")
                    }
                  },
                  {
                    label: <><PinIcon size={14} /><span>Périgneux</span></>,
                    onClick: () => {
                      console.log("ICI !")
                    }
                  },
                ]
              }
            ]}
          />
        </Box>


        <h2>Dropzone</h2>


        <Dropzone onSelectFiles={files => console.log(files)} />


        <h2>TODO</h2>

        <VStack gap={10}>
          <For each={list.items}>{(item, index) => <Box variant='outline'>
            <HStack gap={10} align='center'>

              <div style={{ flex: 1 }}>

                <Input medium outline value={item.name} onValueChange={name => list.update(index, { name })} />
              </div>
              <Button variant='ghost' size='xs' onClick={() => list.move(index, index - 1)}>
                <ArrowUpIcon size={14} />
              </Button>
              <Button variant='ghost' size='xs' onClick={() => list.move(index, index + 1)}>
                <ArrowDownIcon size={14} />
              </Button>
              <Button variant='ghost' size='xs' onClick={() => list.remove(index)}>
                <TrashIcon size={14} />
              </Button>
            </HStack>
          </Box>
          }</For>
          <Button variant='outline' size='sm' onClick={() => list.insert({ id: Math.random().toString(), name: 'new' }, list.items.length)}><PlusIcon size={14} /><span>Insert</span></Button>
        </VStack>
        <h2>TODO</h2>

        <ContextMenu

          ref={contextMenu.ref}

          content={({ handleClose }) => (
            <Tree
              content={[
                {
                  label: 'Agents',
                  children: [
                    {
                      label: <><BotIcon size={14} /><span>Agent 1</span></>,
                      onClick: () => {
                        handleClose()
                      }
                    },
                    {
                      label: <><BotIcon size={14} /><span>Agent 2</span></>,
                      onClick: () => {
                        handleClose()
                      }
                    }
                  ],
                },
                {
                  label: 'Régions',
                  children: [
                    {
                      label: <><PinIcon size={14} /><span>Levalanet</span></>,
                      onClick: () => {
                        handleClose()
                      }
                    },
                    {
                      label: <><PinIcon size={14} /><span>Périgneux</span></>,
                      onClick: () => {
                        handleClose()
                      }
                    },
                  ]
                }
              ]}
            />
          )}>

          <Image src="https://d2iybizhlvvl3p.cloudfront.net/filters:strip_exif()/250x290/filters:format(webp)/fastify/649de358b89e4282b97adb66.jpg" alt="" />

        </ContextMenu>


        <div style={{ margin: '50px 0' }}>

          <Field label="Filter">
            <InlineSelect value={selected} onValueChange={setSelected} size='xs' options={[
              { label: '1', value: 'all' },
              { label: 'Hiking', value: 'hiking' },
              { label: 'Cycling', value: 'cycling' },
              { label: 'Running', value: 'running' },
              { label: 'Walking', value: 'walking' },
              { label: 'Other', value: 'other' },
            ]} />
          </Field>

          <Separator theme='primary' />

          <Field label="Filter">
            <InlineSelect value={selected} onValueChange={setSelected} size='sm' options={[
              { label: '1', value: 'all' },
              { label: 'Hiking', value: 'hiking' },
              { label: 'Cycling', value: 'cycling' },
              { label: 'Running', value: 'running' },
              { label: 'Walking', value: 'walking' },
              { label: 'Other', value: 'other' },
            ]} />
          </Field>

          <Separator theme='success' />


          <Field label="Filter">
            <InlineSelect value={selected} onValueChange={setSelected} size='md' options={[
              { label: '1', value: 'all' },
              { label: 'Hiking', value: 'hiking' },
              { label: 'Cycling', value: 'cycling' },
              { label: 'Running', value: 'running' },
              { label: 'Walking', value: 'walking' },
              { label: 'Other', value: 'other' },
            ]} />
          </Field>

          <Separator />

          <Field label="Filter">
            <InlineSelect value={selected} onValueChange={setSelected} size='lg' options={[
              { label: '1', value: 'all' },
              { label: 'Hiking', value: 'hiking' },
              { label: 'Cycling', value: 'cycling' },
              { label: 'Running', value: 'running' },
              { label: 'Walking', value: 'walking' },
              { label: 'Other', value: 'other' },
            ]} />
          </Field>

          <Separator />

          <Field label="Filter">
            <InlineSelect value={selected} onValueChange={setSelected} size='xl' options={[
              { label: '1', value: 'all' },
              { label: 'Hiking', value: 'hiking' },
              { label: 'Cycling', value: 'cycling' },
              { label: 'Running', value: 'running' },
              { label: 'Walking', value: 'walking' },
              { label: 'Other', value: 'other' },
            ]} />
          </Field>

          <div style={{ position: 'relative' }}>
            <Button variant='outline' onClick={() => setIsOpen(!isOpen)}>Coucou</Button>
            {/* <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div>
              <Button variant='ghost'>Coucou</Button>
              <Button variant='ghost'>Coucou</Button>
              <Button variant='ghost'>Coucou</Button>
            </div>
          </Dropdown> */}
          </div>


          <Separator />


          <HStack gap={10} vMargin={10}>
            <Badge variant='surface'>Coucou</Badge>
            <Badge variant='outline'>Coucou</Badge>
            <Badge variant='solid'>Coucou</Badge>
            <Badge variant='plain'>Coucou</Badge>
          </HStack>

          <Grid columns={4} gap='md'>
            {
              Array.from({ length: 6 }).map((_, index) => (
                <Box variant='outline' padding='none' stack='vertical' key={index}>
                  <Image src="https://bit.ly/naruto-sage" width={'100%'} aspectRatio={6 / 7} alt="naruto" />
                  <Box padding='md' variant='plain'>
                    <div>Hello world</div>
                    <Small>une petite description en dessous</Small>
                  </Box>
                </Box>
              ))
            }
          </Grid>


          {/* <Textarea
            autoSize
            spellCheck={false}
            minRows={1}
            maxRows={5}
          /> */}

          {/* <ErrorBoundary fallback={<Alert>Oups !</Alert>}>
            <TestError />
          </ErrorBoundary>

          <Button onClick={() => inputRef.current?.focus()}>TEST</Button> */}

          {/* <br /><br />

          <FormField label="Note">
            <Input

              startAddon={<UserIcon size={14} />}


              ref={inputRef} medium flushed placeholder='Coucou' value={note} onChange={e => setNote(e.target.value)} />
          </FormField>


          <FormField label="Firstname">
            <Input medium outline placeholder='Coucou' />
          </FormField>

          <FormField label="Lastname">
            <Input medium subtle placeholder='Coucou' />
          </FormField> */}


        </div>
      </Container>
    </div>
    {/* <Sidebar position='right' resizable >Coucouc!</Sidebar> */}
  </Fullscreen >
};


export default Page

// const TestError = () => {

//   const [en, setEn] = useState(false)

//   if (en) throw new Error('Oups !')

//   return <div>
//     <Button onClick={() => setEn(true)}>TestError</Button>
//   </div>
// }


// const Cell = ({ label, location, image }: { label: string, location: string, image: string }) => {
//   return <Box padding='none' radius='none'>
//     <Image
//       alt=''
//       width={"100%"}
//       src={image}
//       aspectRatio={250 / 290}
//       radius='md'
//     />
//     <div>
//       <Text weight={700} size='2xl'>{label}</Text>
//     </div>
//     <div>
//       <Text size='sm' opacity={0.6}>{location}</Text>
//     </div>
//   </Box>
// }