import "./MobileNav.scss";

import { MobileNavList } from "../../components/MobileNavList/MobileNavList";
import { toggleModal } from "../../features/ModalSlice";
import { useAppDispatch } from "../../app/hooks";

export const MobileNav = () => {
  // Redux Toolkit finction to dispatch events
  const dispatch = useAppDispatch();

  return (
    <MobileNavList
      clickFunction={() => dispatch(toggleModal({ isOpen: true, editable: false }))}
    />
  );
};
