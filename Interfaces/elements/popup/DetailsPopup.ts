import { Breed } from "interfaces/pages/Breeds";

export interface DetailsPopupProps {
    details?: Breed,
    onClose?: () => void
};