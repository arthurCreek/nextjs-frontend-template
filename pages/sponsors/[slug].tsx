import { ToastContainer, toast } from 'react-toastify';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import {API_URL} from '@/config/index';
import styles from '@/styles/Event.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export interface Props {
    spons: any
}

export default function SponsorPage(props: Props) {
    const router = useRouter();

    return (
        <Layout>
            <div className={styles.event}>
                <h1>{props.spons.name}</h1>
                <ToastContainer />
                {props.spons.image && (
                    <div className={styles.image}>
                        <Image alt="Sponsor" src={props.spons.image.formats.medium.url} width={960} height={600} />
                    </div>
                )}

                <h3>Description:</h3>
                <p>{props.spons.description}</p>

                <Link href='/sponsors'>
                    <a className={styles.back}>
                        {'<'} Go Back
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export interface ServerProp {
    query: {
        slug: any
    }
}

export async function getServerSideProps(props: ServerProp) {
    const res = await fetch(`${API_URL}/sponsors?slug=${props.query.slug}`);
    const sponsors = await res.json();

  return {
    props: {
        spons: sponsors[0]
    }
  }
}