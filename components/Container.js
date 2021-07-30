import Head from 'next/head'

export default function Container(props) {
    const {children, ...customMeta} = props
    return (
        <div>
            <Head>
                <title>Sketchel!</title>
                <meta content="A simple community-driven drawing web application." name="description"/>
                <script async src="https://arc.io/widget.min.js#mi9oJ3iF"></script>
            </Head>
            <main className="flex p-8 justify-left flex flex-wrap">
                {children}
            </main>
        </div>
    )
}