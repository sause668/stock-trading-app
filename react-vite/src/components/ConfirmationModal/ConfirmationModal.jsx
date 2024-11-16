import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';


const ConfirmationModal = (props) => {
    const dispatch = useDispatch();
    const { closeModal }= useModal();
    const {action, shares, stock} = props;

    const confirm = () => {
        if (itemString == 'review') {
            return dispatch(dropReview(id))
            .then(() => dispatch(getReviews(item.spotId))
            .then(() => dispatch(getOneSpot(item.spotId))))
            .then(closeModal); 
        } else {
            return dispatch(dropSpot(id))
            .then(() => dispatch(getUserSpots()))
            .then(closeModal)
        }
    }

    return (
        <div className='alert'>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to {action} {shares} of {stock.symbol}?</h3>
            <div className='buttons'>
                <button id='modal-button' className='btn' onClick={() =>confirm(item.id)}>Yes (Delete {itemString})</button>
                <button id='modal-button' className='btn modal-button close-modal' onClick={closeModal}>No (Keep {itemString})</button>
            </div>
        </div>
    )
}

export default ConfirmationModal;
