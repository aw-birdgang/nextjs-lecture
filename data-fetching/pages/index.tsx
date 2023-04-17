import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function HomePage(props: any) {
    const { products } = props;
    console.log('Generating...');

    return (
        <ul>
            {products.map((product: any) => (
                <li key={product.id}>
                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                </li>
            ))}
        </ul>
    );
}


export async function getStaticProps(context: any) {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData.toString());

    if (!data) {
        return {
            redirect: {
                destination: '/no-data',
            },
        };
    }

    if (data.products.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}

export default HomePage;
