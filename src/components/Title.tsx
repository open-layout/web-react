interface Props {
  text: string;
  color?: string;
}

const Title: React.FC<Props> = ({ text, color = "white" }) => {
  return <h2 className={`text-3xl text-${color}`}>{text}</h2>;
};

export default Title;
