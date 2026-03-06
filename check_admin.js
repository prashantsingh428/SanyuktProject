const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://sanyuktparivar3_db_user:qQrOWLx4NO3a9b83@cluster0.bhprzwx.mongodb.net/sanyukt_db?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('sanyukt_db');
        const users = database.collection('users');
        const adminUser = await users.findOne({ name: 'Admin' });
        console.log("Admin user:", adminUser);
    } finally {
        await client.close();
    }
}
main().catch(console.dir);
