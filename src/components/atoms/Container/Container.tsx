import WithChildren from "../../../utils/prop-utils/with-children.interface";

export interface ContainerProps extends WithChildren {}

export default function Container(props: ContainerProps): JSX.Element {
  return <div className="mx-4 md:container md:mx-auto">{props.children}</div>;
}
