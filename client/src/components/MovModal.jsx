import React, { useState, useEffect } from 'react'
import Axios from "axios";
import '../styles/GeneralModal.css';

export default function MovModal({ btnNature, toModalMov, toMovField, toMovFunct }) {

    const [accList, setAccList] = useState([]);
    const [accListFil, setAccListFil] = useState([]);
    const [invList, setInvList] = useState([]);
    const [invListFil, setInvListFil] = useState([]);
    const [catList, setCatList] = useState([]);
    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [nature, setNature] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [origin, setOrigin] = useState('');
    const [currencyOut, setCurrencyOut] = useState('');
    const [valueOut, setValueOut] = useState('');
    const [destiny, setDestiny] = useState('');
    const [currencyIn, setCurrencyIn] = useState('');
    const [valueIn, setValueIn] = useState('');
    const [qty, setQty] = useState('');
    const [alert, setAlert] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:3000/cat_list").then((response) => {
            setCatList(response.data);
            // console.log(response.data);
        });
        Axios.get("http://localhost:3000/acc_list").then((response) => {
            setAccList(response.data);
            // console.log(response.data);
        });
        Axios.get("http://localhost:3000/inv_list").then((response) => {
            setInvList(response.data);
            // console.log(response.data);
        });
        if (toMovFunct === 'edit') {
            setId(toMovField.id)
            setData(toMovField.data);
            setNature(toMovField.nature);
            setDescription(toMovField.description);
            setCategory(toMovField.category);
            setOrigin(toMovField.origin);
            setCurrencyOut(toMovField.currency_out);
            setValueOut(toMovField.value_out);
            setDestiny(toMovField.destiny);
            setCurrencyIn(toMovField.currency_in);
            setValueIn(toMovField.value_in);
            setQty(toMovField.qty_in === '' ? toMovField.qty_out : toMovField.qty_in);
        }

    }, []);

    const handleOrigin = (e) => {
        if (nature === 'investment_out') {
            const row = invList.filter(account => {
                return account.account === e.target.value;
            });
            const field = row.map(opt => opt.currency);
            const handleAccount = e.target.value;
            const handleCurrency = field[0];
            setOrigin(e.target.value);
            setCurrencyOut(field[0]);
            handleListFil(handleCurrency, handleAccount);
        } else {
            const row = accList.filter(account => {
                return account.account === e.target.value;
            });
            const field = row.map(opt => opt.currency);
            const handleAccount = e.target.value;
            const handleCurrency = field[0];
            setOrigin(e.target.value);
            setCurrencyOut(field[0]);
            handleListFil(handleCurrency, handleAccount);
        }
    }

    function handleListFil(handleCurrency, handleAccount) {
        if (nature === 'transfer') {
            const rowTran = accList.filter(account => {
                return account.currency === handleCurrency && account.account != handleAccount;
            });
            setAccListFil(rowTran);
            const handleRow = rowTran;
            handleSetDestiny(handleRow)
        }
        if (nature === 'conversion') {
            const rowConv = accList.filter(account => {
                return account.currency != handleCurrency;
            });
            setAccListFil(rowConv);
            const handleRow = rowConv;
            handleSetDestiny(handleRow)
        }
        if (nature === 'investment_in') {
            const rowInvIn = invList.filter(account => {
                return account.currency === handleCurrency;
            });
            setInvListFil(rowInvIn);
            const handleRow = rowInvIn;
            handleSetDestiny(handleRow)
        }
        if (nature === 'investment_out') {
            const rowInvOut = accList.filter(account => {
                return account.currency === handleCurrency;
            });
            setAccListFil(rowInvOut);
            const handleRow = rowInvOut;
            handleSetDestiny(handleRow)
        }
    }

    function handleSetDestiny(handleRow) {
        const accDefault = handleRow.filter(account => {
            return account.is_default === 'yes';
        });
        if ((handleRow.length > 0) && (accDefault.length > 0)) {
            const fieldAccount = accDefault.map(opt => opt.account);
            const fieldCurrency = accDefault.map(opt => opt.currency);
            setDestiny(fieldAccount[0]);
            setCurrencyIn(fieldCurrency[0]);
            console.log('tem default');
        } else if ((handleRow.length > 0) && (accDefault.length <= 0)) {
            const fieldAccount = handleRow.map(opt => opt.account);
            const fieldCurrency = handleRow.map(opt => opt.currency);
            setDestiny(fieldAccount[0]);
            setCurrencyIn(fieldCurrency[0]);
            console.log('nao tem default mas tem outros');
        } else {
            setDestiny('');
            setCurrencyIn('');
            console.log('nao tem nada');
        }
    }

    const handleDestiny = (e) => {
        if (nature === 'investment_in') {
            setDestiny(e.target.value);
            const row = invList.filter(account => {
                return account.account === e.target.value;
            });
            const field = row.map(opt => opt.currency);
            setCurrencyIn(field[0]);
        } else {
            setDestiny(e.target.value);
            const row = accList.filter(account => {
                return account.account === e.target.value;
            });
            const field = row.map(opt => opt.currency);
            setCurrencyIn(field[0])
        }
    }

    useEffect(() => {
        if ((nature === 'expenses') || (nature === 'transfer') || (nature === 'conversion') || (nature === 'investment_in')) {
            const accDefault = accList.filter(account => {
                return account.is_default === 'yes';
            });
            const fieldAccount = accDefault.map(opt => opt.account);
            const fieldCurrency = accDefault.map(opt => opt.currency);
            setOrigin(fieldAccount[0]);
            setCurrencyOut(fieldCurrency[0]);
            const handleAccount = fieldAccount[0];
            const handleCurrency = fieldCurrency[0];
            console.log(fieldAccount[0], fieldCurrency[0]);
            handleListFil(handleCurrency, handleAccount);
        } else if (nature === 'income') {
            const accDefault = accList.filter(account => {
                return account.is_default === 'yes';
            });
            const fieldAccount = accDefault.map(opt => opt.account);
            const fieldCurrency = accDefault.map(opt => opt.currency);
            setDestiny(fieldAccount[0]);
            setCurrencyIn(fieldCurrency[0]);
            const handleAccount = fieldAccount[0];
            const handleCurrency = fieldCurrency[0];
            console.log(fieldAccount[0], fieldCurrency[0]);
            handleListFil(handleCurrency, handleAccount);
        } else if (nature === 'investment_out') {
            const accDefault = invList.filter(account => {
                return account.is_default === 'yes';
            });
            const fieldAccount = accDefault.map(opt => opt.account);
            const fieldCurrency = accDefault.map(opt => opt.currency);
            setOrigin(fieldAccount[0]);
            setCurrencyOut(fieldCurrency[0]);
            const handleAccount = fieldAccount[0];
            const handleCurrency = fieldCurrency[0];
            console.log(fieldAccount[0], fieldCurrency[0]);
            handleListFil(handleCurrency, handleAccount);
        }
    }, [nature]);

    function handleInsert() {
        if (nature === 'income') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: '',
                currency_out: '',
                qty_out: '',
                value_out: '',
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'expenses') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: '',
                currency_in: '',
                qty_in: '',
                value_in: '',
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'transfer') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'conversion') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                value_out: valueOut,
                qty_out: '',
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })

        } else if (nature === 'investment_in') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: qty,
                value_in: valueIn,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'investment_out') {
            Axios.post("http://localhost:3000/mov_insert", {
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: qty,
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
                status: 'active',
            }).then((response) => {
                console.log(response);
            })
        }
        setId('')
        setData('');
        setNature('');
        setDescription('');
        setCategory('');
        setOrigin('');
        setCurrencyOut('');
        setValueOut('');
        setDestiny('');
        setCurrencyIn('');
        setValueIn('');
        setQty('');
        setAlert('inserted');
    }
    function handleUpdate() {
        if (nature === 'income') {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: '',
                currency_out: '',
                qty_out: '',
                value_out: '',
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'expenses') {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: '',
                currency_in: '',
                qty_in: '',
                value_in: '',
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'conversion') {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
            }).then((response) => {
                console.log(response);
            })
        } else if ((nature === 'transfer') || (nature === 'third')) {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'investment_in') {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: '',
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: qty,
                value_in: valueIn,
            }).then((response) => {
                console.log(response);
            })
        } else if (nature === 'investment_out') {
            Axios.put("http://localhost:3000/mov_update", {
                id: id,
                nature: nature,
                data: data,
                description: description,
                category: category,
                origin: origin,
                currency_out: currencyOut,
                qty_out: qty,
                value_out: valueOut,
                destiny: destiny,
                currency_in: currencyIn,
                qty_in: '',
                value_in: valueIn,
            }).then((response) => {
                console.log(response);
            })
        }
        setId('')
        setData('');
        setNature('');
        setDescription('');
        setCategory('');
        setOrigin('');
        setCurrencyOut('');
        setValueOut('');
        setDestiny('');
        setCurrencyIn('');
        setValueIn('');
        setQty('');
        setAlert('updated')
    }

    function handleToDelete() {
        setAlert('toDelete')
    }
    function handleDelete() {
        Axios.delete(`http://localhost:3000/mov_delete/${id}`);
        setAlert('deleted')
    }

    const handleBtnNature = (e, i) => {
        setNature(e.target.value);
        setDestiny('');
        // console.log('nature: ' + e.target.value);
    }

    return (
        alert === 'toDelete' ?
            <div>
                <div>Você tem certeza que deseja deletar este registro?</div>
                <button onClick={() => handleDelete()}>Yes</button>
                <button onClick={() => setAlert('')}>No</button>
            </div>
            :
            alert === 'deleted' ?
                <div>
                    <div>Registro deletado com sucesso!</div>
                    <button onClick={() => toModalMov()}>Got it</button>
                </div>
                :
                alert === 'inserted' ?
                    <div>
                        <div>Registro inserido com sucesso!</div>
                        <button onClick={() => toModalMov()}>Got it</button>
                    </div>
                    :
                    alert === 'updated' ?
                        <div>
                            <div>Registro alterado com sucesso!</div>
                            <button onClick={() => toModalMov()}>Got it</button>
                        </div>
                        :
                        <div>
                            <div className='mov-modal-nature-group'>
                                {
                                    btnNature.map((btnLabel, i) => (
                                        <div key={i}>
                                            <button
                                                key={i}
                                                value={btnLabel}
                                                onClick={(e) => handleBtnNature(e, i)}
                                                className={btnLabel === nature ? 'mov-modal-nature-btn active' : 'mov-modal-nature-btn'}
                                            >
                                                {btnLabel}
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                            {
                                nature != '' ?
                                    <div>
                                        <input
                                            value={data}
                                            onChange={(e) => setData(e.target.value)}
                                            placeholder='Data'
                                        />
                                        <input
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder='Description'
                                        />
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >
                                            <option disabled>Select the origin</option>
                                            <option value=''>No category</option>
                                            {catList.map(opt => {
                                                return (
                                                    <option key={opt.id} value={opt.category}>{opt.category}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    : <></>
                            }
                            {
                                nature === 'expenses' ?
                                    <div>
                                        <select
                                            value={origin}
                                            onChange={(e) => handleOrigin(e)}
                                            required
                                        >
                                            <option disabled>Select the origin</option>
                                            {accList.map(opt => {
                                                return (
                                                    <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                )
                                            })}
                                        </select>
                                        <input
                                            value={valueOut}
                                            onChange={(e) => {
                                                setValueOut(e.target.value);
                                                setValueIn(e.target.value)
                                            }}
                                            placeholder='Value'
                                        />
                                    </div>
                                    : nature === 'income' ?
                                        <div>
                                            <select
                                                value={destiny}
                                                onChange={(e) => handleDestiny(e)}
                                                required
                                            >
                                                <option disabled>Select the destiny</option>
                                                {accList.map(opt => {
                                                    return (
                                                        <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                    )
                                                })}
                                            </select>
                                            <input
                                                value={valueIn}
                                                onChange={(e) => {
                                                    setValueOut(e.target.value);
                                                    setValueIn(e.target.value)
                                                }}
                                                placeholder='Value'
                                            />
                                        </div>
                                        : nature === 'transfer' ?
                                            <div>
                                                <select
                                                    value={origin}
                                                    onChange={(e) => handleOrigin(e)}
                                                    required
                                                >
                                                    <option disabled>Select the origin</option>
                                                    {accList.map(opt => {
                                                        return (
                                                            <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                        )
                                                    })}
                                                </select>
                                                {origin != '' && currencyOut != '' ?
                                                    <div>
                                                        <select
                                                            value={destiny}
                                                            onChange={(e) => handleDestiny(e)}
                                                            required
                                                        >
                                                            <option disabled>Select the destiny</option>
                                                            {accListFil.map(opt => {
                                                                return (
                                                                    <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        <input
                                                            value={valueIn}
                                                            onChange={(e) => {
                                                                setValueOut(e.target.value);
                                                                setValueIn(e.target.value)
                                                            }}
                                                            placeholder='Value'
                                                        />
                                                    </div>
                                                    : <></>
                                                }

                                            </div>
                                            : nature === 'conversion' ?
                                                <div>
                                                    <select
                                                        value={origin}
                                                        onChange={(e) => handleOrigin(e)}
                                                        required
                                                    >
                                                        <option disabled>Select the origin</option>
                                                        {accList.map(opt => {
                                                            return (
                                                                <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <input
                                                        value={valueOut}
                                                        onChange={(e) => setValueOut(e.target.value)}
                                                        placeholder='Value'
                                                    />
                                                    {origin != '' && currencyOut != '' ?
                                                        <div>
                                                            <select
                                                                value={destiny}
                                                                onChange={(e) => handleDestiny(e)}
                                                                required
                                                            >
                                                                <option disabled>Select the destiny</option>
                                                                {accListFil.map(opt => {
                                                                    return (
                                                                        <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <input
                                                                value={valueIn}
                                                                onChange={(e) => setValueIn(e.target.value)}
                                                                placeholder='Value'
                                                            />
                                                        </div>
                                                        : <></>
                                                    }
                                                </div>

                                                : nature === 'investment_in' ?
                                                    <div>
                                                        <select
                                                            value={origin}
                                                            onChange={(e) => handleOrigin(e)}
                                                            required
                                                        >
                                                            <option disabled>Select the origin</option>
                                                            {accList.map(opt => {
                                                                return (
                                                                    <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        {
                                                            origin != '' && currencyOut != '' ?
                                                                <div>
                                                                    <input
                                                                        value={qty}
                                                                        onChange={(e) => setQty(e.target.value)}
                                                                        placeholder='QTY'
                                                                    />
                                                                    <select
                                                                        value={destiny}
                                                                        onChange={(e) => handleDestiny(e)}
                                                                        required
                                                                    >
                                                                        <option disabled>Select the destiny</option>
                                                                        {invListFil.map(opt => {
                                                                            return (
                                                                                <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                    <input
                                                                        value={valueIn}
                                                                        onChange={(e) => {
                                                                            setValueOut(e.target.value);
                                                                            setValueIn(e.target.value)
                                                                        }}
                                                                        placeholder='Value'
                                                                    />

                                                                </div>
                                                                :
                                                                <></>
                                                        }

                                                    </div>
                                                    : nature === 'investment_out' ?
                                                        <div>
                                                            <select
                                                                value={origin}
                                                                onChange={(e) => handleOrigin(e)}
                                                                required
                                                            >
                                                                <option disabled>Select the origin</option>
                                                                {invList.map(opt => {
                                                                    return (
                                                                        <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            {
                                                                origin != '' && currencyOut != '' ?
                                                                    <div>
                                                                        <input
                                                                            value={qty}
                                                                            onChange={(e) => setQty(e.target.value)}
                                                                            placeholder='QTY'
                                                                        />
                                                                        <select
                                                                            value={destiny}
                                                                            onChange={(e) => handleDestiny(e)}
                                                                            required
                                                                        >
                                                                            <option disabled>Select the destiny</option>
                                                                            {accListFil.map(opt => {
                                                                                return (
                                                                                    <option key={opt.id} value={opt.account}>{opt.account} - {opt.currency}</option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                        <input
                                                                            value={valueOut}
                                                                            onChange={(e) => {
                                                                                setValueOut(e.target.value);
                                                                                setValueIn(e.target.value)
                                                                            }}
                                                                            placeholder='Value'
                                                                        />
                                                                    </div>
                                                                    : <></>
                                                            }
                                                        </div>
                                                        : <></>
                            }


                            {
                                toMovFunct === 'insert' ?
                                    <button onClick={handleInsert}>Adicionar</button>
                                    :
                                    <div>
                                        <button onClick={handleUpdate}>Salvar</button>
                                        <button onClick={handleToDelete}>Delete</button>
                                    </div>

                            }
                            <button onClick={() => toModalMov()}>Cancel</button>
                        </div>
    )
}
