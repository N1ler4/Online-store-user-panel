import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

interface ModalProps {
  modalContent: React.ReactNode;
  initialOpen?: boolean;
  buttonText?: string;
  onClose?: () => void;
  showButton?: boolean;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const BasicModal = forwardRef<ModalHandle, ModalProps>(
  (
    {
      modalContent,
      initialOpen = false,
      buttonText = "Open modal",
      onClose,
      showButton = true,
    },
    ref
  ) => {
    const [open, setOpen] = useState(initialOpen);

    useEffect(() => {
      setOpen(initialOpen);
    }, [initialOpen]);

    const handleToggle = () => {
      setOpen(!open);
      if (onClose && open) {
        onClose();
      }
    };

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <div>
        {showButton && ( 
          <Button onClick={handleToggle} variant="contained" color="primary">
            {buttonText}
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleToggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>{modalContent}</Box>
        </Modal>
      </div>
    );
  }
);

export default BasicModal;
