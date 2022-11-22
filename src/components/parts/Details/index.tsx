import Styled from './styled';
import type Cat from 'types';

type Props = {
  content?: Cat.Breed[];
  noContentMessage?: string;
};

function Details(props: Props) {
  const { content, noContentMessage } = props;

  return (
    <Styled.Details>
      {content && content.length > 0 ? (
        <>
          {content.map((item) => (
            <Styled.Group key={item.id}>
              <Styled.Row>
                <Styled.Column>Breed</Styled.Column>
                <Styled.Column>{item.name}</Styled.Column>
              </Styled.Row>
              <Styled.Row>
                <Styled.Column>Personality</Styled.Column>
                <Styled.Column>{item.temperament}</Styled.Column>
              </Styled.Row>
              <Styled.Row>
                <Styled.Column>Origin</Styled.Column>
                <Styled.Column>{item.origin}</Styled.Column>
              </Styled.Row>
              <Styled.Row>
                <Styled.Column>Life span</Styled.Column>
                <Styled.Column>{item.life_span} years</Styled.Column>
              </Styled.Row>
            </Styled.Group>
          ))}
          <Styled.Note>Check out other breeds</Styled.Note>
        </>
      ) : (
        <>{noContentMessage}</>
      )}
    </Styled.Details>
  );
}

export default Details;
