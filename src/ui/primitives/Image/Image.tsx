import classNameModule from '@ui/core/classname';
import styles from './Image.module.scss';
import { SizeVariant } from '@ui/_shared/types';
const className = classNameModule(styles)

type ImageProps = {
    aspectRatio?: number | string
    radius?: SizeVariant
} & React.ImgHTMLAttributes<HTMLImageElement>

export const Image = ({ aspectRatio, radius, ...props }: ImageProps) => {
    return <img
        {...className('Image', { radius })} {...props}
        style={{
            aspectRatio
        }}
    />;
};