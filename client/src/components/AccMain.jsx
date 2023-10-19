import React, { useState, useEffect } from 'react'
import '../styles/AccMain.css';
import '../styles/GeneralModal.css';
import Axios from "axios";
import Modal from 'react-modal';
import AccModal from './AccModal.jsx';
import Icon from '@mdi/react';
import { mdiTag, mdiTagOutline } from '@mdi/js';

export default function AccMain() {
    const [accountList, setAccountList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [funct, setFunct] = useState('');
    const [field, setField] = useState();
    useEffect(() => {
        Axios.get("http://localhost:3000/acc_list").then((response) => {
            setAccountList(response.data);
            // console.log(response.data);
        });
    }, []);

    const toModalAcc = () => {
        setModalOpen(false);
    }

    function clickInsert() {
        setModalOpen(true);
        setFunct('acc_insert');
    }

    const clickEdit = (field) => {
        setField(field);
        setFunct('edit');
        setModalOpen(true);
    }
    const clickDefault = (field) => {
        if (field.is_default === '') {
            Axios.put("http://localhost:3000/acc_default_yes", {
                id: field.id,
                is_default: 'yes',
            }).then((response) => {
                // console.log(response);
                Axios.put("http://localhost:3000/acc_default_no", {
                    id: field.id,
                    nature: field.nature,
                    is_default: '',
                }).then((response) => {
                    console.log(response);
                })
            })
        }
    }

    return (
        <div className='acc-group'>
            <div className='acc-title'>Accounts</div>
            <button className='btn-insert' onClick={clickInsert}>Insert</button>
            <Modal
                className='modal-gen'
                overlayClassName='modal-gen-overlay'
                isOpen={modalOpen}
                contentLabel="Modal de exemplo"
                closeTimeoutMS={200}
            >
                <AccModal toModalAcc={toModalAcc} toAccField={field} toAccFunct={funct} />
            </Modal>
            <div className='acc-grid'>
                {accountList.map((field, index) => {
                    return (
                        <div className='acc-item' key={index}>
                            <div className='acc-body' onClick={() => clickEdit(field)}>
                                <div className='acc-field' >{field.account} - {field.currency}</div>
                                <div className='acc-field' >{field.category}</div>
                                <div className='acc-field' >{field.balance}</div>
                            </div>
                            <div className='acc-default' >
                                {
                                    field.is_default === 'yes' ?
                                        <Icon path={mdiTag} title='Default' size={1} color='green' onClick={() => clickDefault(field)} />
                                        :
                                        <Icon path={mdiTagOutline} title='Default' size={1} color='green' onClick={() => clickDefault(field)} />
                                }
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
