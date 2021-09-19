import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export interface Props {
    sponsor: any
}

export default function EventItem(props: Props) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image alt="Sponsor image" src={props.sponsor.image ? props.sponsor.image : '/images/racer-default.png'} width={170} height={100}/>
            </div>
            <div className={styles.info}>
                <h3>{props.sponsor.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/sponsors/${props.sponsor.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}
