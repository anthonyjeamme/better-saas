'use client'

import React, { useState } from 'react';
import { BotIcon, PinIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon, PlayIcon, DotIcon, SunIcon, XIcon, UserIcon } from 'lucide-react';

import { For } from '@ui/layout/For';
import { Modal } from '@ui/layout/Modal';
import { Fullscreen, HStack, Sidebar, VStack } from '@ui/layout';

import { useList } from '@ui/hooks/useList/useList';

import { Box } from '@ui/display/Box';
import { Grid } from '@ui/display/Grid';
import { Menu } from '@ui/display/Menu';
import { Tree } from '@ui/display/Tree';
import { Dropzone } from '@ui/display/Dropzone';
import { Container } from '@ui/display/Container';
import { Breadcrumb } from '@ui/display/Breadcrumb';
import { ContextMenu, useContextMenu } from '@ui/display/ContextMenu';

import { Input } from '@ui/primitives/Input';
import { Field } from '@ui/primitives/Field';
import { Image } from '@ui/primitives/Image';
import { Select } from '@ui/primitives/Select';
import { Button } from '@ui/primitives/Button';
import { Toggle } from '@ui/primitives/Toggle';
import { Checkbox } from '@ui/primitives/Checkbox';
import { Separator } from '@ui/primitives/Separator';
import { FilePicker } from '@ui/primitives/FilePicker';
import { NumberInput } from '@ui/primitives/NumberInput';
import { InlineSelect } from '@ui/primitives/InlineSelect';

import { ActionBar } from '@ui/display/ActionBar';
import { Tag } from '@ui/primitives/Tag/Tag';
import { Code } from '@ui/display/Code';
import { Slider } from '@ui/primitives/Slider/Slider';
import { Dialog } from '@ui/display/Dialog';

