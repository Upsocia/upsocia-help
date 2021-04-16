import { NotionRenderer, BlockMapType } from 'react-notion'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'

export async function getStaticProps() {
    const data: BlockMapType = await fetch(`https://notion-api.splitbee.io/v1/page/${process.env.NEXT_PUBLIC_PAGE_ID}`).then((res) => res.json())

    return {
        props: {
            blockMap: data
        },
        revalidate: 1
    }
}

const Home = ({ blockMap }) => (
    <div>
        <div>
            <div className="z-10 relative bg-purple-100 text-purple-600 text-sm">
                <div className="max-w-5xl mx-auto px-6 py-2 flex flex-row items-center space-x-2">
                    <a href="https://upsocia.com">&larr; Back to Upsocia</a>
                </div>
            </div>
            <div className="-mt-1 relative">
                <NotionRenderer blockMap={blockMap} fullPage hideHeader />
            </div>
        </div>
    </div>
)

export default Home
