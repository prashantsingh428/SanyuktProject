const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://sanyuktparivar3_db_user:qQrOWLx4NO3a9b83@cluster0.bhprzwx.mongodb.net/sanyukt_db?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('sanyukt_db');
        const users = database.collection('users');
        const allUsers = await users.find({}).project({ name: 1, email: 1, role: 1 }).toArray();
        console.log("All users:", allUsers);
    } finally {
        await client.close();
    }
}
main().catch(console.dir);
