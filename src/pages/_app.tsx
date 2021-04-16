import '../styles/global.css'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Tawk from '../components/Tawk'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Help &bull; Upsocia</title>
            </Head>
            <Tawk />
            <Component {...pageProps} />
        </>
    )
}
