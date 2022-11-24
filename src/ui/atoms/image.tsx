import { cva, cx } from "class-variance-authority";
type ImageProps = {
  id: string;
  src: string;
  width?: number;
  height?: number;
  interaction?: "clickable" | "non";
};

const image = cva(["image", "h-full overflow-hidden shadow-lg"], {
  variants: {
    borders: {
      full: "rounded-lg border",
    },
    interaction: {
      non: [],
      clickable: ["shadow-lg", "hover:shadow-xl", "hover:scale-105"],
    },
  },
  defaultVariants: {
    borders: "full",
  },
});
export function Image({ id, interaction = "non", ...props }: ImageProps) {
  const cn = image({ interaction });
  return (
    <div className={cn}>
      <img
        alt={id}
        className="shadow-lg h-full w-full aspect-square object-cover"
        {...props}
      />
    </div>
  );
}
