import Layout from '@/components/Layout';
import {API_URL} from '@/config/index';

export interface Props {
  sponsors: any
}

export default function HomePage(props: Props) {
  console.log(props.sponsors);

  return (
      <Layout>
          <h1>Home</h1>
      </Layout>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/sponsors`);
  const sponsors = await res.json();

  return {
    props: {sponsors}
  }
}