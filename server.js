const express = require('express');
const cors = require('cors')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageDetection = require('./controllers/imageDetection')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/register', register.register);
app.post('/signin', signin.signin);
app.get('/profile/:id', profile.getProfile);
app.put('/image', profile.updateEntries);
app.post('/imageDetection',imageDetection.detect)

app.listen(PORT, () => {
    console.log('app is running on port', PORT)
});

