import { GetStaticProps, GetStaticPaths } from 'next'

import Layout from '../../components/Layout'



const Single = ({ page }) => {
    
    console.log(page);

    return (
        <Layout title="About | Next.js + TypeScript Example">
            <h1>{page.data.title}</h1>
            <p>{page.data.body}</p>
            
        </Layout>
    )
}

// export async function getStaticPaths() {
 export const getStaticPaths: GetStaticPaths = async () => {
    // Call an external API endpoint to get posts
   
	
    const res = await fetch('http://127.0.0.1:8000/api/posts');
    const posts = await res.json()
    // Get the paths we want to pre-render based on posts
    const paths = posts && posts.posts.map((post) => ({
        params: { slug: post.slug },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
  }
  
export const getStaticProps: GetStaticProps = async ({params}) => {
    
    console.log(params.slug);
    // console.log('locale', locale);

    let url = `http://127.0.0.1:8000/api/posts/${params.slug}`;
    
    const res = await fetch(url)
    const page = await res.json()


    return {
        props: {
            page: page
        },
        revalidate: 10, // In seconds
      };
}

export default Single
