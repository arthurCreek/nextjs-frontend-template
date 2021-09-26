import { useState } from "react"
import {API_URL} from '@/config/index';
import styles from '@/styles/Form.module.css'

export interface Props {
    sponsId: any,
    imageUploaded: any,
    token: any
}

export default function ImageUpload(props: Props) {
    const [image, setImage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'sponsors');
        formData.append('refId', props.sponsId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/upload`, {
            method:'POST',
            headers: {
                Authorization: `Bearer ${props.token}`
            },
            body: formData
        })

        if(res.ok) {
            props.imageUploaded();
        }
    }

    const handleFileChange = (e: any) => {
        setImage(e.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <h1>Upload Sponsor Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    )
}
