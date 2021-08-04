import Head from 'next/head'

export default function Container(props) {
    const { children, ...customMeta } = props
    return (
        <div>
            <Head>
                <title>Sketchel!</title>
                <meta content="A simple community-driven drawing web application." name="description"/>
                <script async src="https://arc.io/widget.min.js#mi9oJ3iF"></script>
                <script src="/js/navbar.js"></script>
                <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
                <link href="https://gist.githubusercontent.com/xMinota/1f42cfd9d86a14924ee7d900e683e750/raw/930c77b09a68948085a9e2d870cd3991aac1930a/bulma.css" rel="stylesheet"></link>
                <script src="https://kit.fontawesome.com/9558a49d61.js" crossOrigin="anonymous"></script>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"/>
                <link rel="manifest" href="/assets/site.webmanifest"/>
                <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#5bd9ff"/>
                <meta name="theme-color" content="#ffffff"/>
            </Head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </div>
    )
}