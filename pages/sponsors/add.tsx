import {useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

export default function AddSponsor() {
    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(values);
    };

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    return (
        <Layout title="Add New Sponsor"> 
        <Link href="/sponsors">Go Back</Link>
            <h1>Add Sponsor</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Sponsor Name</label>
                        <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}/>
                    </div>
                </div>

                <div>
                    <label htmlFor="description">Sponsor Description</label>
                    <textarea typeof="text" name="description" id="description" value={values.description} onChange={handleInputChange}></textarea>
                </div>

                <input type="submit" value="Add Sponsor" className="btn"></input>
            </form>
        </Layout>
    )
}
