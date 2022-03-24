import '../styles/style.css'

export const App: React.FC<{
    Component: React.FC, pageProps: any
}> = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    )
}

export default App