import { SizeVariant } from '../../core/types';

import classNameModule from '../../core/classname';
import styles from './Image.module.scss';
const className = classNameModule(styles)

type ImageProps = {
    aspectRatio?: number | string
    radius?: SizeVariant
} & React.ImgHTMLAttributes<HTMLImageElement>

export const Image = ({ aspectRatio, radius, ...props }: ImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img
        {...className('Image', { radius })} {...props}
        style={{
            aspectRatio
        }}
        alt=""
    />;
};