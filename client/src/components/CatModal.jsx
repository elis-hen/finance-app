import React, { useState, useEffect } from 'react'
import Axios from "axios";

export default function CatModal({ toModalCat, toCatField, toCatFunct }) {
    const [alert, setAlert] = useState('');
    const [id, setId] = useState('');
    const [category, setCategory] = useState('');
    const [catBefore, setCatBefore] = useState('');

    useEffect(() => {
        if (toCatFunct === 'edit') {
            setId(toCatField.id)
            setCategory(toCatField.category);
            setCatBefore(toCatField.category);
        }
    }, []);

    function handleInsert() {
        Axios.post("http://localhost:3000/cat_check", {
            category: category,
        }).then((response) => {
            const countCatIn = response.data[0];
            if (countCatIn.count_cat > 0) {
                setAlert('check');
            } else {
                Axios.post("http://localhost:3000/cat_insert", {
                    category: category,
                }).then((response) => {
                    setAlert('inserted');
                    console.log(response);
                });
            }
        })
    }

    function handleUpdate() {
        if (category === catBefore) {
            setAlert('updated');
        } else {
            Axios.post("http://localhost:3000/cat_check", {
                id: id,
                cat_before: catBefore,
                category: category,
            }).then((response) => {
                const countCatUp = response.data[0];
                if (countCatUp.count_cat > 0) {
                    setAlert('check');
                    // console.log('Já existe esta categoria!');
                } else {
                    Axios.put("http://localhost:3000/cat_update1", {
                        id: id,
                        category: category,
                    }).then((response) => {
                        // console.log(response);
                        Axios.put("http://localhost:3000/cat_update2", {
                            cat_before: catBefore,
                            category: category,
                        }).then((response) => {
                            setAlert('updated');
                            // console.log(response);
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
        Axios.post("http://localhost:3000/cat_check_mov", {
            category: category,
        }).then((response) => {
            const countCat = response.data[0];
            if (countCat.count_cat > 0) {
                setAlert('checkDelete');
                // console.log('É necessário que não haja movimentações relacionadas com esta categoria');
            } else {
                Axios.delete(`http://localhost:3000/cat_delete/${id}`);
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
                <div>Category already exists!</div>
                <button onClick={closeAlert}>Got it</button>
            </div>
            :
            alert === 'inserted' ?
                <div>
                    <div>Category inserted successfully!</div>
                    <button onClick={() => toModalCat()}>Got it</button>
                </div>
                :
                alert === 'updated' ?
                    <div>
                        <div>Category updated successfully!</div>
                        <button onClick={() => toModalCat()}>Got it</button>
                    </div>
                    :
                    alert === 'deleted' ?
                        <div>
                            <div>Category deleted successfully!</div>
                            <button onClick={() => toModalCat()}>Got it</button>
                        </div>
                        :
                        alert === 'toDelete' ?
                            <div>
                                <div>Are you sure you want to delete this category?</div>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={closeAlert}>Cancel</button>
                            </div>
                            :
                            alert === 'checkDelete' ?
                                <div>
                                    <div>There must be no movements related to this category.</div>
                                    <button onClick={() => toModalCat()}>Got it</button>
                                </div>
                                :
                                <div>
                                    <input
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {
                                        toCatFunct === 'edit' ?
                                            <div>
                                                <button onClick={handleUpdate}>Update</button>
                                                <button onClick={handleToDelete}>Delete</button>
                                            </div>
                                            :
                                            <div>
                                                <button onClick={handleInsert}>Adicionar</button>
                                            </div>
                                    }
                                    <button onClick={() => toModalCat()}>Cancel</button>
                                </div>
    )
}
