import { parseCookies } from "../../helpers/index";
import { ToastContainer, toast } from 'react-toastify';
import {useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';

export interface Props {
    token: any
}

export default function AddSponsor(props: Props) {
    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        // Validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');
        
        if(hasEmptyFields) {
            toast.error('Please fill in all fields');
        }

        const res = await fetch(`${API_URL}/sponsors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${props.token}`
            },
            body: JSON.stringify(values)
        });

        if(!res.ok) {
            if(res.status === 403 || res.status === 401) {
                toast.error('No token included');
                return
            }
            toast.error('Something went wrong');
        } else {
            const spons = await res.json();
            router.push(`/sponsors/${spons.slug}`);
            toast.success('Success!');
        }
    };

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    return (
        <Layout title="Add New Sponsor"> 
        <Link href="/sponsors">Go Back</Link>
            <h1>Add Sponsor</h1>
            <ToastContainer />
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

export interface ServerProp {
    req: any
}

export async function getServerSideProps(serverProps: ServerProp) {
    const {token} = parseCookies(serverProps.req);

    console.log(token);

    return {
        props: {
            token
        }
    }
}