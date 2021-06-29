import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <script type='text/javascript'>
            (function(c,l,a,r,i,t,y){'{'}
            c[a]=c[a]||() =&gt; {'{'}(c[a].q=c[a].q||[]).push(arguments){'}'};
            t=l.createElement(r);t.async=1;t.src=&quot;https://www.clarity.ms/tag/&quot;+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            {'}'})(window, document, &quot;clarity&quot;, &quot;script&quot;,
            &quot;7c9tgf3vlc&quot;);
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
