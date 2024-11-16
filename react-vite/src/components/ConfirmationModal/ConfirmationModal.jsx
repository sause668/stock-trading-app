import { useModal } from "../../context/Modal";

const ConfirmationModal = (props) => {
    const {action} = props
    const { closeModal }= useModal();
    
    return (
    <div className='alert'>
            <h2>Confirm {action}</h2>
            <h3>Are you sure you want to {action}?</h3>
    </div>
  )
};

export default ConfirmationModal;
