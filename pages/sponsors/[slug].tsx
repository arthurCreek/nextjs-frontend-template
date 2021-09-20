import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import {API_URL} from '@/config/index';
import styles from '@/styles/Event.module.css';

export interface Props {
    spons: any
}

export default function SponsorPage(props: Props) {
    const deleteEvent = (e: any) => {
        console.log('Delete');
    }

    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/sponsors/edit/${props.spons.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Sponsor
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>

                <h1>{props.spons.name}</h1>
                {props.spons.image.formats.medium.url && (
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