import Modal from '../Modal';
import Button from '../Button';

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

const Dialog = ({
  title,
  description,
  isOpen,
  onConfirm,
  onDismiss,
}: Props) => {
  return (
    <Modal
      title={title}
      body={
        <div className="flex flex-col">
          <span className="text-lg mx-6 my-4">{description}</span>
          <div className="flex flex-row items-center justify-end p-4 h-24">
            <Button
              className="mr-4"
              variant="secondary"
              label="Cancel"
              onClick={onDismiss}
            />
            <Button variant="danger" label="Delete" onClick={onConfirm} />
          </div>
        </div>
      }
      isOpen={isOpen}
      onDismiss={onDismiss}
    />
  );
};

export default Dialog;
