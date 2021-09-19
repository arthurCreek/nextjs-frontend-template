import Head from 'next/head';
import {useRouter} from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import styles from '@/styles/Layout.module.css';

export interface Props {
    title: string,
    keywords: string,
    description: string,
    children: any
}


export default function Layout(props: Props) {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <meta name='decription' content={props.description} />
                <meta name='keywords' content={props.keywords} />
            </Head>

        <Header/>

        {router.pathname === '/' && <Showcase />}

        <div className={styles.container}>
            {props.children}
        </div>

        <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Sponsors | Find the best sponsors',
    description: 'Find the best sponsors for your team',
    keywords: 'sponsors, motorsports, race'
}