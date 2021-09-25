import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardEvent.module.css';

export interface Props {
    sponsor: any,
    handleDelete: any
}

export default function DashboardEvent(props: Props) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/sponsors/${props.sponsor.slug}`}>
          <a>{props.sponsor.name}</a>
        </Link>
      </h4>
      <Link href={`/sponsors/edit/${props.sponsor.id}`}>
        <a className={styles.edit}><FaPencilAlt /> <span>Edit Sponsor</span></a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => props.handleDelete(props.sponsor.id)}
      >
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
