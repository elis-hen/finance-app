import React, { useState, useEffect } from 'react'
import Axios from "axios";

export default function AccModal({ toAccFunct, toAccField, toModalAcc }) {
    const [alert, setAlert] = useState('');
    const [id, setId] = useState('');
    const [nature, setNature] = useState('');
    const [account, setAccount] = useState('');
    const [currency, setCurrency] = useState('');
    const [category, setCategory] = useState('');
    const [accBefore, setAccBefore] = useState('');
    const [curBefore, setCurBefore] = useState('');
    const [catBefore, setCatBefore] = useState('');

    useEffect(() => {
        if (toAccFunct === 'edit') {
            setId(toAccField.id)
            setAccount(toAccField.account);
            setCurrency(toAccField.currency);
            setCategory(toAccField.category);
            setAccBefore(toAccField.account);
            setCurBefore(toAccField.currency);
            setCatBefore(toAccField.category);
        }
        if (toAccFunct === 'acc_insert') {
            setNature('account');
        }
        if (toAccFunct === 'inv_insert') {
            setNature('investment');
        }
    }, []);


    function handleInsert() {
        Axios.post("http://localhost:3000/acc_check", {
            account: account,
        }).then((response) => {
            const countAccIn = response.data[0];
            if (countAccIn.count_acc > 0) {
                setAlert('check');
            } else {
                Axios.post("http://localhost:3000/acc_insert1", {
                    nature: nature,
                    account: account,
                    currency: currency,
                    category: category,
                }).then((response) => {
                    Axios.post("http://localhost:3000/acc_insert2", {
                        origin: account,
                        currency_out: currency,
                        destiny: account,
                        currency_in: currency,
                        status: 'creation',
                    }).then((response) => {
                        setAlert('inserted');
                        console.log(response);
                    });
                });
            }
        })
    }

    function handleUpdate() {
        if ((account === accBefore) && (currency === curBefore) && (category === catBefore)) {
            setAlert('updated');
        } else if (account === accBefore) {
            Axios.put("http://localhost:3000/acc_update1", {
                id: id,
                account: account,
                currency: currency,
                category: category,
            }).then((response) => {
                console.log(response);
                Axios.put("http://localhost:3000/acc_update2", {
                    origin: account,
                    currency_out: currency,
                    acc_before: accBefore,
                }).then((response) => {
                    Axios.put("http://localhost:3000/acc_update3", {
                        destiny: account,
                        currency_in: currency,
                        acc_before: accBefore,
                    }).then((response) => {
                        setAlert('updated');
                        // console.log(response);
                    });
                });
            });
        } else {
            Axios.post("http://localhost:3000/acc_check", {
                account: account,
            }).then((response) => {
                const countAccIn = response.data[0];
                if (countAccIn.count_acc > 0) {
                    setAlert('check');
                } else {
                    Axios.put("http://localhost:3000/acc_update1", {
                        id: id,
                        account: account,
                        currency: currency,
                        category: category,
                    }).then((response) => {
                        console.log(response);
                        Axios.put("http://localhost:3000/acc_update2", {
                            origin: account,
                            currency_out: currency,
                            acc_before: accBefore,
                        }).then((response) => {
                            Axios.put("http://localhost:3000/acc_update3", {
                                destiny: account,
                                currency_in: currency,
                                acc_before: accBefore,
                            }).then((response) => {
                                setAlert('updated');
                                // console.log(response);
                            });
                        });
                    });
                }
            })
        }
    }

    function handleToDelete() {
        setAlert('toDelete');
    }

    function handleDelete() {
        Axios.post("http://localhost:3000/acc_check_mov", {
            account: account,
        }).then((response) => {
            const countAcc = response.data[0];
            if ((countAcc.count_ori > 0) || (countAcc.count_des > 0)) {
                setAlert('checkDelete');
            } else {
                Axios.delete(`http://localhost:3000/acc_delete1/${id}`);
                Axios.delete(`http://localhost:3000/acc_delete2/${account}`);
                setAlert('deleted');
            }
        })
    }

    function closeAlert() {
        setAlert('');
    }

    return (
        alert === 'check' ?
            <div>
                <div>Account already exists!</div>
                <button onClick={closeAlert}>Got it</button>
            </div>
            :
            alert === 'inserted' ?
                <div>
                    <div>Account inserted successfully!</div>
                    <button onClick={() => toModalAcc()}>Got it</button>
                </div>
                :
                alert === 'updated' ?
                    <div>
                        <div>Account updated successfully!</div>
                        <button onClick={() => toModalAcc()}>Got it</button>
                    </div>
                    :
                    alert === 'deleted' ?
                        <div>
                            <div>Account deleted successfully!</div>
                            <button onClick={() => toModalAcc()}>Got it</button>
                        </div>
                        :
                        alert === 'toDelete' ?
                            <div>
                                <div>Are you sure you want to delete this Account?</div>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={closeAlert}>Cancel</button>
                            </div>
                            :
                            alert === 'checkDelete' ?
                                <div>
                                    <div>There must be no movements related to this Account.</div>
                                    <button onClick={() => toModalAcc()}>Got it</button>
                                </div>
                                :
                                <div>
                                    <input
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                    />
                                    <input
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    />
                                    <input
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {
                                        toAccFunct === 'edit' ?
                                            <div>
                                                <button onClick={handleUpdate}>Update</button>
                                                <button onClick={handleToDelete}>Delete</button>
                                            </div>
                                            :
                                            <div>
                                                <button onClick={handleInsert}>Adicionar</button>
                                            </div>
                                    }
                                    <button onClick={() => toModalAcc()}>Cancel</button>
                                </div >
    )
}
