import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import React from 'react'
import { BlockMapType, NotionRenderer } from 'react-notion'

export async function getServerSideProps(context) {
    const pageId = context.params?.pageId

    if (!pageId) {
        return
    }

    const data: BlockMapType = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`).then((res) => res.json())

    return {
        props: {
            blockMap: data
        }
    }
}

const NotionPage = ({ blockMap }) => {
    const router = useRouter()
    if (!blockMap || Object.keys(blockMap).length === 0) {
        return (
            <div>
                <h3>No data found.</h3>
                <div> Make sure the pageId is valid.</div>
                <div>Only public pages are supported in this example.</div>
            </div>
        )
    }

    const title = blockMap[Object.keys(blockMap)[0]]?.value.properties.title[0][0]

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <div>
                <div className="bg-purple-100 text-purple-600 text-sm">
                    <div className="max-w-5xl mx-auto px-6 py-2 flex flex-row items-center space-x-2">
                        <button onClick={() => router.back()}>&larr; Go back</button>
                        <p>/</p>
                        <p className="font-medium">{title}</p>
                    </div>
                </div>
                <NotionRenderer blockMap={blockMap} fullPage hideHeader />
            </div>
        </>
    )
}

export default NotionPage
