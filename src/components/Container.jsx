import Head from 'next/head'

export default function Container(props) {
    const { children, ...customMeta } = props
    return (
        <>
            <Head>
                <title>Sketchel!</title>
                <meta content="A simple community-driven drawing web application." name="description"/>
                <script async src="/js/navbar.js"></script>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"/>
                <link rel="manifest" href="/assets/site.webmanifest"/>
                <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#5bd9ff"/>
                <meta name="theme-color" content="#59d0ff"/>
            </Head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </>
    )
}