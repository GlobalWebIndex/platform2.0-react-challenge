import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Modal from 'components/parts/Modal';
import Image from 'components/parts/Image';
import Details from 'components/parts/Details';
import Cat from 'types';
import Styled from './styled';
import Api from 'data/api';

type Props = {
  selectedImage: Cat.Image | null;
  isFavourite: boolean;
  onClose(): void;
  onToggleFavourite(): void;
  onOpenAfterPageIsLoaded?: (selectedImage: Cat.Image) => void;
};

function CatImage(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipTimeoutRef = useRef(-1);

  const handleCloseModal = () => {
    props.onClose();

    // Update the location pathname to index, unless
    // the image was opened through the 'breeds' view
    if (!location.pathname.includes('breeds')) navigate('/');
  };

  const handleMouseEnterTooltip = () => {
    window.clearTimeout(tooltipTimeoutRef.current);
    setIsTooltipVisible(true);
  };

  const handleMouseLeaveTooltip = () => {
    tooltipTimeoutRef.current = window.setTimeout(
      () => setIsTooltipVisible(false),
      1000
    );
  };

  const handleClickTooltipContent = () => {
    props.onClose();

    if (props.selectedImage?.breeds) navigate('/breeds');
  };

  useEffect(() => {
    // When an image link is opened
    if (params.id && props.onOpenAfterPageIsLoaded) {
      Api.getImage(params.id).then(
        (selectedImage) => props.onOpenAfterPageIsLoaded?.(selectedImage),
        console.error
      );
    }
    // eslint-disable-next-line
  }, [params.id]);

  return (
    <Modal
      id="cat-image"
      data-test="cat-image-modal"
      isVisible={!!props.selectedImage?.id}
      onClose={handleCloseModal}
    >
      <>
        <Styled.Toolbar role="toolbar">
          <Styled.Title role="heading">Hello kitty, kitty! 🐈</Styled.Title>
          <Styled.Tooltip
            role="tooltip"
            data-test="tooltip"
            onMouseEnter={handleMouseEnterTooltip}
            onMouseLeave={handleMouseLeaveTooltip}
          >
            <Styled.TooltipContent
              aria-hidden={isTooltipVisible ? 'true' : 'false'}
              data-test="tooltip-content"
              isVisible={isTooltipVisible}
              onClick={handleClickTooltipContent}
            >
              <Details
                content={props.selectedImage?.breeds}
                noContentMessage="Breed info is not available for this cat."
              />
            </Styled.TooltipContent>
          </Styled.Tooltip>
          <Styled.Favourite
            role="button"
            data-test="favourite"
            isActive={props.isFavourite}
            onClick={() => props.onToggleFavourite()}
          />
        </Styled.Toolbar>
        {props.selectedImage && (
          <Image data-test="original-cat-image" {...props.selectedImage} />
        )}
      </>
    </Modal>
  );
}

export default CatImage;
