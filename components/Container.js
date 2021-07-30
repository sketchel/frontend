import Head from 'next/head'

export default function Container(props) {
    const {children, ...customMeta} = props
    return (
        <div>
            <Head>
                <title>Sketchel!</title>
                <meta content="A simple community-driven drawing web application." name="description"/>
            </Head>
            <main className="flex p-8 justify-left flex flex-wrap">
                {children}
            </main>
        </div>
    )
}