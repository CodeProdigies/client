"use server";

import { MongoClient } from "mongodb";

export async function submitForm(prevState: any, formData: FormData) {

    const email = formData.get('email');

    if (!email) {
        return { ...prevState, message: "Please provide a valid email.", isSubmitting: false };
    }

    const url = 'mongodb+srv://medsource:DtAYIv0bEd5vd7c9@cluster0.0dz4fmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const dbName = 'myproject';
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('emails');

        const result = await collection.insertOne({ email });
        console.log(`Successfully inserted item with _id: ${result.insertedId}`);

        return { ...prevState, message: "Thank you! You'll be notified when we're ready.", isSubmitting: false };
    } catch (error) {
        console.error("Error: ", error);
        return { ...prevState, message: "Failed to submit form. Please try again.", isSubmitting: false };
    } finally {
        await client.close();
    }
}
