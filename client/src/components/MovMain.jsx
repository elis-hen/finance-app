import React, { useState, useEffect } from 'react'
import '../styles/MovMain.css';
import Axios from "axios";
import MovModal from './MovModal.jsx';
import '../styles/GeneralModal.css'
import Modal from 'react-modal';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiClose, mdiDelete, mdiPencil } from '@mdi/js';
// Código necessário para os recursos de acessibilidade
Modal.setAppElement('#root');

export default function MovMain() {
    const [movementsList, setMovementsList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [funct, setFunct] = useState('');
    const [field, setField] = useState();


    // Função que abre a modal
    function clickInsert() {
        setModalOpen(true);
        setFunct('insert');
    }
    const clickEdit = (field) => {
        setField(field);
        setFunct('edit');
        setModalOpen(true);
    }
    const clickStatus = (field) => {
        if (field.status === 'active') {
            Axios.put("http://localhost:3000/mov_status", {
                id: field.id,
                status: 'inactive',
            }).then((response) => {
                console.log(response);
            })
        } else {
            Axios.put("http://localhost:3000/mov_status", {
                id: field.id,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        }
    }

    const toModalMov = () => {
        setModalOpen(false);
        setFunct('');
    }



    useEffect(() => {
        Axios.get("http://localhost:3000/mov_list").then((response) => {
            setMovementsList(response.data);
            // console.log(response.data);
        })

    }, []);



    // function handleEdit(field) {
    //     setId(field.id);
    //     setData(field.data);
    //     setNature(field.nature);
    //     setDescription(field.description);
    //     setCategory(field.category);
    //     setOrigin(field.origin);
    //     setDestiny(field.destiny);
    //     setCurrency(field.currency);
    //     if (field.nature === 'income') {
    //         setValue(field.input);
    //     } else {
    //         setValue(field.output);
    //     }
    //     setStatus(field.currency);
    // }



    return (
        <div>
            <button onClick={clickInsert}>Insert</button>
            <Modal
                className='modal-gen'
                overlayClassName='modal-gen-overlay'
                isOpen={modalOpen}
                // onRequestClose={fecharModal}
                contentLabel="Modal de exemplo"
                closeTimeoutMS={200}
            >
                <MovModal toModalMov={toModalMov} toMovField={field} toMovFunct={funct} btnNature={["expenses", "income", "transfer", "conversion", "investment_in", "investment_out"]} />
            </Modal>
            <div className='list-grid'>
                {movementsList.map((field) => (
                    <div className='list-item' key={field.id} >
                        <div className='list-body' onClick={() => clickEdit(field)}>
                            <div className='list-field'>
                                <div className='list-field' >{field.nature}</div>
                                <div className='list-field' >{field.data}</div>
                                <div className='list-field' >{field.description}</div>
                                <div className='list-field' >{field.category}</div>
                            </div>
                            {
                                field.nature === 'income' ?
                                    <div className='list-field'>
                                        <div className='list-field' >{field.destiny} - {field.currency_in}</div>
                                        <div className='list-field' >{field.value_in}</div>
                                    </div>
                                    : field.nature === 'expenses' ?
                                        <div className='list-field'>
                                            <div className='list-field' >{field.origin} - {field.currency_out}</div>
                                            <div className='list-field' >{field.value_out}</div>
                                        </div>
                                        : field.nature === 'transfer' || field.nature === 'third' ?
                                            <div className='list-field'>
                                                <div className='list-field' >{field.origin}</div>
                                                <div className='list-field' >{field.destiny} - {field.currency_in}</div>
                                                <div className='list-field' >{field.value_in}</div>
                                            </div>
                                            : field.nature === 'investment_in' || field.nature === 'investment_out' ?
                                                <div className='list-field'>
                                                    <div className='list-field' >{field.origin}</div>
                                                    <div className='list-field' >{field.qty_in === '' ? field.qty_out : field.qty_in}</div>
                                                    <div className='list-field' >{field.qty_in === '' ? field.value_in / field.qty_out : field.value_in / field.qty_in}</div>
                                                    <div className='list-field' >{field.destiny} - {field.currency_in}</div>
                                                    <div className='list-field' >{field.value_in}</div>
                                                </div>
                                                : field.nature === 'conversion' ?
                                                    <div className='list-field'>
                                                        <div className='list-field' >{field.origin} - {field.currency_out}</div>
                                                        <div className='list-field' >{field.value_out}</div>
                                                        <div className='list-field' >{field.value_out / field.value_in}</div>
                                                        <div className='list-field' >{field.destiny} - {field.currency_in}</div>
                                                        <div className='list-field' >{field.value_in / field.value_out}</div>
                                                        <div className='list-field' >{field.value_in}</div>
                                                    </div>
                                                    : <div></div>
                            }
                        </div>
                        <div className='list-status' >
                            {
                                field.status === 'active' ?
                                    <Icon path={mdiCheckBold} title='Active' size={1} color='green' onClick={() => clickStatus(field)} />
                                    :
                                    <Icon path={mdiClose} title='Inactive' size={1} color='red' onClick={() => clickStatus(field)} />
                            }

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
