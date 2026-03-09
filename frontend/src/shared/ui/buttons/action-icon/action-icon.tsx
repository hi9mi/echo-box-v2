import type { JSX } from "@reatom/jsx";
import { cva, type VariantProps } from "class-variance-authority";
import styles from "./action-icon.module.css";

const actionIconCva = cva("action-icon", {
  variants: {
    size: {
      xs: styles.xs,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
    variant: {
      default: styles.default,
      filled: styles.filled,
      transparent: styles.transparent,
    },
    shape: { round: styles.round, square: styles.square },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    shape: "round",
  },
});
type Variants = VariantProps<typeof actionIconCva>;

export type ActionIconProps<T extends "button" | "a"> = {
  as?: T;
  size?: Variants["size"];
  variant?: Variants["variant"];
  shape?: Variants["shape"];
} & JSX.IntrinsicElements[T];

export const ActionIcon = <T extends "button" | "a">(props: ActionIconProps<T>) => {
  const {
    as: Tag = "button",
    variant = "default",
    size = "md",
    shape = "round",
    children,
    class: className,
    ...rest
  } = props;

  return (
    <Tag
      {...(rest as any)}
      class={[styles.actionIcon, actionIconCva({ variant, size, shape }), className]}
    >
      {children}
    </Tag>
  );
};
