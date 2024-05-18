/**
 * StAuth10244: I Mauricio Canul, 000881810 certify that this material is my original 
 * work. No other person's work has been used without due acknowledgement. I have not 
 * made my work available to anyone else.
 */

const express = require('express');
const app = express();

const sqlite3 = require("sqlite3").verbose();
const file = "mydatabase.db";
var db = new sqlite3.Database(file);

const PORT = process.env.PORT || 3001

app.use(express.json())

const cors = require("cors");

const redis = require("redis");

const client = redis.createClient({
    username: 'default',
    password: 'ryvO4Dt4tn2fWnnPsqXMC9c4Cv5SkQmh',
    socket: {
        host: 'redis-18473.c16.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18473
    }
});

client.connect();

/* client.on("error", function(err) {}
    console.log("Error: " + err)
  });
 */

const allowedOrigins = [
    "http://localhost:19000",
    "http://10.0.0.2:19000",
    "http://localhost:19006",
    "http://localhost:3000",
    "exp://10.0.0.216:8081"
]

app.use(
    cors({
            origin: (origin, callback) => {
                if(!origin || allowedOrigins.includes(origin)){
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS:" + origin))
                }
            }
        }
    )
)

app.get('*',function (req, res) {
    res.json({"Error":"You are requesting from unknown"});
  });

app.post('/register', async(req, res) => {
    console.log(req.body);
    let username = req.body.UN.toString().toLowerCase();
    let password = req.body.PW.toString().toLowerCase();

    db.serialize(() => {
        db.get("SELECT EXISTS(SELECT 1 FROM users WHERE username IS ? LIMIT 1) as res", username, (err, row) => {
            if(row.res >= 1){
                console.log("Exists");
                res.json({resp: "An account with said username already exists", font: false})
            } else {
                console.log("Doesn't exist");
                let stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
                console.log(username, password);
                stmt.run([username, password], (err) => {
                    console.log("something has happened", err);
                });
                res.json({resp: `Account with username ${req.body.UN} and password ${req.body.PW} has been created` , font: true})
            }
        })
    });
}); 

app.post('/login', async(req, res) => {
    console.log(req.body);
    let username = req.body.UN.toString().toLowerCase();
    let password = req.body.PW.toString().toLowerCase();

    db.serialize(() => {
        db.get("SELECT EXISTS(SELECT 1 FROM users WHERE username IS ? AND password IS ? LIMIT 1) as res", [username, password], (err, row) => {
            if(row.res >= 1){
                console.log("match");
                res.json({status: "success", user: username, pass: password})
            } else {
                console.log("Incorrect password or doesn't exist");
                res.json({status: "failure"})
            }
        })
    });
}); 

async function redisAdd(str){
    await client.lPush('leaderboard', str).then((res) => console.log(res));  
    await client.lTrim('leaderboard', 0, 9);
    return await client.lRange('leaderboard', 0, 9).then((res) => res);
}

app.post('/sendres', async(req, res) => {
    console.log(req.body);
    let username = req.body.UN.toString().toLowerCase();
    let password = req.body.PW.toString().toLowerCase();

    db.serialize(() => {
        db.get("SELECT EXISTS(SELECT 1 FROM users WHERE username IS ? AND password IS ? LIMIT 1) as res", [username, password], async(err, row) => {
            if(row.res >= 1){
                let leaderBoardResp = await redisAdd(username);
                console.log(leaderBoardResp);
                res.json({resp: "result has been sent", leaderBoard: leaderBoardResp});
            } else {
                res.json({resp: "User credentials were incorrect"});
            }
        })
    });
}); 

const server = app.listen(PORT, "0.0.0.0" , () => {
    db.serialize(() => {
        db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username varchar(255) NOT NULL, password varchar(255) NOT NULL)`).run().finalize();

        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, 'users', (err, row) => {
            console.log(row)
        });
        
        db.each('SELECT * FROM users', (err, row) => {
            console.log(row)
        })
    });

    console.log(`Example app listening in port: ${PORT}...`);

    
})


