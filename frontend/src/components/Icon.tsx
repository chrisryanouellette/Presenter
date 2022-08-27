import { AriaAttributes, FC, SVGAttributes, useId } from "react";

type IconProps = SVGAttributes<SVGElement> & {
  name: string;
  title?: string;
  href?: string;
  className?: string;
};

const Icon: FC<IconProps> = ({
  name,
  href = "remixicon.symbol.svg",
  title,
  role,
  ...rest
}) => {
  const id = useId();

  const ariaAttributes: AriaAttributes = {};
  const svgPros: SVGAttributes<SVGElement> = {};

  if (title) {
    ariaAttributes["aria-labelledby"] = id;
    svgPros["role"] = role || "img";
  } else {
    ariaAttributes["aria-hidden"] = true;
  }

  return (
    <svg {...rest} {...ariaAttributes} {...svgPros} focusable={false}>
      {title && <title id={id}>{title}</title>}
      <use aria-hidden="true" href={`${href}#${name}`} />
    </svg>
  );
};

export { Icon };
