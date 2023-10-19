const express = require('express');
const app = express();
// const hbs = require('express-handlebars');
// const bodyParser = require('body-parser');
// const session = require('express-session');
const PORT = process.env.PORT || 3000;
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "finance_app"
})

app.use(cors());
app.use(express.json());

app.post("/user_key", (req, res) => {
    const { user_key } = req.body;
    console.log('user: ' + user_key);

    app.get("/expenses", (req, res) => {
        let SQL = "SELECT nature, ROUND(SUM(value_out),2) AS value_out FROM movements WHERE nature='expenses' AND status='active' AND user_key=? GROUP BY nature";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.get("/income", (req, res) => {
        let SQL = "SELECT nature, ROUND(SUM(value_in),2) AS value_in FROM movements WHERE nature='income' AND status='active' AND user_key=? GROUP BY nature";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })

    app.get("/cat_list", (req, res) => {
        let SQL = "SELECT * FROM categories WHERE user_key=?";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.post("/cat_check", (req, res) => {
        const { category } = req.body;
        let SQL = "SELECT category AS category, COUNT(categories.category) AS count_cat FROM categories WHERE categories.category=? AND user_key=?";
        db.query(SQL, [category, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.post("/cat_insert", (req, res) => {
        const { category } = req.body;
        let SQL = "INSERT INTO categories (user_key, category) VALUES (?,?)";
        db.query(SQL, [user_key, category], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.post("/cat_check_mov", (req, res) => {
        const { category } = req.body;
        let SQL = "SELECT category AS category, COUNT(movements.category) AS count_cat FROM movements WHERE movements.category=? AND user_key=?";
        db.query(SQL, [category, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.put("/cat_update1", (req, res) => {
        const { id } = req.body;
        const { category } = req.body;
        let SQL = "UPDATE categories SET category=? WHERE id=?";
        db.query(SQL, [category, id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.put("/cat_update2", (req, res) => {
        const { category } = req.body;
        const { cat_before } = req.body;
        let SQL = "UPDATE movements SET category=? WHERE category=? AND user_key=?";
        db.query(SQL, [category, cat_before, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.delete("/cat_delete/:id", (req, res) => {
        const { id } = req.params;
        let SQL = "DELETE FROM categories WHERE id=?";
        db.query(SQL, [id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.get("/acc_list", (req, res) => {
        let SQL = "SELECT * FROM accounts WHERE nature='account' AND user_key=?";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.get("/inv_list", (req, res) => {
        let SQL = "SELECT * FROM accounts WHERE nature='investment' AND user_key=?";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.post("/acc_check", (req, res) => {
        const { account } = req.body;
        let SQL = "SELECT account AS account, COUNT(accounts.account) AS count_acc FROM accounts WHERE accounts.account=? AND user_key=?";
        db.query(SQL, [account, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.post("/acc_insert1", (req, res) => {
        const { nature } = req.body;
        const { account } = req.body;
        const { currency } = req.body;
        const { category } = req.body;
        let SQL = "INSERT INTO accounts (user_key, nature, account, currency, category) VALUES (?,?,?,?,?)";
        db.query(SQL, [user_key, nature, account, currency, category], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.post("/acc_insert2", (req, res) => {
        const { origin } = req.body;
        const { currency_out } = req.body;
        const { destiny } = req.body;
        const { currency_in } = req.body;
        const { status } = req.body;
        let SQL = "INSERT INTO movements (user_key, origin, currency_out, destiny, currency_in, status) VALUES (?,?,?,?,?,?)";
        db.query(SQL, [user_key, origin, currency_out, destiny, currency_in, status], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.put("/acc_update1", (req, res) => {
        const { id } = req.body;
        const { account } = req.body;
        const { currency } = req.body;
        const { category } = req.body;
        let SQL = "UPDATE accounts SET account=?,currency=?,category=? WHERE id=?";
        db.query(SQL, [account, currency, category, id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.put("/acc_update2", (req, res) => {
        const { origin } = req.body;
        const { currency_out } = req.body;
        const { acc_before } = req.body;
        let SQL = "UPDATE movements SET origin=?, currency_out=? WHERE origin=? AND user_key=?";
        db.query(SQL, [origin, currency_out, acc_before, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.put("/acc_update3", (req, res) => {
        const { destiny } = req.body;
        const { currency_in } = req.body;
        const { acc_before } = req.body;
        let SQL = "UPDATE movements SET destiny=?, currency_in=? WHERE destiny=? AND user_key=?";
        db.query(SQL, [destiny, currency_in, acc_before, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.post("/acc_check_mov", (req, res) => {
        const { account } = req.body;
        let SQL = "SELECT COUNT(CASE WHEN movements.origin = ? THEN id END) AS count_ori, COUNT(CASE WHEN movements.destiny = ? THEN id END) AS count_des FROM movements WHERE status<>'creation' AND user_key=?";
        db.query(SQL, [account, account, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.delete("/acc_delete1/:id", (req, res) => {
        const { id } = req.params;
        let SQL = "DELETE FROM accounts WHERE id=?";
        db.query(SQL, [id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.delete("/acc_delete2/:account", (req, res) => {
        const { account } = req.params;
        let SQL = "DELETE FROM movements WHERE origin=? AND destiny=? AND status='creation' AND user_key=?";
        db.query(SQL, [account, account, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.put("/acc_default_yes", (req, res) => {
        const { id } = req.body;
        const { is_default } = req.body;
        let SQL = "UPDATE accounts SET is_default=? WHERE id=?";
        db.query(SQL, [is_default, id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.put("/acc_default_no", (req, res) => {
        const { id } = req.body;
        const { nature } = req.body;
        const { is_default } = req.body;
        let SQL = "UPDATE accounts SET is_default=? WHERE id<>? AND nature=? AND user_key=?";
        db.query(SQL, [is_default, id, nature, user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.get("/mov_list", (req, res) => {
        let SQL = "SELECT * FROM movements WHERE status<>'creation' AND user_key=?";
        db.query(SQL, [user_key], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        })
    })
    app.put("/mov_status", (req, res) => {
        const { id } = req.body;
        const { status } = req.body;
        let SQL = "UPDATE movements SET status=? WHERE id=?";
        db.query(SQL, [status, id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
    app.post("/mov_insert", (req, res) => {
        const { nature } = req.body;
        const { data } = req.body;
        const { description } = req.body;
        const { category } = req.body;
        const { origin } = req.body;
        const { currency_out } = req.body;
        const { qty_out } = req.body;
        const { value_out } = req.body;
        const { destiny } = req.body;
        const { currency_in } = req.body;
        const { qty_in } = req.body;
        const { value_in } = req.body;
        const { status } = req.body;
        let SQL = "INSERT INTO movements ( user_key, nature, data, description, category,origin,currency_out,qty_out,value_out, destiny, currency_in,qty_in, value_in, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(SQL, [user_key, nature, data, description, category, origin, currency_out, qty_out, value_out, destiny, currency_in, qty_in, value_in, status], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.put("/mov_update", (req, res) => {
        const { id } = req.body;
        const { nature } = req.body;
        const { data } = req.body;
        const { description } = req.body;
        const { category } = req.body;
        const { origin } = req.body;
        const { currency_out } = req.body;
        const { qty_out } = req.body;
        const { value_out } = req.body;
        const { destiny } = req.body;
        const { currency_in } = req.body;
        const { qty_in } = req.body;
        const { value_in } = req.body;
        let SQL = "UPDATE movements SET nature=?,data=?, description=?, category=?, origin=?, currency_out=?,qty_out=?,value_out=?, destiny=?,currency_in=?, qty_in=?,value_in=? WHERE id=?";
        db.query(SQL, [nature, data, description, category, origin, currency_out, qty_out, value_out, destiny, currency_in, qty_in, value_in, id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })

    app.delete("/mov_delete/:id", (req, res) => {
        const { id } = req.params;
        let SQL = "DELETE FROM movements WHERE id=?";
        db.query(SQL, [id], (err, result) => {
            if (err) console.log(err);
            else res.send(result);
        });
    })
})

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT);
})