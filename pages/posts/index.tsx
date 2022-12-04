import Link from 'next/link'
import Layout from './../../components/Layout'
import { GetStaticProps } from 'next';

const Posts = ({ posts }) => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Posts</h1>
    <p>This is the posts page</p>
    
    <ul>
    {posts && posts.posts.map((post) => {
        return (
            <li key={post.id}><Link href={`/posts/${post.slug}`}>{post.title}</Link></li>
        );

    })}
    </ul>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async ({ locale, params, preview = false, previewData }) => {
    
	
	const res = await fetch(`http://127.0.0.1:8000/api/posts`);
    const posts = await res.json();

    // console.log(posts)

    return {
		props: {
			// preview: preview ? true : false,
			posts: posts
		},
		revalidate: 10, // In seconds
	};
};

export default Posts