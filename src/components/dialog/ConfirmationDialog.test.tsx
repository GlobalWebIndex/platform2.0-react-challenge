import { fireEvent, render, screen } from '@testing-library/react';
import { TestIds } from '../../utils/testids';
import { ConfirmationDialog } from './ConfirmationDialog.component';

describe('Confirmation Dialog', () => {
    const isDialogOpenHandler = jest.fn();
    const onConfirmHandler = jest.fn();
    beforeEach(() => {
        render(<ConfirmationDialog dialogOpen={true} setIsDialogOpen={isDialogOpenHandler} onConfirm={onConfirmHandler} />);
    });

    it('should be in the document when dialogOpen is true', () => {
        expect(screen.getByTestId(TestIds.dialogContainer)).toBeInTheDocument;
    });

    it('should fire onConfirmHandler on delete button click', () => {
        fireEvent.click(screen.getByTestId(TestIds.dialogDeleteButton));
        expect(onConfirmHandler).toBeCalledTimes(1);
    });

    it('should close Dialog when delete button click', () => {
        fireEvent.click(screen.getByTestId(TestIds.dialogDeleteButton));
        expect(screen.getByTestId(TestIds.dialogContainer)).not.toBeInTheDocument;
    });

    it('should close Dialog when cancel button click', () => {
        fireEvent.click(screen.getByTestId(TestIds.dialogCancelButton));
        expect(screen.getByTestId(TestIds.dialogContainer)).not.toBeInTheDocument;
    });
});
