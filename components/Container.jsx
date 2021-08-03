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
            </Head>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </div>
    )
}