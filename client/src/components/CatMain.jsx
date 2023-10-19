import React, { useState, useEffect } from 'react'
import CatModal from './CatModal.jsx';
import '../styles/GeneralModal.css';
import Axios from "axios";
import Modal from 'react-modal';

export default function CatMain() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [funct, setFunct] = useState('');
    const [field, setField] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3000/cat_list").then((response) => {
            setCategoriesList(response.data);
        });
    }, []);

    const toModalCat = () => {
        setModalOpen(false);
    }

    function clickInsert() {
        setModalOpen(true);
        setFunct('insert');
    }

    const clickEdit = (field) => {
        setField(field);
        setFunct('edit');
        setModalOpen(true);
    }

    return (

        <div>
            <button onClick={clickInsert}>Insert</button>
            <Modal
                className='modal-gen'
                overlayClassName='modal-gen-overlay'
                isOpen={modalOpen}
                contentLabel="Modal de exemplo"
                closeTimeoutMS={200}
            >
                <CatModal toModalCat={toModalCat} toCatField={field} toCatFunct={funct} />
            </Modal>
            <div className='acc-grid'>
                {categoriesList.map((field) => {
                    return (
                        <div className='acc-item' key={field.id}>
                            <div className='acc-field' onClick={() => clickEdit(field)}>{field.category}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
