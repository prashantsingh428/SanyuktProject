const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanyuktparivar3_db_user:qQrOWLx4NO3a9b83@cluster0.bhprzwx.mongodb.net/sanyukt_db?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        require('./server/models/User');
        require('./server/models/Product');
        const Order = require('./server/models/Order');
        const orders = await Order.find()
            .populate("product", "name image price")
            .populate("user", "name email")
            .sort("-createdAt");
        console.log("Total orders populated:", orders.length);
        if(orders.length > 0) {
            console.log("Sample populated order:", orders[0]);
        }
        mongoose.disconnect();
    })
    .catch(console.error);
