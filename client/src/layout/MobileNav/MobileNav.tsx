import "./MobileNav.scss";

import { toggleModal } from "../../features/ModalSlice";
import { useAppDispatch } from "../../app/hooks";
import { MobileNavList } from "../../components/MobileNavList/MobileNavList";

export const MobileNav = () => {
  // Redux Toolkit finction to dispatch events
  const dispatch = useAppDispatch();

  return (
    <MobileNavList
      onClick={() => dispatch(toggleModal({ isOpen: true, editable: false }))}
    />
  );
};
