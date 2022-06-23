import { Modal, Button } from "react-bootstrap";
import { Colors } from "../models/Colors";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

interface ModalProps {
  modal: boolean;
  setModalShow: (status: boolean) => void;
  vinner: Colors | null;
  victoryHandler: (vinner: Colors | null) => void;
}

const Modall: React.FC<ModalProps> = ({ modal, setModalShow, vinner, victoryHandler }) => {
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (vinner !== null) {
      setWinner(vinner);
    }
  }, [vinner]);

  const showHandler = () => {
    setModalShow(false);
    victoryHandler(null);
  };

  return (
    <>
      <Modal show={modal} centered>
        <Modal.Header>
          <Modal.Title> The {winner.toUpperCase()} has won !</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => showHandler()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modall;
