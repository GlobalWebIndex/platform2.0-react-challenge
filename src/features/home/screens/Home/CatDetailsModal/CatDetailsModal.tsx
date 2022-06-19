import Modal from 'common/components/Modal';
import { ICat } from 'features/home/types';

interface Props {
  selectedCat: ICat;
  isOpen: boolean;
  onDismiss: () => void;
}

const CatDetailsModal = ({ selectedCat, isOpen, onDismiss }: Props) => {
  return (
    <Modal
      title="a title"
      body={selectedCat.id}
      isOpen={isOpen}
      onDismiss={onDismiss}
    />
  );
};

export default CatDetailsModal;
