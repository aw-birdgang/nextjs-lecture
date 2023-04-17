import path from 'path';
import fs from 'fs/promises';

import { Fragment } from 'react';

function ProductDetailPage(props : any) {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    );
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData.toString());

    return data;
}

interface Product {
    id: string;
    title: string;
    description: string;
}

export async function getStaticProps(context: any) {
    const { params } = context;

    const productId = params.pid;
    console.log('(Re-)Generating... productId : ' + productId);

    const data = await getData();

    const product = data.products.find((product: Product) => product.id === productId);

    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product,
        },
    };
}

export async function getStaticPaths() {
    const data = await getData();
    console.log('(Re-)Generating... getStaticPaths > data : ' + data);

    const ids = data.products.map((product: Product) => product.id);
    const pathsWithParams = ids.map((id: string) => ({ params: { pid: id } }));
    console.log('(Re-)Generating... pathsWithParams : ' + pathsWithParams);

    return {
        paths: pathsWithParams,
        fallback: true,
    };
}

export default ProductDetailPage;
