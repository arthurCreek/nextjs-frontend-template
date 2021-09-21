import { ToastContainer, toast } from 'react-toastify';
import { FaImage } from 'react-icons/fa';
import {useState} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';

export interface Props {
    spons:any
}

export default function EditSponsorPage(props: Props) {
    const [values, setValues] = useState({
        name: props.spons.name,
        description: props.spons.description
    });

    const [imagePreview, setImagePreview] = useState(
        props.spons.image ? props.spons.image.formats.thumbnail.url : null
    );

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        // Validation
        const hasEmptyFields = Object.values(values).some((element) => element === '');
        
        if(hasEmptyFields) {
            toast.error('Please fill in all fields');
        }

        const res = await fetch(`${API_URL}/sponsors/${props.spons.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if(!res.ok) {
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
        <Layout title="Edit Sponsor"> 
        <Link href="/sponsors">Go Back</Link>
            <h1>Edit Sponsor</h1>
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

                <input type="submit" value="Update Sponsor" className="btn"></input>
            </form>
            <h2>Sponsor Image</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : <div>
                    <p>No image uploaded</p>
                </div>}
            <div>
                <button className="btn btn-secondary">
                    <FaImage /> Set Image
                </button>
            </div>
        </Layout>
    )
}

export interface EditProps {
    params: {
        id: any
    }
}


export async function getServerSideProps(props: EditProps) {
    const res = await fetch(`${API_URL}/sponsors/${props.params.id}`);
    const spons = await res.json();

    return {
        props: {
            spons
        }
    }
}