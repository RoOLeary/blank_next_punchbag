import Link from 'next/link'
import Layout from '../../components/Layout'
import { GetStaticProps } from 'next';

const Pages = ({ pages }) => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Pages</h1>
    <p>This is the Pages page</p>
    
    <ul>
    {pages && pages.pages.map((page) => {
        return (
            <li key={page.id}><Link href={`/pages/${page.slug}`}>{page.title}</Link></li>
        );

    })}
    </ul>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async ({ locale, params, preview = false, previewData }) => {
    
	
	const res = await fetch(`http://127.0.0.1:8000/api/pages`);
    const pages = await res.json();

    // console.log(Pages)

    return {
		props: {
			// preview: preview ? true : false,
			pages: pages
		},
		revalidate: 10, // In seconds
	};
};

export default Pages