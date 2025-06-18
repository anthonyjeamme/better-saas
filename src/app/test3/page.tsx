'use client'

import { FolderClosedIcon, FolderOpenIcon, WavesIcon, Layers2Icon, MountainIcon, TypeIcon, RouteIcon, PentagonIcon, ImageIcon, FolderPlusIcon, GroupIcon } from 'lucide-react';

import { Layers } from '@ui/display/Layers';
import { Container } from '@ui/display/Container';
import { useLayers } from '@ui/display/Layers/Layers.hook';

import classNameModule from '@ui/core/classname';
import styles from './page.module.scss';
import { Box } from '@ui/display/Box';
const className = classNameModule(styles)

export default function Page() {
    const layers = useLayers<{
        layer_type: 'text' | 'path' | 'shape' | 'image'
    }, {}>({
        items: [
            {
                id: "water",
                type: "folder",
                name: "Eau",
                config: {
                    disableRemove: true,
                    disableRename: true,
                    disableDrag: true,
                }
            },
            {
                id: "ground",
                type: "folder",
                name: "Terre",
                config: {
                    disableRemove: true,
                    disableRename: true,
                    disableDrag: true,
                }
            },
            {
                id: "top",
                type: "folder",
                name: "Sur-couche",
                config: {
                    disableRemove: true,
                    disableRename: true,
                    disableDrag: true,
                }
            },
            {
                id: 'ville',
                type: 'element',
                name: 'Ville',
                layer_type: 'text',
            }, {
                id: 'beaches',
                type: 'element',
                name: 'Plages',
                layer_type: 'path',
            },
            {
                id: 'shallow-water',
                type: 'element',
                name: 'Eau peu profonde',
                layer_type: 'shape',
            }
        ],
        tree: {
            root: ["top", "ground", "water"],
            water: ['shallow-water'],
            ground: ['beaches'],
            top: ['ville'],
        },
    })

    return <div {...className('Page')}>
        <Container vMargin='lg'>
            <div style={{ width: 400 }}>
                <Box variant='outline' padding='sm'>
                    <Layers
                        layers={layers}
                        folderMenu={[
                            {
                                label: 'Créer un dossier',
                                icon: <FolderPlusIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    layers.tree.addFolder(item.id, 0, {
                                        name: 'Nouveau dossier'
                                    })
                                    close()
                                }
                            },
                            {
                                label: 'Créer un layer texte',
                                icon: <TypeIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    layers.tree.addItem(item.id, 0, {
                                        name: 'Texte',
                                        layer_type: 'text'
                                    })
                                    close()
                                }
                            }, {
                                label: 'Créer un layer chemin',
                                icon: <RouteIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    layers.tree.addItem(item.id, 0, {
                                        name: 'Chemin',
                                        layer_type: 'path'
                                    })
                                    close()
                                }
                            }, {
                                label: 'Créer un layer forme',
                                icon: <PentagonIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    layers.tree.addItem(item.id, 0, {
                                        name: 'Forme',
                                        layer_type: 'shape'
                                    })
                                    close()
                                }
                            }, {
                                label: 'Créer un layer image',
                                icon: <ImageIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    layers.tree.addItem(item.id, 0, {
                                        name: 'Image',
                                        layer_type: 'image'
                                    })
                                    close()
                                }
                            }
                        ]}
                        elementMenu={[
                            {
                                label: 'Grouper',
                                icon: <GroupIcon size={15} color='var(--primary)' />,
                                onClick: (item, close) => {
                                    if (layers.activeLayerIds.length > 1 && layers.activeLayerIds.includes(item.id)) {
                                        console.log("COUCOU")
                                        return
                                    }

                                    const parentId = layers.tree.getItemParent(item.id)
                                    const index = layers.tree.getItemIndexInFolder(item.id)
                                    const newFolderId = layers.tree.addFolder(parentId, index, {
                                        name: 'Groupe',
                                    })

                                    layers.tree.moveItem(item.id, newFolderId, 0)
                                    close()
                                }
                            }
                        ]}
                        renderIcon={(item, state) => {
                            const color = state.isSelected ? undefined : 'var(--primary)'

                            if (item.id === 'top') return <Layers2Icon color={color} size={15} />
                            if (item.id === 'ground') return <MountainIcon color={color} size={15} />
                            if (item.id === 'water') return <WavesIcon color={color} size={15} />
                            if (item.type === "folder")
                                return state.isOpen ? <FolderOpenIcon color={color} size={15} /> :
                                    <FolderClosedIcon color={color} size={15} />

                            if (item.type === "element") {
                                if (item.layer_type === "text") {
                                    return <TypeIcon size={15} />
                                }
                                if (item.layer_type === "path") {
                                    return <RouteIcon size={15} />
                                }
                                if (item.layer_type === "shape") {
                                    return <PentagonIcon size={15} />
                                }
                                if (item.layer_type === "image") {
                                    return <ImageIcon size={15} />
                                }
                            }
                            return null
                        }}
                        scope="test"
                    />
                </Box>
            </div>
        </Container>
    </div>;
};
