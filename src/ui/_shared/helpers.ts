import { UIPaletteProps, UISizeProps } from "./types";
import classNameModule, { TClassNameList } from "@ui/core/classname";

const paletteKeys = ["primary", "secondary", "success", "warning", "error"];
const sizeKeys = ["small", "medium", "large"];
const variantKeys = ["solid", "subtle", "surface", "outline", "ghost", "plain"];

type ModuleName = "variant" | "size" | "palette";

function uiPalette(props: UIPaletteProps) {
  return getProp(props, paletteKeys, "primary");
}

function uiSize(props: UISizeProps) {
  return getProp(props, sizeKeys, "medium");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uiVariant(props: any) {
  return getProp(props, variantKeys, "solid");
}

function getProp(
  props: Record<string, boolean>,
  properties: string[],
  defaultProperty?: string
) {
  for (const property of properties) {
    if (props[property]) {
      return {
        [property]: true,
      };
    }
  }

  if (defaultProperty) {
    return {
      [defaultProperty]: true,
    };
  }
  return {};
}

function extractClassName(
  props: Record<string, unknown>,
  modules: ModuleName[]
) {
  const htmlProps = {
    ...props,
  };

  const classNameObject = {};

  if (modules.includes("variant")) {
    Object.assign(classNameObject, uiVariant(props));
    for (const key of variantKeys) {
      delete htmlProps[key];
    }
  }

  if (modules.includes("size")) {
    Object.assign(classNameObject, uiSize(props));
    for (const key of sizeKeys) {
      delete htmlProps[key];
    }
  }

  if (modules.includes("palette")) {
    Object.assign(classNameObject, uiPalette(props));
    for (const key of paletteKeys) {
      delete htmlProps[key];
    }
  }

  return {
    htmlProps,
    classNameObject,
  };
}

export function prepareProps(
  styles: { [key: string]: string },
  classNameEntries: TClassNameList,
  { className: classNameProp, ...props }: Record<string, unknown>,
  modules: ModuleName[]
) {
  const className = classNameModule(styles);
  const { htmlProps, classNameObject } = extractClassName(props, modules);

  return {
    ...className(
      ...classNameEntries,
      classNameObject,
      classNameProp ? `:${classNameProp}` : undefined
    ),
    ...htmlProps,
  };
}
