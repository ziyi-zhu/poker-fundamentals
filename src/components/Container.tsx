import { cn } from "@/lib/cn";

type ContainerProps = {
  /**
   * The maximum content width on large screens. Defaults to `max-w-7xl` to match
   * the standard Tailwind UI shell. Use `narrow` for reading-focused pages.
   */
  width?: "default" | "narrow" | "wide";
  className?: string;
  children: React.ReactNode;
};

const WIDTHS: Record<NonNullable<ContainerProps["width"]>, string> = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-screen-2xl",
};

/**
 * Site-wide horizontal wrapper.
 *
 * All top-level page sections, the header, and the footer use this so the
 * left/right gutter is identical: 16px on phones, 24px on tablets, 32px on
 * desktops. Inside, content can opt into a narrower reading width via the
 * `width` prop without changing the outer gutter.
 */
export function Container({ width = "default", className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", WIDTHS[width], className)}>
      {children}
    </div>
  );
}
