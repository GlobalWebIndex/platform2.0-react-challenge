interface Props {
  text: string;
}

const PageTitle = ({ text }: Props) => (
  <div className="container flex items-center justify-start mt-4 mb-8 px-12">
    <span className="text-2xl">{text}</span>
  </div>
);

export default PageTitle;
