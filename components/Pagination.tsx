import Link from 'next/link';
import { PER_PAGE} from '@/config/index';

export interface Props {
  page: any;
  total: any;
}

export default function Pagination(props: Props) {
  const lastPage = Math.ceil(props.total / PER_PAGE);

  return (
    <>
      {props.page > 1 && (
        <Link href={`/sponsors?page=${props.page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {props.page < lastPage && (
        <Link href={`/sponsors?page=${props.page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
