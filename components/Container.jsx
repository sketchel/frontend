import Head from 'next/head'

export default function Container(props) {
    const { children, ...customMeta } = props
    return (
        <div>
            <Head>
                <title>Sketchel!</title>
                <meta content="A simple community-driven drawing web application." name="description"/>
                <script async src="https://arc.io/widget.min.js#mi9oJ3iF"></script>
                <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link>
                <script src="https://kit.fontawesome.com/9558a49d61.js" crossOrigin="anonymous"></script>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
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