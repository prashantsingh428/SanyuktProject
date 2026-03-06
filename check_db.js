const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://sanyuktparivar3_db_user:qQrOWLx4NO3a9b83@cluster0.bhprzwx.mongodb.net/sanyukt_db?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('sanyukt_db');
        const orders = database.collection('orders');
        const count = await orders.countDocuments();
        console.log("Total orders in DB:", count);
        if (count > 0) {
            const docs = await orders.find({}).limit(1).toArray();
            console.log("Sample order:", docs[0]);
        }
    } finally {
        await client.close();
    }
}
main().catch(console.dir);
