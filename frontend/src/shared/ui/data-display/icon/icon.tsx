import type { JSX } from "@reatom/jsx";

type SvgProps = JSX.IntrinsicElements["svg:svg"];
type SvgSize = SvgProps["width"];
type SvgColor = SvgProps["fill"];

type IconProps = {
  id: string;
  title?: string;
  size?: SvgSize;
  color?: SvgColor;
} & Omit<SvgProps, "id">;

export const Icon = (props: IconProps) => {
  const { id, title, size, color = "currentColor", width = 16, height = 16, ...rest } = props;

  return (
    <svg:svg
      {...rest}
      width={size ?? width}
      height={size ?? height}
      fill={color}
      stroke={color}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <svg:use href={`/__spritemap#sprite-${id}`} />
    </svg:svg>
  );
};
