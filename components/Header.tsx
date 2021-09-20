import Link from 'next/link';
import Search from './Search';
import styles from '@/styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Motorsports</a>
                </Link>
            </div>

        <Search />

        <nav>
            <ul>
                <li>
                    <Link href='/sponsors'>
                        <a>Sponsors</a>
                    </Link>
                </li>
            </ul>
        </nav>
            
        </header>
    )
}
