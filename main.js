const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose');
const url = "mongodb://mongo:27017/test4";

mongoose.connect(url)
    .then(() => {
        console.log('NODEJS TO MongoDB CLOUD Connection ESTABLISH.....');
    })
    .catch(err => {
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
        process.exit();
    });
    
    
const schema_mongoose = require('mongoose');
const EmployeeSchema = schema_mongoose.Schema(
    {
      empid: { type: Number },
      name: { type: String },
      email: { type: String },
      password: { type: String },
    },
    {
        timestamps: true
    }
);
EmpModel = schema_mongoose.model('user', EmployeeSchema);

app.post('/reg', (req, res) => {
    const empobj = new EmpModel({
        empid: req.body.eid,
        name: req.body.ename,
        email: req.body.eemail,
        password: req.body.pass,
    });
   
    empobj.save()
        .then(eobj => {
            res.status(200).send('DOCUMENT INSERED');
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
        });
}
);

app.post('/login', (req, res) => {
    
    EmpModel.find({ "empid": parseInt(req.body.eid),"password": req.body.pass})
    .then(objarr => {
        if (objarr.length > 0) {
            return res.status(200).send({ message: "Success Login" });
        }
        else {
            return res.status(200).send({ message: "Login Failed" });
        }
    })
    .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })
}
);

app.get('/viewall', (req, res) => {
    EmpModel.find()
        .then(emps => {
            res.status(200).send(emps);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
        });
}
);


app.get('/getuser/:id', (req, res) => {
    EmpModel.find({ "empid": parseInt(req.params.id) })
        .then(objarr => {
            if (objarr.length > 0) {
                res.send(objarr);
            }
            else {
                return res.status(404).send({ message: "Note not found with id " + req.params.eid });
            }
        }) 
        .catch(err => {
            return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
        })
}
);

app.get('/', (req, res) => {
    EmpModel.find({ "empid": parseInt(req.params.id) })
        
                return res.status(404).send({ message: "Note not found with id "  });
          
}
);

app.listen(5001, () => console.log('EXPRESS Server Started at Port No: 5000'));