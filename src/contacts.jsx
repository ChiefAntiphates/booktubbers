import { useParams } from "react-router-dom";
import votingData from './data.json';

export default function Contact() {
    const {contactId} = useParams()

    console.log(votingData)
    return (
    <div style={{backgroundColor: 'grey'}}>
        <h1>contact!</h1>
        <p>{contactId}</p>
    </div>
    );
}