function Page() {
  const [bool, setBool] = useState(false)
  const [number, setNumber] = useState<number | null>(null)

  const [sliderValue, setSliderValue] = useState<number>(0)
  const [selected, setSelected] = useState<string>('hiking')
  const [selectedMult, setSelectedMult] = useState<string[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [pickedFiles, setPickedFiles] = useState<File[]>([])
  const [text, setText] = useState<string>('')

  const contextMenu = useContextMenu()

  const [isActionBarOpen, setIsActionBarOpen] = useState(false)

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


  return <Fullscreen horizontal >
    <Sidebar position='left' width={250}>Coucouc!</Sidebar>
    <div style={{ flex: 1, overflowY: 'auto', }}>
      <Container size='lg' vMargin='lg'>

        <Button
          shape='square'
          onClick={() => {
            function getCurrentTheme() {
              if (document.documentElement.style.colorScheme) return document.documentElement.style.colorScheme
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
              return 'light'
            }
            const currentTheme = getCurrentTheme()
            if (currentTheme === "light") {
              document.documentElement.classList.remove('light')
              document.documentElement.classList.add('dark')
              document.documentElement.style.colorScheme = "dark"
              document.cookie = `theme=dark; path=/; max-age=31536000`
            } else {
              document.documentElement.classList.remove('dark')
              document.documentElement.classList.add('light')
              document.documentElement.style.colorScheme = "light"
              document.cookie = `theme=light; path=/; max-age=31536000`

            }
          }}><SunIcon size={18} /></Button>

        <div>
          <Button onClick={() => setIsDialogOpen(true)}>Dialog</Button>
        </div>

        {isDialogOpen && <Dialog title='Dialog title' onClose={() => setIsDialogOpen(false)}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Dialog>}


        <div>
          <Button

            variant='surface'
            onClick={() => setIsActionBarOpen(!isActionBarOpen)}>{
              isActionBarOpen ? "Close" : "Open"
            }</Button>
        </div>

        {isActionBarOpen && <ActionBar position={{

          vertical: 'bottom',
          horizontal: 'center'
        }}>
          <Button variant='ghost' size='sm'>
            <PlusIcon size={14} />
            Insert
          </Button>

          <hr />

          <Button variant='ghost' shape='square' size='sm'
            onClick={() => setIsActionBarOpen(false)}
          >
            <XIcon size={14} />
          </Button>
        </ActionBar>}

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde sunt, libero eius laboriosam maxime cum fugiat numquam corrupti aliquid provident. Ipsum vero fuga et, consequatur iste repudiandae consectetur earum tempore?
        </p>

        <h2>Code</h2>

        <Code>
          {`console.log("hello");\nconsole.log("world");`}
        </Code>

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

        <Code>
          {`<Button />`}
        </Code>

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
              loading>
              Button
            </Button>
          </HStack>
        </Field>

        <Button variant='solid'>
          <PlayIcon size={14} /> Button custom
        </Button>

        <h2>Inputs</h2>
        <Grid columns={5} gap={"md"}>
          <Field label={<code>{`size="sm"`}</code>}>
            <Input value={text} onValueChange={setText} size="md" variant='flushed' />
          </Field>
          <Field label={<code>{`size="md"`}</code>}>
            <Input value={text} onValueChange={setText} size="md" variant='outline' />
          </Field>
          <Field label={<code>{`size="lg"`}</code>}>
            <Input value={text} onValueChange={setText} size='md' variant='subtle' />
          </Field>
        </Grid>

        <h2>Number inputs</h2>

        <Code>
          {`<NumberInput />`}
        </Code>

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

        <h2>Tags</h2>

        <Code>{`<Tag />`}</Code>

        <HStack gap={5} align='center' vMargin={'sm'}>
          <Tag variant='surface' theme='success'>
            <UserIcon />
            cool
          </Tag>
          <Tag variant='surface' theme='primary'>
            <UserIcon />
            cool
          </Tag>
          <Tag variant='surface' theme='warning'>
            <UserIcon />
            cool
          </Tag>
          <Tag variant='surface' theme='error'>
            <UserIcon />
            cool
          </Tag>
        </HStack>


        <h2>Checkbox</h2>

        <Code>{`<Checkbox />`}</Code>

        <HStack gap={10} vMargin={'sm'}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' />
        </HStack>
        <HStack gap={10} vMargin={'sm'}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' theme='primary' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' theme='primary' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' theme='primary' />
        </HStack>
        <HStack gap={10} vMargin={'sm'}>
          <Checkbox value={bool} onValueChange={setBool} variant='outline' theme='success' />
          <Checkbox value={bool} onValueChange={setBool} variant='solid' theme='success' />
          <Checkbox value={bool} onValueChange={setBool} variant='subtle' theme='success' />
        </HStack>

        <HStack gap={10} vMargin={'sm'} align='center'>
          {/* <Checkbox value={bool} onValueChange={setBool} variant='outline' size='xs' /> */}
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='sm' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='md' />
          <Checkbox value={bool} onValueChange={setBool} variant='outline' size='lg' />
          {/* <Checkbox value={bool} onValueChange={setBool} variant='outline' size='xl' /> */}
        </HStack>


        <h2>Toggle</h2>

        <Code>{`<Toggle />`}</Code>

        <HStack gap={10} vMargin={'sm'} align='center'>

          <Toggle value={bool} onValueChange={setBool} />
          <Toggle value={bool} onValueChange={setBool} theme='primary' />
          <Toggle value={bool} onValueChange={setBool} theme='success' />
          <Toggle value={bool} onValueChange={setBool} theme='error' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' />

        </HStack>

        <HStack gap={10} vMargin={'sm'} align='center'>

          <Toggle value={bool} onValueChange={setBool} variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='primary' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='success' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='error' variant='outline' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' variant='outline' />

        </HStack>

        <HStack gap={10} vMargin={'sm'} align='center'>
          <Toggle value={bool} onValueChange={setBool} variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='primary' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='success' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='error' variant='subtle' />
          <Toggle value={bool} onValueChange={setBool} theme='warning' variant='subtle' />
        </HStack>


        <HStack gap={10} vMargin={'sm'} align='center'>

          {/* <Toggle value={bool} onValueChange={setBool} size='xs' /> */}
          <Toggle value={bool} onValueChange={setBool} size='sm' />
          <Toggle value={bool} onValueChange={setBool} size='md' />
          <Toggle value={bool} onValueChange={setBool} size='lg' />
          {/* <Toggle value={bool} onValueChange={setBool} size='xl' /> */}

        </HStack>

        <h2>File Picker</h2>

        <Code>
          {`<FilePicker />`}
        </Code>

        <FilePicker onPickedFiles={files => setPickedFiles(files)} />

        {
          pickedFiles.length > 0 && (
            <Box variant='outline' vMargin='sm' padding='sm'>
              <VStack gap={10}>
                <For each={pickedFiles}>{
                  file => <Box variant='outline' stack='horizontal' align='center' gap={10}>
                    <span>{file.name}</span>
                  </Box>}</For>
              </VStack>
            </Box>
          )
        }

        <h2>Separators</h2>

        <Code>{`<Separator />`}</Code>

        <Separator margin='sm' />

        <h2>Breadcrumb</h2>

        <Code>{`<Breadcrumb />`}</Code>

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


        <Code>{`<Breadcrumb separator={<DotIcon size={14} />} />`}</Code>


        <Breadcrumb separator={<DotIcon size={14} />}>
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

        <Code>{`<Select search options={[]} />`}</Code>

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
              value={selected} onValueChange={setSelected} />
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

              value={selectedMult} onValueChange={setSelectedMult} />
          </Field>
        </Grid>


        <h2>Slider</h2>

        <Code>{`<Slider value={number} onValueChange={setNumber} min={0} max={10} size='xs' />`}</Code>

        <Slider value={sliderValue} onValueChange={setSliderValue} min={0} max={100} />
        {/* <Grid columns={4} gap={"lg"}>
          <Field label={<code>{`size="xs"`}</code>}>
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


        <Code>{`<Menu />`}</Code>


        <HStack gap={10} vMargin={'sm'} justify='space-between' align='center'>
          <Menu size='xs' />
          <Menu size='sm' />
          <Menu size='md' />
          <Menu size='lg' />
          <Menu size='xl' />
        </HStack>

        <h2>Tree</h2>


        <Code>{`<Tree />`}</Code>

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

                <Input value={item.name} onValueChange={name => list.update(index, { name })} />
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


        <Field label="Filter">
          <InlineSelect value={selected} onValueChange={setSelected} options={[
            { label: '1', value: 'all' },
            { label: 'Hiking', value: 'hiking' },
            { label: 'Cycling', value: 'cycling' },
            { label: 'Running', value: 'running' },
            { label: 'Walking', value: 'walking' },
            { label: 'Other', value: 'other' },
          ]} />
        </Field>

      </Container>
    </div>
  </Fullscreen >
};


export default Page
